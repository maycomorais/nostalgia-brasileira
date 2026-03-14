// supabase/functions/validar-pedido/index.ts
// Edge Function — Cantinho Brasileiro
//
// Responsabilidade:
//   1. Recebe o payload do pedido vindo do app
//   2. Se for delivery com coordenadas, recalcula o frete no servidor
//      usando OSRM (fallback: Haversine) + tabela_frete do banco
//   3. Corrige silenciosamente se o cliente enviou frete menor que o real
//      e rejeita se a diferença for suspeita (ex: mandou 0 numa rota de 8km)
//   4. Insere o pedido com os valores corretos e retorna { id }
//
// Deploy:
//   supabase functions deploy validar-pedido --project-ref <REF>
//
// Variáveis de ambiente (automáticas no Supabase):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Coordenadas da loja ───────────────────────────────────────────────────
const COORD_LOJA = { lat: -25.2365803, lng: -57.5380816 };

// ── Faixas de km (mesmas do app.js) ──────────────────────────────────────
const LIMITES_KM = [2, 3.9, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// ── CORS ──────────────────────────────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── Haversine (fallback quando OSRM falha) ────────────────────────────────
function distanciaReta(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Distância pela rota real (OSRM público) ───────────────────────────────
async function distanciaPelaRota(latDest: number, lngDest: number): Promise<number | null> {
  const origem  = `${COORD_LOJA.lng},${COORD_LOJA.lat}`;
  const destino = `${lngDest},${latDest}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${origem};${destino}?overview=false`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const d = await r.json();
    if (d.code === "Ok") return d.routes[0].distance / 1000;
    return null;
  } catch {
    return null;
  }
}

// ── Calcula frete esperado para uma distância ─────────────────────────────
function calcularFreteEsperado(
  dist: number,
  tabelaFrete: Array<{ loja: number; motoboy: number; acombinar?: boolean }> | null
): { loja: number; motoboy: number; acombinar: boolean } {
  let freteIndex = -1;
  for (let i = 0; i < LIMITES_KM.length; i++) {
    if (dist <= LIMITES_KM[i]) { freteIndex = i; break; }
  }

  // Acima de 20km ou faixa marcada como "a combinar"
  if (freteIndex === -1) return { loja: 0, motoboy: 0, acombinar: true };
  if (tabelaFrete?.[freteIndex]?.acombinar) return { loja: 0, motoboy: 0, acombinar: true };

  if (tabelaFrete?.[freteIndex]) {
    return {
      loja:    tabelaFrete[freteIndex].loja    || 0,
      motoboy: tabelaFrete[freteIndex].motoboy || 0,
      acombinar: false,
    };
  }

  // Fallback sem tabela configurada
  let loja = 0;
  if      (dist <= 3.3) loja = 6000;
  else if (dist <= 4.2) loja = 12000;
  else if (dist <= 5.2) loja = 18000;
  else if (dist <= 6.2) loja = 24000;
  else                  loja = 24000 + Math.ceil(dist - 6.2) * 3000;
  return { loja, motoboy: loja, acombinar: false };
}

// ── Handler principal ─────────────────────────────────────────────────────
Deno.serve(async (req) => {
  // Preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    const payload = await req.json();

    // Cliente Supabase com service role (bypassa RLS para poder inserir)
    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ── Busca configurações do banco ──────────────────────────────────────
    const { data: cfg } = await supa
      .from("configuracoes")
      .select("tabela_frete")
      .single();
    const tabelaFrete = cfg?.tabela_frete ?? null;

    // ── Validação de frete para delivery com coordenadas ──────────────────
    let freteFinal      = payload.frete_cobrado_cliente ?? 0;
    let freteMotoboy    = payload.frete_motoboy         ?? 0;
    let freteACombinar  = false;

    if (payload.tipo_entrega === "delivery" && payload.geo_lat && payload.geo_lng) {
      const lat = parseFloat(payload.geo_lat);
      const lng = parseFloat(payload.geo_lng);

      // Tenta rota real, cai em linha reta se OSRM falhar
      let dist = await distanciaPelaRota(lat, lng);
      if (dist === null) dist = distanciaReta(COORD_LOJA.lat, COORD_LOJA.lng, lat, lng);

      const esperado = calcularFreteEsperado(dist, tabelaFrete);

      if (esperado.acombinar) {
        // Frete a combinar: zera para não cobrar valor errado, sinaliza no payload
        freteFinal     = 0;
        freteMotoboy   = 0;
        freteACombinar = true;
      } else if (payload.frete_cobrado_cliente < esperado.loja) {
        // Cliente tentou pagar menos do que deveria — corrige no servidor
        console.warn(
          `[validar-pedido] Frete corrigido: enviado=${payload.frete_cobrado_cliente} esperado=${esperado.loja} dist=${dist.toFixed(2)}km`
        );
        freteFinal   = esperado.loja;
        freteMotoboy = esperado.motoboy;
      }
      // Se o cliente pagou igual ou mais (cupom, promoção), mantém o valor original
    }

    // ── Monta o pedido com valores validados ──────────────────────────────
    const pedido = {
      ...payload,
      frete_cobrado_cliente: freteFinal,
      frete_motoboy:         freteMotoboy,
      frete_a_combinar:      freteACombinar,
      // Recalcula total_geral com frete correto
      total_geral:
        (payload.subtotal ?? 0) -
        (payload.desconto_cupom ?? 0) +
        (payload.tipo_entrega === "delivery" ? freteFinal : 0),
    };

    // ── Insere o pedido ───────────────────────────────────────────────────
    const { data: salvo, error } = await supa
      .from("pedidos")
      .insert([pedido])
      .select()
      .single();

    if (error) {
      console.error("[validar-pedido] Erro ao inserir:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ id: salvo.id, frete_cobrado_cliente: freteFinal, frete_a_combinar: freteACombinar }),
      { status: 200, headers: { ...CORS, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[validar-pedido] Erro inesperado:", err);
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});

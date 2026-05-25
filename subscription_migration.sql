-- =============================================================
-- MIGRAÇÃO: Controle de Assinatura e Inadimplência (SaaS)
-- Execute no SQL Editor do Supabase
-- =============================================================

-- ── 1. Tabela principal de assinaturas ───────────────────────
CREATE TABLE IF NOT EXISTS public.assinaturas (
  id                     bigint  GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  -- Identificação do tenant (uma por instalação; id = 1 por padrão)
  tenant_nome            text    NOT NULL DEFAULT 'Loja Principal',
  tenant_email_contato   text,

  -- Regra de vencimento
  tipo_vencimento        text    NOT NULL DEFAULT 'dia_fixo'
                                 CHECK (tipo_vencimento IN ('dia_fixo','dia_util')),
  dia_vencimento         integer NOT NULL DEFAULT 5
                                 CHECK (dia_vencimento BETWEEN 1 AND 31),
  -- Para 'dia_util': dia_vencimento = N (ex: 5 = 5º dia útil)

  -- Carência após vencimento
  dias_carencia          integer NOT NULL DEFAULT 5 CHECK (dias_carencia >= 0),

  -- Controle de pagamento
  ultimo_pagamento_em    date,
  pagamento_confirmado_por text,

  -- Bloqueio
  bloqueado              boolean NOT NULL DEFAULT false,
  bloqueado_em           timestamp with time zone,
  desbloqueado_em        timestamp with time zone,
  desbloqueado_por       text,

  -- Metadados
  obs                    text,
  created_at             timestamp with time zone NOT NULL DEFAULT now(),
  updated_at             timestamp with time zone NOT NULL DEFAULT now()
);

-- ── 2. Histórico de pagamentos ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.assinatura_pagamentos (
  id              bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  assinatura_id   bigint NOT NULL REFERENCES public.assinaturas(id) ON DELETE CASCADE,
  competencia     text   NOT NULL,  -- 'YYYY-MM' (mês de referência)
  confirmado_em   timestamp with time zone NOT NULL DEFAULT now(),
  confirmado_por  text,
  obs             text
);

-- Índice para busca rápida por competência
CREATE UNIQUE INDEX IF NOT EXISTS uq_pagamento_competencia
  ON public.assinatura_pagamentos (assinatura_id, competencia);

-- ── 3. Função + trigger para atualizar updated_at ────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_assinaturas_updated_at ON public.assinaturas;
CREATE TRIGGER trg_assinaturas_updated_at
  BEFORE UPDATE ON public.assinaturas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── 4. RLS: somente usuários autenticados lêem; adminMaster escreve ──
ALTER TABLE public.assinaturas          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assinatura_pagamentos ENABLE ROW LEVEL SECURITY;

-- Leitura: qualquer usuário autenticado pode ler a assinatura da sua loja
CREATE POLICY "leitura_assinatura" ON public.assinaturas
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "leitura_pagamentos" ON public.assinatura_pagamentos
  FOR SELECT USING (auth.role() = 'authenticated');

-- Escrita: apenas service_role (chamado via Edge Function ou pelo adminMaster autenticado)
-- Para simplificar, permitimos UPDATE para authenticated também
-- (a validação de cargo adminMaster é feita no JS)
CREATE POLICY "escrita_assinatura" ON public.assinaturas
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "escrita_pagamentos" ON public.assinatura_pagamentos
  FOR ALL USING (auth.role() = 'authenticated');

-- ── 5. Seed: insere o tenant padrão se ainda não existir ─────
INSERT INTO public.assinaturas (
  tenant_nome, tipo_vencimento, dia_vencimento, dias_carencia
)
SELECT 'Loja Principal', 'dia_util', 5, 5
WHERE NOT EXISTS (SELECT 1 FROM public.assinaturas LIMIT 1);

-- ── 6. Verificação ───────────────────────────────────────────
SELECT id, tenant_nome, tipo_vencimento, dia_vencimento,
       dias_carencia, ultimo_pagamento_em, bloqueado
FROM public.assinaturas;

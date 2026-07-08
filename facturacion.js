// ============================================================
//  MÓDULO: FACTURACIÓN ELECTRÓNICA (e-kuatia / SIFEN)
//  Arquivo: facturacion.js
//  Requer: supabaseClient.js
// ============================================================

// ──────────────────────────────────────────────────────────────
//  CONFIGURAÇÃO DO PROVEDOR
// ──────────────────────────────────────────────────────────────
const PROVEDOR = {
  provedor: 'SIFENDE',
  baseURL: 'https://api.sifende.com.py/v1',
  apiKey: '', // ← preencher com a chave do provedor
};

// ──────────────────────────────────────────────────────────────
//  ESTADO
// ──────────────────────────────────────────────────────────────
let _fact_config = null;
let _fact_documentos = [];

// ──────────────────────────────────────────────────────────────
//  INICIALIZAR — chamado ao abrir a aba "facturacion"
// ──────────────────────────────────────────────────────────────
async function initFacturacion() {
  console.log('[Facturación] initFacturacion chamado');
  try {
    await carregarConfigFacturacion();
    await carregarDocumentos();
    renderFacturacion();
    console.log('[Facturación] Inicialização concluída');
  } catch (err) {
    console.error('[Facturación] Erro na inicialização:', err);
    alert('Erro ao carregar dados de facturación. Verifique o console.');
  }
}

// ──────────────────────────────────────────────────────────────
//  CARREGAR CONFIGURAÇÕES DO BANCO
// ──────────────────────────────────────────────────────────────
async function carregarConfigFacturacion() {
  console.log('[Facturación] carregarConfigFacturacion');
  const { data, error } = await supa
    .from('configuracoes')
    .select('facturacion_config')
    .maybeSingle();

  if (error) {
    console.warn('[Facturación] Erro ao carregar config:', error);
    // Se a coluna não existir, cria um objeto vazio
    _fact_config = {
      ruc: '',
      razao_social: '',
      nome_fantasia: '',
      endereco: '',
      telefone: '',
      email: '',
      atividade_economica: '',
      regime_tributario: 'general',
      ambiente: 'homologacao',
      provedor: PROVEDOR.provedor,
      api_key: PROVEDOR.apiKey,
    };
    return;
  }

  // Se não houver dados, usa valores padrão
  _fact_config = data?.facturacion_config || {
    ruc: '',
    razao_social: '',
    nome_fantasia: '',
    endereco: '',
    telefone: '',
    email: '',
    atividade_economica: '',
    regime_tributario: 'general',
    ambiente: 'homologacao',
    provedor: PROVEDOR.provedor,
    api_key: PROVEDOR.apiKey,
  };
  console.log('[Facturación] Config carregada:', _fact_config);
}

// ──────────────────────────────────────────────────────────────
//  CARREGAR DOCUMENTOS EMITIDOS
// ──────────────────────────────────────────────────────────────
async function carregarDocumentos() {
  console.log('[Facturación] carregarDocumentos');
  const { data, error } = await supa
    .from('facturas')
    .select('*, pedidos(cliente_nome, total_geral)')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.warn('[Facturación] Erro ao carregar documentos:', error);
    _fact_documentos = [];
    return;
  }

  _fact_documentos = data || [];
  console.log(`[Facturación] ${_fact_documentos.length} documentos carregados`);
}

// ──────────────────────────────────────────────────────────────
//  RENDERIZAR TUDO
// ──────────────────────────────────────────────────────────────
function renderFacturacion() {
  console.log('[Facturación] renderFacturacion');
  
  // Verifica se os elementos existem antes de preencher
  const campos = [
    'fact-ruc', 'fact-razao', 'fact-fantasia', 'fact-endereco',
    'fact-telefone', 'fact-email', 'fact-atividade', 'fact-regime',
    'fact-ambiente'
  ];
  let elementosOK = true;
  campos.forEach(id => {
    if (!document.getElementById(id)) {
      console.warn(`[Facturación] Elemento #${id} não encontrado no DOM`);
      elementosOK = false;
    }
  });

  if (!elementosOK) {
    console.error('[Facturación] DOM incompleto — verifique o HTML');
    return;
  }

  // Preenche os campos com os valores atuais
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val ?? '';
  };

  setVal('fact-ruc', _fact_config.ruc);
  setVal('fact-razao', _fact_config.razao_social);
  setVal('fact-fantasia', _fact_config.nome_fantasia);
  setVal('fact-endereco', _fact_config.endereco);
  setVal('fact-telefone', _fact_config.telefone);
  setVal('fact-email', _fact_config.email);
  setVal('fact-atividade', _fact_config.atividade_economica);
  setVal('fact-regime', _fact_config.regime_tributario);
  setVal('fact-ambiente', _fact_config.ambiente);
  setVal('fact-api-key', _fact_config.api_key || _fact_config.provedor_api_key || '');

  // Renderiza a lista de documentos
  renderListaDocumentos();
  console.log('[Facturación] renderFacturacion concluído');
}

// ──────────────────────────────────────────────────────────────
//  RENDERIZAR LISTA DE DOCUMENTOS
// ──────────────────────────────────────────────────────────────
function renderListaDocumentos() {
  const tbody = document.getElementById('fact-documentos-tbody');
  if (!tbody) {
    console.warn('[Facturación] #fact-documentos-tbody não encontrado');
    return;
  }

  if (!_fact_documentos || _fact_documentos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#aaa;padding:20px;">
      Nenhum documento eletrônico emitido ainda.
    </td></tr>`;
    return;
  }

  tbody.innerHTML = _fact_documentos.map(doc => {
    const data = new Date(doc.created_at).toLocaleString('es-PY');
    const estado = doc.estado === 'aprovado' 
      ? '<span style="color:#27ae60;">✅ Aprovado</span>'
      : doc.estado === 'rejeitado'
        ? '<span style="color:#e74c3c;">❌ Rejeitado</span>'
        : '<span style="color:#f39c12;">⏳ Pendente</span>';

    return `<tr>
      <td>${doc.kude || 'N/A'}</td>
      <td>${data}</td>
      <td>${doc.pedidos?.cliente_nome || '—'}</td>
      <td>Gs ${(doc.pedidos?.total_geral || 0).toLocaleString('es-PY')}</td>
      <td>${estado}</td>
    </tr>`;
  }).join('');
}

// ──────────────────────────────────────────────────────────────
//  SALVAR CONFIGURAÇÕES
// ──────────────────────────────────────────────────────────────
async function salvarConfigFacturacion() {
  console.log('[Facturación] salvarConfigFacturacion');
  const getVal = (id) => document.getElementById(id)?.value?.trim() || '';

  const config = {
    ruc: getVal('fact-ruc'),
    razao_social: getVal('fact-razao'),
    nome_fantasia: getVal('fact-fantasia'),
    endereco: getVal('fact-endereco'),
    telefone: getVal('fact-telefone'),
    email: getVal('fact-email'),
    atividade_economica: getVal('fact-atividade'),
    regime_tributario: getVal('fact-regime') || 'general',
    ambiente: getVal('fact-ambiente') || 'homologacao',
    provedor: PROVEDOR.provedor,
    api_key: getVal('fact-api-key'),
  };

  const { error } = await supa
    .from('configuracoes')
    .update({ facturacion_config: config })
    .gt('id', 0);

  if (error) {
    alert('❌ Erro ao salvar: ' + error.message);
    console.error('[Facturación] Erro no update:', error);
    return;
  }

  _fact_config = config;
  alert('✅ Configurações salvas com sucesso!');
  console.log('[Facturación] Config salva:', config);
}

// ──────────────────────────────────────────────────────────────
//  EMITIR FACTURA (via provedor API)
// ──────────────────────────────────────────────────────────────
async function emitirFactura(pedidoId, dadosCliente = null) {
  console.log('[Facturación] emitirFactura para pedido', pedidoId);
  if (!_fact_config?.ruc) {
    alert('⚠️ Configure os dados do contribuinte antes de emitir.');
    return null;
  }

  const { data: pedido, error } = await supa
    .from('pedidos')
    .select('*')
    .eq('id', pedidoId)
    .single();

  if (error || !pedido) {
    alert('Pedido não encontrado.');
    return null;
  }

  const { data: existente } = await supa
    .from('facturas')
    .select('id')
    .eq('pedido_id', pedidoId)
    .maybeSingle();

  if (existente) {
    alert('⚠️ Este pedido já possui uma factura emitida.');
    return null;
  }

  const payload = montarPayloadFactura(pedido, dadosCliente);

  try {
    const response = await fetch(`${PROVEDOR.baseURL}/factura`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${_fact_config.api_key || PROVEDOR.apiKey}`,
        'X-Ambiente': _fact_config.ambiente,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.mensaje || 'Erro ao emitir factura');
    }

    const qrCodeData = result.qr_code || result.qr_code_url || null;
    const linkValidacao = result.link_validacao || null;

    await salvarFacturaNoBanco(pedidoId, {
      kude: result.kude || result.id || '',
      estado: result.estado || 'aprovado',
      xml: result.xml || '',
      qr_code: qrCodeData,
      link_validacao: linkValidacao,
      respuesta_dnit: result.respuesta || result,
    });

    alert(`✅ Factura emitida com sucesso!\nKUDE: ${result.kude || 'N/A'}`);
    carregarDocumentos();
    renderListaDocumentos();
    return result;
  } catch (err) {
    console.error('[Facturación] Erro ao emitir:', err);
    alert('❌ Erro ao emitir factura: ' + err.message);
    return null;
  }
}

// ──────────────────────────────────────────────────────────────
//  MONTAR PAYLOAD
// ──────────────────────────────────────────────────────────────
function montarPayloadFactura(pedido, dadosCliente) {
  const cliente = dadosCliente || {
    nome: pedido.cliente_nome || 'Consumidor Final',
    ruc: pedido.dados_factura?.ruc || '',
    email: pedido.dados_factura?.email || '',
    telefone: pedido.cliente_telefone || '',
    endereco: pedido.endereco_entrega || '',
  };

  const itens = (pedido.itens || []).map(item => ({
    codigo: item.id || item.produto_id || '',
    descricao: item.nome || item.n || 'Produto',
    quantidade: item.qtd || item.q || 1,
    precio_unitario: item.preco || item.p || 0,
    iva: 0,
    total: (item.preco || item.p || 0) * (item.qtd || item.q || 1),
  }));

  const total = itens.reduce((acc, i) => acc + i.total, 0);

  return {
    tipo: 'factura',
    ruc_emisor: _fact_config.ruc,
    ruc_receptor: cliente.ruc || '0',
    razon_social_receptor: cliente.nome,
    email_receptor: cliente.email || '',
    telefono_receptor: cliente.telefone || '',
    direccion_receptor: cliente.endereco || '',
    items: itens,
    total: total,
    moneda: 'PYG',
    fecha: new Date().toISOString(),
    observaciones: `Pedido #${pedido.id} - ${pedido.uid_temporal || ''}`,
  };
}

// ──────────────────────────────────────────────────────────────
//  SALVAR FACTURA NO BANCO
// ──────────────────────────────────────────────────────────────
async function salvarFacturaNoBanco(pedidoId, resultado) {
  console.log('[Facturación] salvarFacturaNoBanco para pedido', pedidoId);
  const { error } = await supa.from('facturas').insert([{
    pedido_id: pedidoId,
    kude: resultado.kude || '',
    estado: resultado.estado || 'aprovado',
    xml: resultado.xml || '',
    qr_code: resultado.qr_code || null,
    link_validacao: resultado.link_validacao || null,
    respuesta_dnit: resultado.respuesta_dnit || null,
    created_at: new Date().toISOString(),
  }]);

  if (error) {
    console.warn('[Facturación] Erro ao salvar factura no banco:', error);
  }
}

// ──────────────────────────────────────────────────────────────
//  EMITIR FACTURA A PARTIR DE UM PEDIDO EXISTENTE (via botão)
// ──────────────────────────────────────────────────────────────
async function emitirFacturaDoPedido(pedidoId) {
  if (!pedidoId || isNaN(pedidoId)) {
    alert('Digite um número de pedido válido.');
    return;
  }
  if (!confirm('Emitir factura electrónica para este pedido?')) return;
  await emitirFactura(pedidoId);
}

// ──────────────────────────────────────────────────────────────
//  CONSULTAR STATUS DE UMA FACTURA
// ──────────────────────────────────────────────────────────────
async function consultarStatusFactura(kude) {
  try {
    const response = await fetch(`${PROVEDOR.baseURL}/consulta/${kude}`, {
      headers: {
        'Authorization': `Bearer ${_fact_config?.api_key || PROVEDOR.apiKey}`,
      },
    });
    const result = await response.json();
    alert(`📄 Status da factura ${kude}:\n${JSON.stringify(result, null, 2)}`);
    return result;
  } catch (err) {
    alert('Erro ao consultar: ' + err.message);
  }
}
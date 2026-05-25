// ============================================================
// admin-i18n.js — Sistema de Tradução do Painel Admin
// Idiomas suportados: pt (Português BR) | es (Español PY)
// Uso:
//   HTML estático: <span data-i18n="sidebar.pedidos">Pedidos</span>
//   JS dinâmico:   t('alerts.saved')  →  "Salvo!" / "¡Guardado!"
// ============================================================

const ADMIN_LANGS = {

  // ══════════════════════════════════════════════════════════
  // PORTUGUÊS (padrão)
  // ══════════════════════════════════════════════════════════
  pt: {
    // ── Sidebar ────────────────────────────────────────────
    'sidebar.visao':        'Visão',
    'sidebar.pdv':          'PDV Balcão',
    'sidebar.pedidos':      'Pedidos',
    'sidebar.cozinha':      'Cozinha',
    'sidebar.equipe':       'Equipe',
    'sidebar.financeiro':   'Financeiro',
    'sidebar.config':       'Config',
    'sidebar.master':       'Master',
    'sidebar.estoque':      'Estoque',
    'sidebar.turnos':       'Turnos',
    'sidebar.sair':         'Sair',

    // ── Dashboard ──────────────────────────────────────────
    'dash.title':           'Painel de Controle',
    'dash.vendas_hoje':     'Vendas Hoje',
    'dash.pedidos_hoje':    'Pedidos Hoje',
    'dash.custo_moto':      'Custo Entregas',
    'dash.em_preparo':      'Em Preparo',
    'dash.top_produtos':    'Top Produtos',
    'dash.clientes':        'Clientes Assíduos',
    'dash.periodo':         'Período',
    'dash.hoje':            'Hoje',
    'dash.7dias':           '7 dias',
    'dash.30dias':          '30 dias',
    'dash.mes':             'Este mês',
    'dash.personalizado':   'Personalizado',
    'dash.nenhuma_venda':   'Nenhuma venda no período',

    // ── Pedidos ────────────────────────────────────────────
    'pedidos.title':        'Pedidos',
    'pedidos.cliente':      'Cliente',
    'pedidos.status':       'Status',
    'pedidos.total':        'Total',
    'pedidos.acoes':        'Ações',
    'pedidos.nenhum':       'Nenhum pedido ativo.',
    'pedidos.cozinha':      '🔥 Cozinha',
    'pedidos.confirmar':    '✅ Confirmar',
    'pedidos.imprimir':     'Imprimir',
    'pedidos.cancelar':     'Cancelar',
    'pedidos.solicitar_cancel': '🚫 Solicitar Cancelamento',
    'pedidos.aprovar':      '✅ Aprovar',
    'pedidos.negar':        '❌ Negar',
    'pedidos.avisar':       'Avisar Cliente',
    'pedidos.rota':         '🛵 Enviar Rota',
    'pedidos.sel_motoboy':  'Selecione o motoboy...',
    'pedidos.auto_confirm': '⏰ Auto-confirmado (4h)',

    // ── Status badges ──────────────────────────────────────
    'status.pendente':        'PENDENTE',
    'status.em_preparo':      'EM PREPARO',
    'status.pronto_entrega':  'PRONTO',
    'status.saiu_entrega':    'SAIU',
    'status.entregue':        'ENTREGUE',
    'status.cancelado':       'CANCELADO',

    // ── Cozinha (KDS) ──────────────────────────────────────
    'kds.title':            'Monitor de Cozinha (KDS)',
    'kds.livre':            '👨‍🍳 Cozinha Livre!',
    'kds.pronto':           '✅ PRONTO',
    'kds.min':              'min',

    // ── PDV ────────────────────────────────────────────────
    'pdv.title':            '🏪 Venda Balcão (PDV)',
    'pdv.buscar':           '🔍 Buscar produto...',
    'pdv.mesa_num':         'Nº',
    'pdv.mesa_nome':        'Nome',
    'pdv.telefone':         'Telefone',
    'pdv.tipo_pedido':      'Tipo de Pedido',
    'pdv.subtotal':         'Subtotal:',
    'pdv.desconto':         '🏷️ Desconto',
    'pdv.total':            'Total:',
    'pdv.lancar':           '✅ Lançar Pedido',
    'pdv.venda':            'Venda',
    'pdv.mesas':            'Mesas',
    'pdv.nenhuma_mesa':     'Nenhuma mesa ativa',
    'pdv.mesas_andamento':  'Pedidos em Andamento',
    'pdv.entregar':         'Entregar / Baixar',
    'pdv.na_cozinha':       '🔥 Na Cozinha',

    // ── Financeiro ─────────────────────────────────────────
    'fin.title':            '💰 Controle Financeiro',
    'fin.faturamento':      'Faturamento',
    'fin.custo_moto':       'Custo Entregas',
    'fin.lucro':            'Lucro Operacional',
    'fin.pedidos':          'Pedidos',
    'fin.ticket_medio':     'Ticket Médio',
    'fin.por_pagamento':    '💳 Por Forma de Pagamento',
    'fin.pix':              'Pix',
    'fin.transferencia':    'Transferência',
    'fin.cartao':           'Cartão',
    'fin.dinheiro':         'Dinheiro',
    'fin.motoboys':         '🏍️ Relatório Motoboys',
    'fin.filtrar':          'Filtrar',
    'fin.exportar_csv':     '📊 CSV / Power BI',
    'fin.exportar_pdf':     '📄 PDF',
    'fin.graficos':         '📈 Gráficos',
    'fin.fechar_caixa':     'Fechar Caixa',
    'fin.periodo_inicio':   'Início',
    'fin.periodo_fim':      'Fim',
    'fin.forma_pag':        'Forma de Pag.',
    'fin.todos':            'Todos',
    'fin.caixa_ctrl':       'Controle de Caixa',
    'fin.abertura':         '🟢 Abertura',
    'fin.suprimento':       '➕ Suprimento',
    'fin.sangria':          '💸 Sangria',
    'fin.despesa':          '🧾 Despesa',

    // ── Produtos ───────────────────────────────────────────
    'prod.title':           'Produtos',
    'prod.novo':            '+ Novo Produto',
    'prod.buscar':          '🔍 Buscar produto...',
    'prod.editar':          'Editar',
    'prod.pausar':          'Pausar',
    'prod.reativar':        'Reativar',
    'prod.excluir':         'Excluir',
    'prod.duplicar':        'Duplicar',
    'prod.nome':            'Nome',
    'prod.descricao':       'Descrição',
    'prod.preco':           'Preço base (Gs)',
    'prod.categoria':       'Categoria',
    'prod.subcategoria':    'Subcategoria',
    'prod.imagem':          'Imagem (Upload ou URL)',
    'prod.salvar':          'Salvar Produto',
    'prod.cancelar':        'Cancelar',
    'prod.tipo':            'Tipo de Produto',
    'prod.somente_balcao':  'Somente Balcão',
    'prod.extras':          'Tem adicionais?',
    'prod.estoque':         'Vincular ao estoque',

    // ── Categorias ─────────────────────────────────────────
    'cat.title':            '🏷️ Categorias do Cardápio',
    'cat.nova':             '+ Nova Categoria',
    'cat.nome':             'Nome Exibição',
    'cat.slug':             'Slug (ID único)',
    'cat.ordem':            'Ordem',
    'cat.horario':          'Horário (opcional)',
    'cat.salvar':           'Salvar',

    // ── Motoboys ───────────────────────────────────────────
    'moto.title':           'Equipe Motoboys',
    'moto.novo':            '+ Novo Motoboy',
    'moto.nome':            'Nome',
    'moto.telefone':        'Telefone (WhatsApp)',
    'moto.salvar':          'Salvar',

    // ── Equipe ─────────────────────────────────────────────
    'equipe.title':         'Gestão de Equipe',
    'equipe.nome':          'Nome',
    'equipe.email':         'Email',
    'equipe.cargo':         'Cargo',
    'equipe.desde':         'Desde',
    'equipe.acoes':         'Ações',
    'equipe.novo_usuario':  'Novo Usuário',
    'equipe.criar':         'Criar',
    'equipe.promover':      'Promover',
    'equipe.rebaixar':      'Rebaixar',
    'equipe.excluir':       'Excluir',

    // ── Configurações ──────────────────────────────────────
    'cfg.title':            '⚙️ Configurações',
    'cfg.identidade':       '🏪 Identidade da Loja',
    'cfg.nome_rest':        'Nome do Restaurante',
    'cfg.descricao':        'Descrição (tagline)',
    'cfg.url':              'URL do Site',
    'cfg.telefone':         'Telefone (exibição)',
    'cfg.whatsapp':         'WhatsApp para pedidos',
    'cfg.logo':             'Logo / Ícone',
    'cfg.salvar_id':        '💾 Salvar Identidade',
    'cfg.pagamento':        '💳 Dados de Pagamento',
    'cfg.chave_pix':        'Chave Pix',
    'cfg.nome_pix':         'Nome titular Pix',
    'cfg.alias':            'Número / Alias (PY)',
    'cfg.nome_alias':       'Nome titular Alias',
    'cfg.localizacao':      '📍 Localização',
    'cfg.lat':              'Latitude da Loja',
    'cfg.lng':              'Longitude da Loja',
    'cfg.operacao':         '🕐 Operação & Horários',
    'cfg.status_loja':      'Status Manual da Loja',
    'cfg.cotacao':          'Cotação Real (Gs/R$)',
    'cfg.salvar_loc':       '💾 Salvar Localização & Operação',
    'cfg.visual':           '🎨 Personalização Visual',
    'cfg.cor_primaria':     'Cor Principal (botões)',
    'cfg.icone_upload':     'Upload de Ícone',
    'cfg.salvar_visual':    '🎨 Salvar Personalização',
    'cfg.banners':          '🏷️ Banners Promocionais',
    'cfg.frete':            '🚗 Tabela de Frete',
    'cfg.limite_dist':      'Limite de distância (km)',
    'cfg.taxa_moto':        'Taxa base motoboy (Gs)',
    'cfg.salvar_frete':     '💾 Salvar Tabela de Frete',
    'cfg.cupons':           '🎟️ Gestão de Cupons',
    'cfg.novo_cupom':       '+ Novo Cupom',
    'cfg.extras_globais':   '➕ Adicionais Globais',

    // ── Estoque ────────────────────────────────────────────
    'estoque.title':        'Gestão de Estoque',
    'estoque.novo':         '+ Novo Item',
    'estoque.buscar':       '🔍 Buscar...',
    'estoque.todos':        'Todos',
    'estoque.ok':           'OK',
    'estoque.baixo':        'Baixo',
    'estoque.zerado':       'Zerado',
    'estoque.nome':         'Nome do Item',
    'estoque.qtd':          'Quantidade',
    'estoque.unidade':      'Unidade',
    'estoque.minimo':       'Qtd. Mínima',
    'estoque.obs':          'Observações',
    'estoque.salvar':       'Salvar',
    'estoque.ajuste':       'Ajuste de Estoque',
    'estoque.adicionar':    'Adicionar',
    'estoque.subtrair':     'Subtrair',
    'estoque.definir':      'Definir',
    'estoque.motivo':       'Motivo (opcional)',
    'estoque.confirmar':    'Confirmar Ajuste',

    // ── Alerts / Confirms ──────────────────────────────────
    'alert.salvo':               '✅ Salvo com sucesso!',
    'alert.erro':                '❌ Erro: ',
    'alert.confirmado':          '✅ Confirmado!',
    'alert.cancelado':           '✅ Pedido cancelado com sucesso!',
    'alert.cancel_enviado':      '✅ Solicitação enviada! O dono será notificado.',
    'alert.cancel_negado':       '✅ Solicitação de cancelamento negada.',
    'alert.produto_salvo':       '✅ Produto salvo com sucesso!',
    'alert.produto_pausado':     '⏸️ Produto pausado!',
    'alert.produto_reativado':   '✅ Produto reativado!',
    'alert.produto_duplicado':   '✅ Produto duplicado! A cópia foi criada pausada.',
    'alert.produto_excluido':    '✅ Produto deletado com sucesso!',
    'alert.cat_salva':           '✅ Categoria salva!',
    'alert.cat_excluida':        '✅ Categoria deletada!',
    'alert.moto_salvo':          '✅ Motoboy salvo com sucesso!',
    'alert.moto_excluido':       '✅ Motoboy deletado com sucesso!',
    'alert.cfg_salvas':          '✅ Configurações salvas com sucesso!',
    'alert.frete_salvo':         '✅ Tabela de frete salva!',
    'alert.cupom_salvo':         '✅ Cupom salvo com sucesso!',
    'alert.usuario_criado':      '✅ Usuário criado com sucesso!',
    'alert.cargo_alterado':      '✅ Cargo alterado!',
    'alert.acesso_negado':       'Acesso negado.',
    'alert.carrinho_vazio':      'Carrinho vazio!',
    'alert.sel_pedidos_moto':    'Selecione os pedidos e o motoboy!',
    'alert.features_salvas':     '✅ Features salvas!',
    'alert.caixa_reaberto':      '✅ Caixa reaberto!',
    'alert.operacao_registrada': '✅ Operação registrada!',
    'alert.delivery_encerrado':  '✅ Delivery encerrado!',
    'alert.delivery_reaberto':   '✅ Delivery reaberto com sucesso!',
    'alert.horario_estendido':   '✅ Horário estendido!',
    'alert.csv_exportado':       '✅ CSV exportado com sucesso!',

    'confirm.cancelar_pedido':   '⚠️ Confirma o CANCELAMENTO deste pedido?\nEsta ação não pode ser desfeita.',
    'confirm.excluir_produto':   '⚠️ Deletar este produto?\nEsta ação não pode ser desfeita.',
    'confirm.excluir_cat':       '⚠️ Deletar esta categoria?\nEsta ação não pode ser desfeita.',
    'confirm.excluir_moto':      '⚠️ Deletar este motoboy?\nEsta ação não pode ser desfeita.',
    'confirm.excluir_usuario':   '⚠️ Excluir este usuário?\nIsso remove apenas o perfil.',
    'confirm.fechar_caixa':      'Fechar o caixa de hoje?',
    'confirm.duplicar_produto':  'Duplicar este produto? Uma cópia será criada pausada.',
    'confirm.encerrar_delivery': 'Fechar o delivery agora?',
    'confirm.reabrir_delivery':  'Reabrir o delivery para novos pedidos?',
    'confirm.aprovar_cancel':    '⚠️ Confirma o CANCELAMENTO deste pedido?',
    'confirm.reabrir_caixa':     'Autorizar reabertura do caixa?',

    'prompt.motivo_cancel':      '🚫 Solicitar cancelamento\n\nInforme o motivo:',
    'prompt.negar_cancel':       'Motivo para NEGAR o cancelamento (opcional):',
    'prompt.motivo_ajuste':      'Motivo do ajuste (opcional):',

    // ── Cargos ─────────────────────────────────────────────
    'cargo.adminMaster':    '🎮 ADMIN MASTER',
    'cargo.dono':           '🔑 DONO',
    'cargo.gerente':        '👔 GERENTE',
    'cargo.funcionario':    '👷 FUNCIONÁRIO',
    'cargo.garcom':         '🍽️ GARÇOM',

    // ── Geral ──────────────────────────────────────────────
    'geral.salvar':         'Salvar',
    'geral.cancelar':       'Cancelar',
    'geral.editar':         'Editar',
    'geral.excluir':        'Excluir',
    'geral.novo':           'Novo',
    'geral.buscar':         'Buscar',
    'geral.filtrar':        'Filtrar',
    'geral.carregando':     'Carregando...',
    'geral.sem_dados':      'Nenhum dado encontrado.',
    'geral.aberto':         '🟢 Aberto',
    'geral.fechado':        '🔴 Fechado',
    'geral.sim':            'Sim',
    'geral.nao':            'Não',
    'geral.todos':          'Todos',
    'geral.hoje':           'Hoje',
  },

  // ══════════════════════════════════════════════════════════
  // ESPAÑOL (Paraguay)
  // ══════════════════════════════════════════════════════════
  es: {
    // ── Sidebar ────────────────────────────────────────────
    'sidebar.visao':        'Visión',
    'sidebar.pdv':          'PDV Mostrador',
    'sidebar.pedidos':      'Pedidos',
    'sidebar.cozinha':      'Cocina',
    'sidebar.equipe':       'Equipo',
    'sidebar.financeiro':   'Finanzas',
    'sidebar.config':       'Config',
    'sidebar.master':       'Master',
    'sidebar.estoque':      'Stock',
    'sidebar.turnos':       'Turnos',
    'sidebar.sair':         'Salir',

    // ── Dashboard ──────────────────────────────────────────
    'dash.title':           'Panel de Control',
    'dash.vendas_hoje':     'Ventas Hoy',
    'dash.pedidos_hoje':    'Pedidos Hoy',
    'dash.custo_moto':      'Costo Entregas',
    'dash.em_preparo':      'En Preparación',
    'dash.top_produtos':    'Top Productos',
    'dash.clientes':        'Clientes Frecuentes',
    'dash.periodo':         'Período',
    'dash.hoje':            'Hoy',
    'dash.7dias':           '7 días',
    'dash.30dias':          '30 días',
    'dash.mes':             'Este mes',
    'dash.personalizado':   'Personalizado',
    'dash.nenhuma_venda':   'Sin ventas en el período',

    // ── Pedidos ────────────────────────────────────────────
    'pedidos.title':        'Pedidos',
    'pedidos.cliente':      'Cliente',
    'pedidos.status':       'Estado',
    'pedidos.total':        'Total',
    'pedidos.acoes':        'Acciones',
    'pedidos.nenhum':       'Ningún pedido activo.',
    'pedidos.cozinha':      '🔥 Cocina',
    'pedidos.confirmar':    '✅ Confirmar',
    'pedidos.imprimir':     'Imprimir',
    'pedidos.cancelar':     'Cancelar',
    'pedidos.solicitar_cancel': '🚫 Solicitar Cancelación',
    'pedidos.aprovar':      '✅ Aprobar',
    'pedidos.negar':        '❌ Negar',
    'pedidos.avisar':       'Avisar Cliente',
    'pedidos.rota':         '🛵 Enviar Ruta',
    'pedidos.sel_motoboy':  'Seleccionar repartidor...',
    'pedidos.auto_confirm': '⏰ Auto-confirmado (4h)',

    // ── Status badges ──────────────────────────────────────
    'status.pendente':        'PENDIENTE',
    'status.em_preparo':      'EN PREPARACIÓN',
    'status.pronto_entrega':  'LISTO',
    'status.saiu_entrega':    'EN CAMINO',
    'status.entregue':        'ENTREGADO',
    'status.cancelado':       'CANCELADO',

    // ── Cozinha (KDS) ──────────────────────────────────────
    'kds.title':            'Monitor de Cocina (KDS)',
    'kds.livre':            '👨‍🍳 ¡Cocina libre!',
    'kds.pronto':           '✅ LISTO',
    'kds.min':              'min',

    // ── PDV ────────────────────────────────────────────────
    'pdv.title':            '🏪 Venta Mostrador (PDV)',
    'pdv.buscar':           '🔍 Buscar producto...',
    'pdv.mesa_num':         'Nº',
    'pdv.mesa_nome':        'Nombre',
    'pdv.telefone':         'Teléfono',
    'pdv.tipo_pedido':      'Tipo de Pedido',
    'pdv.subtotal':         'Subtotal:',
    'pdv.desconto':         '🏷️ Descuento',
    'pdv.total':            'Total:',
    'pdv.lancar':           '✅ Lanzar Pedido',
    'pdv.venda':            'Venta',
    'pdv.mesas':            'Mesas',
    'pdv.nenhuma_mesa':     'Ninguna mesa activa',
    'pdv.mesas_andamento':  'Pedidos en Curso',
    'pdv.entregar':         'Entregar / Cerrar',
    'pdv.na_cozinha':       '🔥 En Cocina',

    // ── Financeiro ─────────────────────────────────────────
    'fin.title':            '💰 Control Financiero',
    'fin.faturamento':      'Facturación',
    'fin.custo_moto':       'Costo Entregas',
    'fin.lucro':            'Resultado Operacional',
    'fin.pedidos':          'Pedidos',
    'fin.ticket_medio':     'Ticket Promedio',
    'fin.por_pagamento':    '💳 Por Forma de Pago',
    'fin.pix':              'Pix',
    'fin.transferencia':    'Transferencia',
    'fin.cartao':           'Tarjeta',
    'fin.dinheiro':         'Efectivo',
    'fin.motoboys':         '🏍️ Informe Repartidores',
    'fin.filtrar':          'Filtrar',
    'fin.exportar_csv':     '📊 CSV / Power BI',
    'fin.exportar_pdf':     '📄 PDF',
    'fin.graficos':         '📈 Gráficos',
    'fin.fechar_caixa':     'Cerrar Caja',
    'fin.periodo_inicio':   'Inicio',
    'fin.periodo_fim':      'Fin',
    'fin.forma_pag':        'Forma de Pago',
    'fin.todos':            'Todos',
    'fin.caixa_ctrl':       'Control de Caja',
    'fin.abertura':         '🟢 Apertura',
    'fin.suprimento':       '➕ Suministro',
    'fin.sangria':          '💸 Retiro',
    'fin.despesa':          '🧾 Gasto',

    // ── Produtos ───────────────────────────────────────────
    'prod.title':           'Productos',
    'prod.novo':            '+ Nuevo Producto',
    'prod.buscar':          '🔍 Buscar producto...',
    'prod.editar':          'Editar',
    'prod.pausar':          'Pausar',
    'prod.reativar':        'Reactivar',
    'prod.excluir':         'Eliminar',
    'prod.duplicar':        'Duplicar',
    'prod.nome':            'Nombre',
    'prod.descricao':       'Descripción',
    'prod.preco':           'Precio base (Gs)',
    'prod.categoria':       'Categoría',
    'prod.subcategoria':    'Subcategoría',
    'prod.imagem':          'Imagen (Upload o URL)',
    'prod.salvar':          'Guardar Producto',
    'prod.cancelar':        'Cancelar',
    'prod.tipo':            'Tipo de Producto',
    'prod.somente_balcao':  'Solo Mostrador',
    'prod.extras':          '¿Tiene adicionales?',
    'prod.estoque':         'Vincular al stock',

    // ── Categorias ─────────────────────────────────────────
    'cat.title':            '🏷️ Categorías del Menú',
    'cat.nova':             '+ Nueva Categoría',
    'cat.nome':             'Nombre Exhibición',
    'cat.slug':             'Slug (ID único)',
    'cat.ordem':            'Orden',
    'cat.horario':          'Horario (opcional)',
    'cat.salvar':           'Guardar',

    // ── Motoboys ───────────────────────────────────────────
    'moto.title':           'Equipo Repartidores',
    'moto.novo':            '+ Nuevo Repartidor',
    'moto.nome':            'Nombre',
    'moto.telefone':        'Teléfono (WhatsApp)',
    'moto.salvar':          'Guardar',

    // ── Equipe ─────────────────────────────────────────────
    'equipe.title':         'Gestión de Equipo',
    'equipe.nome':          'Nombre',
    'equipe.email':         'Email',
    'equipe.cargo':         'Cargo',
    'equipe.desde':         'Desde',
    'equipe.acoes':         'Acciones',
    'equipe.novo_usuario':  'Nuevo Usuario',
    'equipe.criar':         'Crear',
    'equipe.promover':      'Promover',
    'equipe.rebaixar':      'Rebajar',
    'equipe.excluir':       'Eliminar',

    // ── Configurações ──────────────────────────────────────
    'cfg.title':            '⚙️ Configuraciones',
    'cfg.identidade':       '🏪 Identidad del Local',
    'cfg.nome_rest':        'Nombre del Restaurante',
    'cfg.descricao':        'Descripción (tagline)',
    'cfg.url':              'URL del Sitio',
    'cfg.telefone':         'Teléfono (exhibición)',
    'cfg.whatsapp':         'WhatsApp para pedidos',
    'cfg.logo':             'Logo / Ícono',
    'cfg.salvar_id':        '💾 Guardar Identidad',
    'cfg.pagamento':        '💳 Datos de Pago',
    'cfg.chave_pix':        'Clave Pix',
    'cfg.nome_pix':         'Nombre titular Pix',
    'cfg.alias':            'Número / Alias (PY)',
    'cfg.nome_alias':       'Nombre titular Alias',
    'cfg.localizacao':      '📍 Localización',
    'cfg.lat':              'Latitud del Local',
    'cfg.lng':              'Longitud del Local',
    'cfg.operacao':         '🕐 Operación & Horarios',
    'cfg.status_loja':      'Estado Manual del Local',
    'cfg.cotacao':          'Cotización Real (Gs/R$)',
    'cfg.salvar_loc':       '💾 Guardar Localización & Operación',
    'cfg.visual':           '🎨 Personalización Visual',
    'cfg.cor_primaria':     'Color Principal (botones)',
    'cfg.icone_upload':     'Subir Ícono',
    'cfg.salvar_visual':    '🎨 Guardar Personalización',
    'cfg.banners':          '🏷️ Banners Promocionales',
    'cfg.frete':            '🚗 Tabla de Envío',
    'cfg.limite_dist':      'Límite de distancia (km)',
    'cfg.taxa_moto':        'Tasa base repartidor (Gs)',
    'cfg.salvar_frete':     '💾 Guardar Tabla de Envío',
    'cfg.cupons':           '🎟️ Gestión de Cupones',
    'cfg.novo_cupom':       '+ Nuevo Cupón',
    'cfg.extras_globais':   '➕ Adicionales Globales',

    // ── Estoque ────────────────────────────────────────────
    'estoque.title':        'Gestión de Stock',
    'estoque.novo':         '+ Nuevo Ítem',
    'estoque.buscar':       '🔍 Buscar...',
    'estoque.todos':        'Todos',
    'estoque.ok':           'OK',
    'estoque.baixo':        'Bajo',
    'estoque.zerado':       'Agotado',
    'estoque.nome':         'Nombre del Ítem',
    'estoque.qtd':          'Cantidad',
    'estoque.unidade':      'Unidad',
    'estoque.minimo':       'Cantidad Mínima',
    'estoque.obs':          'Observaciones',
    'estoque.salvar':       'Guardar',
    'estoque.ajuste':       'Ajuste de Stock',
    'estoque.adicionar':    'Agregar',
    'estoque.subtrair':     'Restar',
    'estoque.definir':      'Definir',
    'estoque.motivo':       'Motivo (opcional)',
    'estoque.confirmar':    'Confirmar Ajuste',

    // ── Alerts / Confirms ──────────────────────────────────
    'alert.salvo':               '✅ ¡Guardado con éxito!',
    'alert.erro':                '❌ Error: ',
    'alert.confirmado':          '✅ ¡Confirmado!',
    'alert.cancelado':           '✅ ¡Pedido cancelado!',
    'alert.cancel_enviado':      '✅ ¡Solicitud enviada! El dueño será notificado.',
    'alert.cancel_negado':       '✅ Solicitud de cancelación negada.',
    'alert.produto_salvo':       '✅ ¡Producto guardado!',
    'alert.produto_pausado':     '⏸️ ¡Producto pausado!',
    'alert.produto_reativado':   '✅ ¡Producto reactivado!',
    'alert.produto_duplicado':   '✅ ¡Producto duplicado! La copia fue creada pausada.',
    'alert.produto_excluido':    '✅ ¡Producto eliminado!',
    'alert.cat_salva':           '✅ ¡Categoría guardada!',
    'alert.cat_excluida':        '✅ ¡Categoría eliminada!',
    'alert.moto_salvo':          '✅ ¡Repartidor guardado!',
    'alert.moto_excluido':       '✅ ¡Repartidor eliminado!',
    'alert.cfg_salvas':          '✅ ¡Configuraciones guardadas!',
    'alert.frete_salvo':         '✅ ¡Tabla de envío guardada!',
    'alert.cupom_salvo':         '✅ ¡Cupón guardado!',
    'alert.usuario_criado':      '✅ ¡Usuario creado!',
    'alert.cargo_alterado':      '✅ ¡Cargo modificado!',
    'alert.acesso_negado':       'Acceso denegado.',
    'alert.carrinho_vazio':      '¡Carrito vacío!',
    'alert.sel_pedidos_moto':    '¡Seleccione los pedidos y el repartidor!',
    'alert.features_salvas':     '✅ ¡Features guardadas!',
    'alert.caixa_reaberto':      '✅ ¡Caja reabierta!',
    'alert.operacao_registrada': '✅ ¡Operación registrada!',
    'alert.delivery_encerrado':  '✅ ¡Delivery cerrado!',
    'alert.delivery_reaberto':   '✅ ¡Delivery reabierto!',
    'alert.horario_estendido':   '✅ ¡Horario extendido!',
    'alert.csv_exportado':       '✅ ¡CSV exportado!',

    'confirm.cancelar_pedido':   '⚠️ ¿Confirma la CANCELACIÓN de este pedido?\nEsta acción no se puede deshacer.',
    'confirm.excluir_produto':   '⚠️ ¿Eliminar este producto?\nEsta acción no se puede deshacer.',
    'confirm.excluir_cat':       '⚠️ ¿Eliminar esta categoría?\nEsta acción no se puede deshacer.',
    'confirm.excluir_moto':      '⚠️ ¿Eliminar este repartidor?\nEsta acción no se puede deshacer.',
    'confirm.excluir_usuario':   '⚠️ ¿Eliminar este usuario?\nSolo se elimina el perfil.',
    'confirm.fechar_caixa':      '¿Cerrar la caja de hoy?',
    'confirm.duplicar_produto':  '¿Duplicar este producto? Se creará una copia pausada.',
    'confirm.encerrar_delivery': '¿Cerrar el delivery ahora?',
    'confirm.reabrir_delivery':  '¿Reabrir el delivery para nuevos pedidos?',
    'confirm.aprovar_cancel':    '⚠️ ¿Confirma la CANCELACIÓN de este pedido?',
    'confirm.reabrir_caixa':     '¿Autorizar reapertura de caja?',

    'prompt.motivo_cancel':      '🚫 Solicitar cancelación\n\nIngrese el motivo:',
    'prompt.negar_cancel':       'Motivo para NEGAR la cancelación (opcional):',
    'prompt.motivo_ajuste':      'Motivo del ajuste (opcional):',

    // ── Cargos ─────────────────────────────────────────────
    'cargo.adminMaster':    '🎮 ADMIN MASTER',
    'cargo.dono':           '🔑 DUEÑO',
    'cargo.gerente':        '👔 GERENTE',
    'cargo.funcionario':    '👷 EMPLEADO',
    'cargo.garcom':         '🍽️ MOZO',

    // ── Geral ──────────────────────────────────────────────
    'geral.salvar':         'Guardar',
    'geral.cancelar':       'Cancelar',
    'geral.editar':         'Editar',
    'geral.excluir':        'Eliminar',
    'geral.novo':           'Nuevo',
    'geral.buscar':         'Buscar',
    'geral.filtrar':        'Filtrar',
    'geral.carregando':     'Cargando...',
    'geral.sem_dados':      'Sin datos.',
    'geral.aberto':         '🟢 Abierto',
    'geral.fechado':        '🔴 Cerrado',
    'geral.sim':            'Sí',
    'geral.nao':            'No',
    'geral.todos':          'Todos',
    'geral.hoje':           'Hoy',
  }
};

// ── Engine de tradução ───────────────────────────────────────
let _adminLang = localStorage.getItem('admin_lang') || 'pt';

// Retorna texto traduzido
function t(key, fallback) {
  return ADMIN_LANGS[_adminLang]?.[key]
    || ADMIN_LANGS['pt']?.[key]
    || fallback
    || key;
}

// Aplica traduções em todos os elementos com data-i18n
function applyAdminI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (!val) return;
    // placeholder especial
    if (el.hasAttribute('placeholder')) {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  // data-i18n-placeholder para inputs
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-ph'));
  });
  // Atualiza lang do html
  document.documentElement.lang = _adminLang === 'pt' ? 'pt-BR' : 'es-PY';
}

// Troca idioma e re-aplica
function setAdminLang(lang) {
  if (!ADMIN_LANGS[lang]) return;
  _adminLang = lang;
  localStorage.setItem('admin_lang', lang);
  applyAdminI18n();
  // Atualiza botões do seletor
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Auto-aplica ao carregar
document.addEventListener('DOMContentLoaded', () => {
  applyAdminI18n();
  // Marca botão ativo
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === _adminLang);
  });
});

export type LandingLocale = 'pt' | 'en' | 'he' | 'ru'

export interface LandingContent {
  nav: { access: string; demo: string }
  hero: {
    badge: string
    tagline: string
    description: string
    ctaRequest: string
    ctaAccess: string
    stats: { value: string; label: string }[]
  }
  challenges: {
    label: string
    title: string
    subtitle: string
    items: { icon: string; title: string; desc: string }[]
  }
  demo: {
    label: string
    title: string
    subtitle: string
    complexityLabels: [string, string, string]
    tabs: { dashboard: string; vault: string; graph: string; timeline: string; hypothesis: string; ops: string }
    panels: DemoPanels
  }
  modules: {
    label: string
    title: string
    subtitle: string
    items: { id: string; name: string; subtitle: string; icon: string; color: string; accent: string; desc: string; features: string[] }[]
  }
  howItWorks: {
    label: string
    title: string
    subtitle: string
    stepLabel: string
    steps: { step: string; title: string; desc: string; icon: string }[]
  }
  multiTenant: {
    label: string
    title: string
    description: string
    points: string[]
    rolesLabel: string
    isolationLabel: string
    isolationNote: string
    roles: { role: string; desc: string; color: string }[]
    institutions: string[]
  }
  plans: {
    label: string
    title: string
    mostPopular: string
    cta: string
    items: { name: string; label: string; price: string; period: string; color: string; accent: string; highlight?: boolean; features: string[] }[]
  }
  cta: { badge: string; title: string; description: string; primary: string; secondary: string }
  footer: { copyright: string; classification: string }
}

interface DemoPanels {
  liveBadge: string
  severity: { critical: string; high: string; medium: string; low: string; info: string }
  classification: { secret: string; confidential: string; ultraSecret: string }
  status: { critical: string; high: string; medium: string }
  dashboard: {
    title: string
    stats: [string, string, string, string]
    activityLabel: string
    users: [string, string, string, string, string, string]
    activity: [string, string, string, string, string, string]
    alertsLabel: string
    alerts: [string, string, string, string, string, string]
  }
  vault: {
    title: string
    badge: string
    headers: [string, string, string, string, string, string]
    types: { pdf: string; audio: string; image: string; sheet: string; data: string }
    integrityOk: string
    integrityPending: string
    detailLabel: string
    detailKeys: [string, string, string, string, string]
    collectedByValue: string
    custodyLabel: string
    custodyActions: [string, string, string]
    custodyBy: [string, string, string]
  }
  graph: {
    title: string
    badge: string
    operationWord: string
    edges: [string, string, string, string, string]
    suspectLabel: string
    nodeOrg: string
    nodeTransfers: string
    nodeFinancial: string
    nodeLocation: string
    nodeCompany: string
    riskLabel: string
    riskLevel: string
    statsLine: string
    overlay: [string, string, string]
  }
  timeline: {
    title: string
    badge: string
    axis: string[]
    tracks: [string, string, string, string]
    commEvents: [string, string, string, string, string]
    finEvents: [string, string, string, string]
    moveEvents: [string, string, string]
    docEvents: [string, string, string, string, string]
    correlationLabel: string
    correlationText: string
  }
  hypothesis: {
    title: string
    badge: string
    items: [string, string, string, string]
    corroborate: string
    contradict: string
    total: string
    aiLabel: string
    aiTextBold: string
    aiText: string
    gapsLabel: string
    gaps: [string, string, string]
    recommendationLabel: string
    recommendationText: string
  }
  ops: {
    title: string
    badge: string
    stats: [string, string, string, string]
    operationsLabel: string
    names: [string, string, string]
    tags: [string[], string[], string[]]
    last: [string, string, string]
    trustScore: string
    analysts: string
    feedLabel: string
    feed: [string, string, string, string, string, string]
  }
}

const pt: LandingContent = {
  nav: { access: 'Acessar Sistema', demo: 'Solicitar Demo' },
  hero: {
    badge: 'Plataforma Definitiva para Inteligência Investigativa',
    tagline: 'Transforme Dados Brutos em Inteligência Acionável. Otimize Suas Investigações.',
    description:
      'Profissionais de investigação enfrentam um cenário complexo: volume massivo de dados, necessidade de correlação rápida, garantia da cadeia de custódia e a pressão por resultados precisos e acionáveis. O ZORD foi desenvolvido para ser a espinha dorsal de suas operações, integrando tecnologia de ponta com fluxos de trabalho investigativos comprovados.',
    ctaRequest: 'Solicitar Demonstração',
    ctaAccess: 'Acessar Sistema',
    stats: [
      { value: '11', label: 'Módulos integrados' },
      { value: '4', label: 'Idiomas (HE/EN/RU/PT)' },
      { value: '5', label: 'Níveis de acesso' },
    ],
  },
  challenges: {
    label: 'Desafios',
    title: 'Desafios que Você Conhece',
    subtitle: 'O ZORD foi construído para resolver os gargalos críticos que profissionais de segurança e inteligência enfrentam diariamente.',
    items: [
      { icon: '⊗', title: 'Sobrecarga de Informações', desc: 'Dificuldade em processar e correlacionar grandes volumes de dados de diversas fontes.' },
      { icon: '⊟', title: 'Fragmentação de Evidências', desc: 'Evidências dispersas em múltiplos sistemas, comprometendo a integridade e a cadeia de custódia.' },
      { icon: '⊞', title: 'Análise Manual Demorada', desc: 'Processos manuais de análise de dados que consomem tempo e recursos valiosos.' },
      { icon: '◈', title: 'Colaboração Ineficiente', desc: 'Falta de ferramentas integradas para equipes multidisciplinares, dificultando o compartilhamento seguro.' },
      { icon: '◉', title: 'Tomada de Decisão Lenta', desc: 'Dificuldade em transformar dados complexos em insights claros para decisões rápidas e eficazes.' },
    ],
  },
  demo: {
    label: 'Demonstração Interativa',
    title: 'Explore o Sistema em Profundidade',
    subtitle: 'Seis cenários reais · do painel básico ao centro de operações multi-investigação. Cada visualização reflete a interface real do ZORD.',
    complexityLabels: ['SIMPLES', 'INTERMEDIÁRIO', 'AVANÇADO'],
    tabs: { dashboard: 'Painel', vault: 'Evidências', graph: 'Grafo', timeline: 'Timeline', hypothesis: 'Hipóteses', ops: 'Operações' },
    panels: {
      liveBadge: 'AO VIVO',
      severity: { critical: 'CRÍTICO', high: 'ALTO', medium: 'MÉDIO', low: 'BAIXO', info: 'INFO' },
      classification: { secret: 'SECRETO', confidential: 'CONFIDENCIAL', ultraSecret: 'ULTRA SEC.' },
      status: { critical: 'CRÍTICA', high: 'ALTA', medium: 'MÉDIA' },
      dashboard: {
        title: 'ZORD INTELLIGENCE · PAINEL DE CONTROLE',
        stats: ['Investigações Ativas', 'Entidades Mapeadas', 'Evidências no Vault', 'Alertas Críticos'],
        activityLabel: 'Atividade Recente',
        users: ['LEVY, A.', 'COHEN, R.', 'IA ENGINE', 'RONEN, S.', 'SISTEMA', 'LEVY, A.'],
        activity: [
          'Adicionou evidência DOC-2024-089 → Operação Nighthawk',
          'Entidade "MIRKA CAPITAL" vinculada a 3 investigações ativas',
          'Hipótese H1 atualizada para 94% · novos padrões financeiros detectados',
          'Relatório tático exportado · CLASSIFICADO · Operação Alfa',
          'Gap temporal detectado: 47 dias sem eventos na Operação Tempestade',
          'Nova entidade cadastrada: KARIM VORONOV · risco EXTREMO (89/100)',
        ],
        alertsLabel: 'Alertas Ativos',
        alerts: [
          'Movimentação $350k detectada',
          'Entidade em 3 países simultâneos',
          'Documento modificado pós-lacre',
          'Padrão de VPN nova detectado',
          'Gap temporal > 30 dias',
          'Relatório semanal gerado',
        ],
      },
      vault: {
        title: 'COFRE DE EVIDÊNCIAS · OPERAÇÃO NIGHTHAWK',
        badge: 'CIFRADO AES-256',
        headers: ['ID', 'NOME', 'TIPO', 'TAMANHO', 'CLASSIF.', 'CUSTÓDIA'],
        types: { pdf: 'PDF', audio: 'ÁUDIO', image: 'IMAGEM', sheet: 'PLANILHA', data: 'DADOS' },
        integrityOk: '✓ ÍNTEGRA',
        integrityPending: '⚠ PENDENTE',
        detailLabel: 'Detalhes · EVD-001',
        detailKeys: ['Arquivo', 'Hash SHA-256', 'Coletado em', 'Coletado por', 'Caso'],
        collectedByValue: 'LEVY, Ariel (ANALISTA)',
        custodyLabel: 'Cadeia de Custódia',
        custodyActions: ['Coleta em campo', 'Transferência ao vault', 'Análise forense'],
        custodyBy: ['LEVY, A.', 'SISTEMA', 'COHEN, R.'],
      },
      graph: {
        title: 'OPERAÇÃO NIGHTHAWK · ENTITY RELATIONSHIP GRAPH',
        badge: 'CRÍTICO',
        operationWord: 'OPERAÇÃO',
        edges: ['FINANCIA', 'DIRIGE', 'LOCALIZADO', 'CONTROLA', 'SUSPEITO PRIMÁRIO'],
        suspectLabel: 'SUSPEITO PRINCIPAL',
        nodeOrg: 'ORGANIZAÇÃO',
        nodeTransfers: 'TRANSFERÊNCIAS',
        nodeFinancial: 'FINANCEIRO',
        nodeLocation: 'LOCALIZAÇÃO',
        nodeCompany: 'EMPRESA',
        riskLabel: 'RISCO GERAL',
        riskLevel: 'EXTREMO',
        statsLine: '18 PESSOAS · 27 ORG. · 14 LOCAIS · 153 DOC.',
        overlay: ['Entidades', 'Conexões', 'Evidências'],
      },
      timeline: {
        title: 'OPERAÇÃO NIGHTHAWK · TIMELINE ENGINE',
        badge: 'ABR→MAI 2024',
        axis: ['10 ABR', '15 ABR', '20 ABR', '25 ABR', '30 ABR', '05 MAI', '10 MAI', '15 MAI', '20 MAI'],
        tracks: ['COMUNICAÇÃO', 'FINANCEIRO', 'DESLOCAMENTO', 'DOCUMENTOS'],
        commEvents: ['Chamada Cript.', 'Email', 'Msg Telegram', 'Chamada VPN', 'Mensagem'],
        finEvents: ['Wire $85k', 'Saque', 'Wire $350k', 'Depósito'],
        moveEvents: ['Dubai → Istambul', 'Hotel', 'Voo MIA→HKG'],
        docEvents: ['Contrato', 'Doc Modificado', 'Arquivo Deletado', 'Novo Contrato', 'PDF Exportado'],
        correlationLabel: 'CORRELAÇÃO DETECTADA PELA IA',
        correlationText: 'Padrão identificado: transferências financeiras de alto valor (≥$100k) ocorrem sistematicamente 24-48h após comunicações criptografadas com origem Dubai. Probabilidade de lavagem de dinheiro: ',
      },
      hypothesis: {
        title: 'HYPOTHESIS ENGINE · ANÁLISE COMPARATIVA',
        badge: 'IA ATIVA',
        items: [
          'Lavagem Internacional de $4.2M',
          'Rede de Influência · Setor Financeiro',
          'Contrabando Via Porto de Dubai',
          'Fraude em Contratos Governamentais',
        ],
        corroborate: 'evidências corroboram',
        contradict: 'contradizem',
        total: 'total',
        aiLabel: 'Análise da IA',
        aiTextBold: 'H1 é a hipótese dominante.',
        aiText: ' As transferências de USD 350k (30 ABR) e USD 85k (15 ABR) correlacionam com comunicações criptografadas detectadas 24-48h antes, via nó Dubai. Padrão consistente com tipologia FATF de layering.',
        gapsLabel: 'Gaps Detectados',
        gaps: ['Período sem eventos: 22-28 MAI', 'Entidade "BROKER-X" sem verificação', 'H3 carece de evidência física'],
        recommendationLabel: 'Recomendação Prioritária',
        recommendationText: 'Focar coleta em período 22-28 MAI para confirmar ou refutar H1. Solicitar MLAT para registros bancários Dubai.',
      },
      ops: {
        title: 'CENTRO DE OPERAÇÕES · VISÃO MULTI-INVESTIGAÇÃO',
        badge: '3 ATIVAS',
        stats: ['Operações Ativas', 'Analistas Online', 'Alertas Críticos', 'H1 Trust Score'],
        operationsLabel: 'Investigações em Curso',
        names: ['OPERAÇÃO NIGHTHAWK', 'PROJETO ALFA', 'OPERAÇÃO TEMPESTADE'],
        tags: [['LAVAGEM', 'TRANSNACIONAL', 'FINANCEIRO'], ['CORRUPÇÃO', 'SETOR PÚBLICO'], ['TRÁFICO', 'REGIONAL']],
        last: ['Última ação: 14 min atrás', 'Última ação: 1h 20min atrás', 'Última ação: 3h atrás · Gap detectado'],
        trustScore: 'trust score',
        analysts: 'analistas',
        feedLabel: 'Feed ao Vivo',
        feed: [
          'Movimentação USD 350k confirmada · conta Suíça',
          'Entidade VORONOV detectada em Dubai e Istambul simultaneamente',
          'Contrato #2024-089 modificado pós-assinatura · hash alterado',
          'Nova conexão: BLACK SEA TRADING → MIRKA CAPITAL (+$85k)',
          'Gap temporal identificado: 22-28 MAI sem registros',
          'Relatório parcial gerado · aguardando aprovação',
        ],
      },
    },
  },
  modules: {
    label: 'Módulos',
    title: 'Ecossistema Completo para Investigações',
    subtitle: 'Onze módulos especializados que cobrem todo o ciclo investigativo — da coleta de dados à geração do produto de inteligência final.',
    items: [
      { id: '01', name: 'Investigation Core', subtitle: 'Centro de Comando da Operação', icon: '⬡', color: 'from-blue-600/20 to-blue-900/10 border-blue-700/40', accent: 'text-blue-400', desc: 'Gerencie investigações complexas com rastreabilidade completa. Crie, atribua e monitore casos com trilha de auditoria detalhada, cadeia de custódia de evidências e colaboração multi-analista.', features: ['Workspace multi-analista', 'Trilha de auditoria completa', 'Cadeia de custódia', 'Níveis de classificação'] },
      { id: '02', name: 'Entity Engine', subtitle: 'Desvende Redes Ocultas', icon: '◈', color: 'from-purple-600/20 to-purple-900/10 border-purple-700/40', accent: 'text-purple-400', desc: 'Construa perfis abrangentes de indivíduos, organizações, ativos e locais. Gerencie aliases e correlacione entidades entre investigações para descobrir relacionamentos ocultos.', features: ['Perfis de pessoas e org.', 'Rastreamento de ativos', 'Gestão de aliases', 'Correlação entre casos'] },
      { id: '03', name: 'Knowledge Graph', subtitle: 'Visualize Conexões Invisíveis', icon: '◉', color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-700/40', accent: 'text-cyan-400', desc: 'Visualize interativamente conexões, mapeie redes de influência e descubra relacionamentos que seriam impossíveis de identificar manualmente.', features: ['Canvas interativo Neo4j', 'Clustering de redes', 'Análise de menor caminho', 'Score de influência'] },
      { id: '04', name: 'Timeline Engine', subtitle: 'Cronologia para Análise Comportamental', icon: '⊞', color: 'from-green-600/20 to-green-900/10 border-green-700/40', accent: 'text-green-400', desc: 'Mapeie eventos cronologicamente, correlacione atividades e identifique padrões comportamentais ao longo do tempo.', features: ['Timeline multi-fonte', 'Detecção de padrões', 'Correlação temporal', 'Agrupamento de eventos'] },
      { id: '05', name: 'Evidence Vault', subtitle: 'Segurança e Integridade das Provas', icon: '⊟', color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-700/40', accent: 'text-yellow-400', desc: 'Armazenamento seguro e criptografado para todas as evidências. Faça upload, categorize e mantenha a cadeia de custódia com criptografia AES-256.', features: ['Criptografia AES-256', 'Cadeia de custódia', 'Extração OCR', 'Análise de metadados'] },
      { id: '06', name: 'Hypothesis Engine', subtitle: 'Gestão Científica de Hipóteses', icon: '⊕', color: 'from-orange-600/20 to-orange-900/10 border-orange-700/40', accent: 'text-orange-400', desc: 'Construa hipóteses vinculadas a evidências com score de confiança e workflow de validação. Garanta que cada teoria analítica seja fundamentada em dados verificados.', features: ['Construção de teorias', 'Vinculação de evidências', 'Score de confiança', 'Workflow de validação'] },
      { id: '07', name: 'Intelligence AI', subtitle: 'Análise Preditiva e Geração de Insights', icon: '⬢', color: 'from-pink-600/20 to-pink-900/10 border-pink-700/40', accent: 'text-pink-400', desc: 'Utilize o poder da inteligência artificial (GPT-4 e Claude) para análise avançada. Sumarize evidências automaticamente e gere relatórios acionáveis.', features: ['GPT-4 & Claude integrados', 'Sumarização automática', 'Reconhecimento de padrões', 'Consultas em linguagem natural'] },
      { id: '08', name: 'Operations Center', subtitle: 'Coordenação Tática de Equipes', icon: '⊗', color: 'from-red-600/20 to-red-900/10 border-red-700/40', accent: 'text-red-400', desc: 'Gerencie tarefas operacionais, atribua missões, rastreie equipes em campo e coordene operações multi-equipes com eficiência.', features: ['Atribuição de tarefas', 'Matriz de prioridades', 'Coordenação multi-equipe', 'Controle de prazos'] },
      { id: '09', name: 'Report Generator', subtitle: 'Relatórios Profissionais em Minutos', icon: '⊜', color: 'from-indigo-600/20 to-indigo-900/10 border-indigo-700/40', accent: 'text-indigo-400', desc: 'Gere relatórios de inteligência profissionais com modelos personalizáveis para briefings táticos, estratégicos e executivos.', features: ['Templates customizáveis', 'Classificação automática', 'Exportação PDF/DOCX', 'Briefings executivos'] },
      { id: '10', name: 'Trust Engine', subtitle: 'Avaliação da Credibilidade da Informação', icon: '⬟', color: 'from-teal-600/20 to-teal-900/10 border-teal-700/40', accent: 'text-teal-400', desc: 'Aplique a Escala Admiralty para avaliar e rastrear a credibilidade de informações e fontes. Garanta que suas análises sejam baseadas em dados verificados.', features: ['Escala Admiralty', 'Confiabilidade da fonte', 'Credibilidade da inteligência', 'Rastreamento histórico'] },
      { id: '11', name: 'Gap Detection', subtitle: 'Identifique Lacunas de Inteligência', icon: '◬', color: 'from-amber-600/20 to-amber-900/10 border-amber-700/40', accent: 'text-amber-400', desc: 'Identifique lacunas de inteligência e requisitos de coleta. Priorize o que é desconhecido e direcione recursos para as necessidades críticas.', features: ['Mapeamento de lacunas', 'Requisitos de coleta', 'Score de prioridade', 'Análise de cobertura'] },
    ],
  },
  howItWorks: {
    label: 'Fluxo Operacional',
    title: 'Da Coleta ao Insight',
    subtitle: 'Cinco etapas integradas que transformam dados brutos em produtos de inteligência acionáveis.',
    stepLabel: 'Etapa',
    steps: [
      { step: '01', title: 'Abertura da Investigação', desc: 'O analista cria a investigação, define nível de classificação, atribui equipe e estabelece o escopo. Todos os acessos são auditados.', icon: '⬡' },
      { step: '02', title: 'Coleta e Ingestão de Dados', desc: 'Entidades são cadastradas, evidências carregadas no Vault criptografado e fontes avaliadas pelo Trust Engine com a Escala Admiralty.', icon: '◈' },
      { step: '03', title: 'Análise e Correlação', desc: 'O Knowledge Graph mapeia conexões entre entidades, o Timeline Engine ordena eventos cronologicamente, e a IA analisa padrões e sugere correlações.', icon: '◉' },
      { step: '04', title: 'Formulação de Hipóteses', desc: 'Analistas constroem hipóteses vinculadas a evidências concretas, com score de confiança e workflow estruturado de validação.', icon: '⊕' },
      { step: '05', title: 'Geração do Produto de Inteligência', desc: 'Relatórios táticos e estratégicos são gerados automaticamente com toda a cadeia de evidências, prontos para briefing executivo ou ação operacional.', icon: '⊜' },
    ],
  },
  multiTenant: {
    label: 'Arquitetura Multi-Tenant',
    title: 'Segurança e Isolamento Inigualáveis',
    description: 'O ZORD foi arquitetado para operar múltiplas instituições completamente isoladas em uma única infraestrutura. Cada organização tem seus dados, usuários e configurações separados: nenhum dado vaza entre tenants.',
    points: [
      'Isolamento total de dados por tenant em todas as tabelas',
      'Portal Super Admin para criação e gestão de instituições',
      'Planos configuráveis: limites de usuários, investigações e storage',
      'SSO e MFA configuráveis por instituição',
      'Logs de auditoria separados por organização',
    ],
    rolesLabel: 'Hierarquia de Acesso',
    isolationLabel: 'Isolamento de Dados',
    isolationNote: '↕ Zero vazamento entre tenants',
    roles: [
      { role: 'SUPER ADMIN', desc: 'Gestão de todas as instituições', color: 'border-red-700/50 bg-red-950/30 text-red-400' },
      { role: 'TENANT ADMIN', desc: 'Gestão da instituição', color: 'border-orange-700/50 bg-orange-950/30 text-orange-400' },
      { role: 'ANALYST', desc: 'Criação e análise completa', color: 'border-blue-700/50 bg-blue-950/30 text-blue-400' },
      { role: 'OPERATOR', desc: 'Execução operacional', color: 'border-green-700/50 bg-green-950/30 text-green-400' },
      { role: 'VIEWER', desc: 'Leitura somente', color: 'border-zord-border bg-zord-muted/30 text-zord-text-muted' },
    ],
    institutions: ['Agência Federal', 'Polícia Civil', 'Ministério Público'],
  },
  plans: {
    label: 'Planos',
    title: 'Para Cada Escala de Operação',
    mostPopular: 'Mais popular',
    cta: 'Solicitar acesso',
    items: [
      { name: 'TRIAL', label: 'Avaliação', price: 'Grátis', period: '30 dias', color: 'border-zord-border', accent: 'text-zord-text-muted', features: ['5 usuários', '10 investigações', '5 GB storage', 'Todos os módulos'] },
      { name: 'STARTER', label: 'Inicial', price: 'R$ 1.990', period: '/mês', color: 'border-blue-700/50', accent: 'text-blue-400', features: ['25 usuários', '50 investigações', '50 GB storage', 'Suporte por e-mail'] },
      { name: 'PROFESSIONAL', label: 'Profissional', price: 'R$ 5.990', period: '/mês', color: 'border-purple-700/50', accent: 'text-purple-400', highlight: true, features: ['100 usuários', '500 investigações', '500 GB storage', 'Suporte prioritário'] },
      { name: 'ENTERPRISE', label: 'Corporativo', price: 'Sob consulta', period: '', color: 'border-amber-700/50', accent: 'text-amber-400', features: ['Usuários ilimitados', 'Investigações ilimitadas', 'Storage ilimitado', 'SLA + suporte dedicado'] },
    ],
  },
  cta: {
    badge: 'Demonstração Personalizada',
    title: 'Pronto para Elevar Suas Capacidades de Investigação?',
    description: 'Solicite uma demonstração personalizada e descubra como o ZORD Intelligence Operating System pode revolucionar suas operações de inteligência investigativa.',
    primary: 'Solicitar Demonstração',
    secondary: 'Acessar Sistema',
  },
  footer: {
    copyright: '© 2026 ZORD. Uso exclusivo para organizações autorizadas.',
    classification: 'CLASSIFICATION: UNCLASSIFIED',
  },
}

const en: LandingContent = {
  nav: { access: 'Access System', demo: 'Request Demo' },
  hero: {
    badge: 'The Definitive Platform for Investigative Intelligence',
    tagline: 'Transform Raw Data into Actionable Intelligence. Optimize Your Investigations.',
    description:
      'Investigation professionals face a complex reality: massive data volumes, need for rapid correlation, chain of custody assurance, and pressure for precise and actionable results. ZORD was built to be the backbone of your operations, integrating cutting-edge technology with proven investigative workflows.',
    ctaRequest: 'Request Demonstration',
    ctaAccess: 'Access System',
    stats: [
      { value: '11', label: 'Integrated modules' },
      { value: '4', label: 'Languages (HE/EN/RU/PT)' },
      { value: '5', label: 'Access levels' },
    ],
  },
  challenges: {
    label: 'Challenges',
    title: 'Challenges You Know Well',
    subtitle: 'ZORD was built to solve the critical bottlenecks that security and intelligence professionals face every day.',
    items: [
      { icon: '⊗', title: 'Information Overload', desc: 'Difficulty processing and correlating large volumes of data from diverse sources.' },
      { icon: '⊟', title: 'Evidence Fragmentation', desc: 'Evidence scattered across multiple systems, compromising integrity and chain of custody.' },
      { icon: '⊞', title: 'Time-Consuming Manual Analysis', desc: 'Manual data analysis processes that consume valuable time and resources.' },
      { icon: '◈', title: 'Inefficient Collaboration', desc: 'Lack of integrated tools for multidisciplinary teams, hindering secure information sharing.' },
      { icon: '◉', title: 'Slow Decision-Making', desc: 'Difficulty transforming complex data into clear insights for quick and effective decisions.' },
    ],
  },
  demo: {
    label: 'Interactive Demo',
    title: 'Explore the System in Depth',
    subtitle: 'Six real scenarios · from basic dashboard to multi-investigation operations center. Each view reflects the actual ZORD interface.',
    complexityLabels: ['SIMPLE', 'INTERMEDIATE', 'ADVANCED'],
    tabs: { dashboard: 'Dashboard', vault: 'Evidence', graph: 'Graph', timeline: 'Timeline', hypothesis: 'Hypotheses', ops: 'Operations' },
    panels: {
      liveBadge: 'LIVE',
      severity: { critical: 'CRITICAL', high: 'HIGH', medium: 'MEDIUM', low: 'LOW', info: 'INFO' },
      classification: { secret: 'SECRET', confidential: 'CONFIDENTIAL', ultraSecret: 'TOP SECRET' },
      status: { critical: 'CRITICAL', high: 'HIGH', medium: 'MEDIUM' },
      dashboard: {
        title: 'ZORD INTELLIGENCE · CONTROL PANEL',
        stats: ['Active Investigations', 'Mapped Entities', 'Evidence in Vault', 'Critical Alerts'],
        activityLabel: 'Recent Activity',
        users: ['LEVY, A.', 'COHEN, R.', 'AI ENGINE', 'RONEN, S.', 'SYSTEM', 'LEVY, A.'],
        activity: [
          'Added evidence DOC-2024-089 → Operation Nighthawk',
          'Entity "MIRKA CAPITAL" linked to 3 active investigations',
          'Hypothesis H1 updated to 94% · new financial patterns detected',
          'Tactical report exported · CLASSIFIED · Operation Alfa',
          'Temporal gap detected: 47 days without events in Operation Tempest',
          'New entity registered: KARIM VORONOV · EXTREME risk (89/100)',
        ],
        alertsLabel: 'Active Alerts',
        alerts: [
          'Movement of $350k detected',
          'Entity in 3 countries simultaneously',
          'Document modified post-seal',
          'New VPN pattern detected',
          'Temporal gap > 30 days',
          'Weekly report generated',
        ],
      },
      vault: {
        title: 'EVIDENCE VAULT · OPERATION NIGHTHAWK',
        badge: 'AES-256 ENCRYPTED',
        headers: ['ID', 'NAME', 'TYPE', 'SIZE', 'CLASS.', 'CUSTODY'],
        types: { pdf: 'PDF', audio: 'AUDIO', image: 'IMAGE', sheet: 'SHEET', data: 'DATA' },
        integrityOk: '✓ INTACT',
        integrityPending: '⚠ PENDING',
        detailLabel: 'Details · EVD-001',
        detailKeys: ['File', 'Hash SHA-256', 'Collected on', 'Collected by', 'Case'],
        collectedByValue: 'LEVY, Ariel (ANALYST)',
        custodyLabel: 'Chain of Custody',
        custodyActions: ['Field collection', 'Transfer to vault', 'Forensic analysis'],
        custodyBy: ['LEVY, A.', 'SYSTEM', 'COHEN, R.'],
      },
      graph: {
        title: 'OPERATION NIGHTHAWK · ENTITY RELATIONSHIP GRAPH',
        badge: 'CRITICAL',
        operationWord: 'OPERATION',
        edges: ['FINANCES', 'DIRECTS', 'LOCATED', 'CONTROLS', 'PRIMARY SUSPECT'],
        suspectLabel: 'PRIMARY SUSPECT',
        nodeOrg: 'ORGANIZATION',
        nodeTransfers: 'TRANSFERS',
        nodeFinancial: 'FINANCIAL',
        nodeLocation: 'LOCATION',
        nodeCompany: 'COMPANY',
        riskLabel: 'OVERALL RISK',
        riskLevel: 'EXTREME',
        statsLine: '18 PEOPLE · 27 ORG. · 14 PLACES · 153 DOC.',
        overlay: ['Entities', 'Connections', 'Evidence'],
      },
      timeline: {
        title: 'OPERATION NIGHTHAWK · TIMELINE ENGINE',
        badge: 'APR→MAY 2024',
        axis: ['10 APR', '15 APR', '20 APR', '25 APR', '30 APR', '05 MAY', '10 MAY', '15 MAY', '20 MAY'],
        tracks: ['COMMUNICATION', 'FINANCIAL', 'MOVEMENT', 'DOCUMENTS'],
        commEvents: ['Encrypted Call', 'Email', 'Telegram Msg', 'VPN Call', 'Message'],
        finEvents: ['Wire $85k', 'Withdrawal', 'Wire $350k', 'Deposit'],
        moveEvents: ['Dubai → Istanbul', 'Hotel', 'Flight MIA→HKG'],
        docEvents: ['Contract', 'Modified Doc', 'Deleted File', 'New Contract', 'PDF Exported'],
        correlationLabel: 'CORRELATION DETECTED BY AI',
        correlationText: 'Pattern identified: high-value financial transfers (≥$100k) systematically occur 24-48h after encrypted communications originating from Dubai. Money-laundering probability: ',
      },
      hypothesis: {
        title: 'HYPOTHESIS ENGINE · COMPARATIVE ANALYSIS',
        badge: 'AI ACTIVE',
        items: [
          'International Laundering of $4.2M',
          'Influence Network · Financial Sector',
          'Smuggling Via Port of Dubai',
          'Fraud in Government Contracts',
        ],
        corroborate: 'evidence corroborates',
        contradict: 'contradict',
        total: 'total',
        aiLabel: 'AI Analysis',
        aiTextBold: 'H1 is the dominant hypothesis.',
        aiText: ' The transfers of USD 350k (30 APR) and USD 85k (15 APR) correlate with encrypted communications detected 24-48h earlier, via the Dubai node. Pattern consistent with FATF layering typology.',
        gapsLabel: 'Detected Gaps',
        gaps: ['Period without events: 22-28 MAY', 'Entity "BROKER-X" unverified', 'H3 lacks physical evidence'],
        recommendationLabel: 'Priority Recommendation',
        recommendationText: 'Focus collection on 22-28 MAY period to confirm or refute H1. Request MLAT for Dubai banking records.',
      },
      ops: {
        title: 'OPERATIONS CENTER · MULTI-INVESTIGATION VIEW',
        badge: '3 ACTIVE',
        stats: ['Active Operations', 'Analysts Online', 'Critical Alerts', 'H1 Trust Score'],
        operationsLabel: 'Ongoing Investigations',
        names: ['OPERATION NIGHTHAWK', 'PROJECT ALFA', 'OPERATION TEMPEST'],
        tags: [['LAUNDERING', 'TRANSNATIONAL', 'FINANCIAL'], ['CORRUPTION', 'PUBLIC SECTOR'], ['TRAFFICKING', 'REGIONAL']],
        last: ['Last action: 14 min ago', 'Last action: 1h 20min ago', 'Last action: 3h ago · Gap detected'],
        trustScore: 'trust score',
        analysts: 'analysts',
        feedLabel: 'Live Feed',
        feed: [
          'Movement of USD 350k confirmed · Swiss account',
          'Entity VORONOV detected in Dubai and Istanbul simultaneously',
          'Contract #2024-089 modified post-signature · hash altered',
          'New connection: BLACK SEA TRADING → MIRKA CAPITAL (+$85k)',
          'Temporal gap identified: 22-28 MAY without records',
          'Partial report generated · awaiting approval',
        ],
      },
    },
  },
  modules: {
    label: 'Modules',
    title: 'Complete Ecosystem for Investigations',
    subtitle: 'Eleven specialized modules covering the entire investigative cycle — from data collection to final intelligence product generation.',
    items: [
      { id: '01', name: 'Investigation Core', subtitle: 'Command Center of Operations', icon: '⬡', color: 'from-blue-600/20 to-blue-900/10 border-blue-700/40', accent: 'text-blue-400', desc: 'Manage complex investigations with complete traceability. Create, assign and monitor cases with detailed audit trails, evidence chain of custody, and multi-analyst collaboration.', features: ['Multi-analyst workspace', 'Complete audit trail', 'Chain of custody', 'Classification levels'] },
      { id: '02', name: 'Entity Engine', subtitle: 'Uncover Hidden Networks', icon: '◈', color: 'from-purple-600/20 to-purple-900/10 border-purple-700/40', accent: 'text-purple-400', desc: 'Build comprehensive profiles of individuals, organizations, assets and locations. Manage aliases and correlate entities across investigations to discover hidden relationships.', features: ['Person & org profiles', 'Asset tracking', 'Alias management', 'Cross-case correlation'] },
      { id: '03', name: 'Knowledge Graph', subtitle: 'Visualize Invisible Connections', icon: '◉', color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-700/40', accent: 'text-cyan-400', desc: 'Interactively visualize connections, map influence networks and discover relationships impossible to identify manually. Essential for understanding group structures and fraud networks.', features: ['Interactive Neo4j canvas', 'Network clustering', 'Shortest path analysis', 'Influence score'] },
      { id: '04', name: 'Timeline Engine', subtitle: 'Chronology for Behavioral Analysis', icon: '⊞', color: 'from-green-600/20 to-green-900/10 border-green-700/40', accent: 'text-green-400', desc: 'Map events chronologically, correlate activities and identify behavioral patterns over time, revealing crucial insights into modus operandi.', features: ['Multi-source timeline', 'Pattern detection', 'Temporal correlation', 'Event clustering'] },
      { id: '05', name: 'Evidence Vault', subtitle: 'Security and Integrity of Evidence', icon: '⊟', color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-700/40', accent: 'text-yellow-400', desc: 'Secure encrypted storage for all evidence. Upload, categorize and maintain chain of custody for documents, images and multimedia with AES-256 encryption.', features: ['AES-256 encryption', 'Chain of custody', 'OCR extraction', 'Metadata analysis'] },
      { id: '06', name: 'Hypothesis Engine', subtitle: 'Scientific Hypothesis Management', icon: '⊕', color: 'from-orange-600/20 to-orange-900/10 border-orange-700/40', accent: 'text-orange-400', desc: 'Build hypotheses linked to evidence with confidence scores and validation workflows. Ensure every analytical theory is grounded in verified data.', features: ['Theory construction', 'Evidence linking', 'Confidence score', 'Validation workflow'] },
      { id: '07', name: 'Intelligence AI', subtitle: 'Predictive Analysis and Insight Generation', icon: '⬢', color: 'from-pink-600/20 to-pink-900/10 border-pink-700/40', accent: 'text-pink-400', desc: 'Harness the power of AI (GPT-4 and Claude) for advanced analysis. Automatically summarize evidence, identify complex patterns and generate actionable intelligence reports.', features: ['GPT-4 & Claude integrated', 'Automatic summarization', 'Pattern recognition', 'Natural language queries'] },
      { id: '08', name: 'Operations Center', subtitle: 'Tactical Team Coordination', icon: '⊗', color: 'from-red-600/20 to-red-900/10 border-red-700/40', accent: 'text-red-400', desc: 'Manage operational tasks, assign missions, track field teams and coordinate multi-team operations efficiently, ensuring deadlines are met.', features: ['Task assignment', 'Priority matrix', 'Multi-team coordination', 'Deadline control'] },
      { id: '09', name: 'Report Generator', subtitle: 'Professional Reports in Minutes', icon: '⊜', color: 'from-indigo-600/20 to-indigo-900/10 border-indigo-700/40', accent: 'text-indigo-400', desc: 'Generate professional intelligence reports with customizable templates for tactical, strategic and executive briefings. Auto-classification and PDF/DOCX export.', features: ['Customizable templates', 'Auto-classification', 'PDF/DOCX export', 'Executive briefings'] },
      { id: '10', name: 'Trust Engine', subtitle: 'Information Credibility Assessment', icon: '⬟', color: 'from-teal-600/20 to-teal-900/10 border-teal-700/40', accent: 'text-teal-400', desc: 'Apply the Admiralty Scale to assess and track the credibility of information and sources. Ensure your analyses are based on verified and reliable data.', features: ['Admiralty Scale', 'Source reliability', 'Intelligence credibility', 'Historical tracking'] },
      { id: '11', name: 'Gap Detection', subtitle: 'Identify Intelligence Gaps', icon: '◬', color: 'from-amber-600/20 to-amber-900/10 border-amber-700/40', accent: 'text-amber-400', desc: 'Identify intelligence gaps and collection requirements. Prioritize what is unknown and direct resources to critical information needs.', features: ['Gap mapping', 'Collection requirements', 'Priority score', 'Coverage analysis'] },
    ],
  },
  howItWorks: {
    label: 'Operational Flow',
    title: 'From Collection to Insight',
    subtitle: 'Five integrated steps that transform raw data into actionable intelligence products.',
    stepLabel: 'Step',
    steps: [
      { step: '01', title: 'Investigation Opening', desc: 'The analyst creates the investigation, sets the classification level, assigns the team and defines scope. All access is audited.', icon: '⬡' },
      { step: '02', title: 'Data Collection and Ingestion', desc: 'Entities are registered, evidence uploaded to the encrypted Vault and sources evaluated by the Trust Engine using the Admiralty Scale.', icon: '◈' },
      { step: '03', title: 'Analysis and Correlation', desc: 'The Knowledge Graph maps connections between entities, the Timeline Engine orders events chronologically, and AI analyzes patterns and suggests correlations.', icon: '◉' },
      { step: '04', title: 'Hypothesis Formulation', desc: 'Analysts build hypotheses linked to concrete evidence, with confidence scores and a structured validation workflow.', icon: '⊕' },
      { step: '05', title: 'Intelligence Product Generation', desc: 'Tactical and strategic reports are automatically generated with the full evidence chain, ready for executive briefing or operational action.', icon: '⊜' },
    ],
  },
  multiTenant: {
    label: 'Multi-Tenant Architecture',
    title: 'Unparalleled Security and Isolation',
    description: 'ZORD was architected to operate multiple completely isolated institutions on a single infrastructure. Each organization has its own data, users and configurations: no data leaks between tenants.',
    points: [
      'Complete data isolation per tenant across all tables',
      'Super Admin portal for institution creation and management',
      'Configurable plans: user, investigation and storage limits',
      'Configurable SSO and MFA per institution',
      'Separate audit logs per organization',
    ],
    rolesLabel: 'Access Hierarchy',
    isolationLabel: 'Data Isolation',
    isolationNote: '↕ Zero cross-tenant data leakage',
    roles: [
      { role: 'SUPER ADMIN', desc: 'Manages all institutions', color: 'border-red-700/50 bg-red-950/30 text-red-400' },
      { role: 'TENANT ADMIN', desc: 'Institution management', color: 'border-orange-700/50 bg-orange-950/30 text-orange-400' },
      { role: 'ANALYST', desc: 'Full creation and analysis', color: 'border-blue-700/50 bg-blue-950/30 text-blue-400' },
      { role: 'OPERATOR', desc: 'Operational execution', color: 'border-green-700/50 bg-green-950/30 text-green-400' },
      { role: 'VIEWER', desc: 'Read only', color: 'border-zord-border bg-zord-muted/30 text-zord-text-muted' },
    ],
    institutions: ['Federal Agency', 'State Police', "Public Prosecutor's Office"],
  },
  plans: {
    label: 'Plans',
    title: 'For Every Scale of Operation',
    mostPopular: 'Most popular',
    cta: 'Request access',
    items: [
      { name: 'TRIAL', label: 'Evaluation', price: 'Free', period: '30 days', color: 'border-zord-border', accent: 'text-zord-text-muted', features: ['5 users', '10 investigations', '5 GB storage', 'All modules'] },
      { name: 'STARTER', label: 'Starter', price: '$590', period: '/month', color: 'border-blue-700/50', accent: 'text-blue-400', features: ['25 users', '50 investigations', '50 GB storage', 'Email support'] },
      { name: 'PROFESSIONAL', label: 'Professional', price: '$1,790', period: '/month', color: 'border-purple-700/50', accent: 'text-purple-400', highlight: true, features: ['100 users', '500 investigations', '500 GB storage', 'Priority support'] },
      { name: 'ENTERPRISE', label: 'Enterprise', price: 'Contact us', period: '', color: 'border-amber-700/50', accent: 'text-amber-400', features: ['Unlimited users', 'Unlimited investigations', 'Unlimited storage', 'SLA + dedicated support'] },
    ],
  },
  cta: {
    badge: 'Personalized Demo',
    title: 'Ready to Elevate Your Investigation Capabilities?',
    description: 'Request a personalized demonstration and discover how ZORD Intelligence Operating System can revolutionize your investigative intelligence operations.',
    primary: 'Request Demonstration',
    secondary: 'Access System',
  },
  footer: {
    copyright: '© 2026 ZORD. Exclusive use for authorized organizations.',
    classification: 'CLASSIFICATION: UNCLASSIFIED',
  },
}

const he: LandingContent = {
  nav: { access: 'כניסה למערכת', demo: 'בקש הדגמה' },
  hero: {
    badge: 'הפלטפורמה המובילה לאינטליג\'נס חקירתי',
    tagline: 'הפוך נתונים גולמיים למודיעין מבצעי. ייעל את החקירות שלך.',
    description:
      'אנשי מקצוע בחקירות מתמודדים עם מציאות מורכבת: נפחי נתונים עצומים, צורך בקורלציה מהירה, הבטחת שרשרת החזקה ולחץ לתוצאות מדויקות ומבצעיות. ZORD פותח להיות עמוד השדרה של הפעילות שלך — משלב טכנולוגיה חדישה עם תהליכי עבודה חקירתיים מוכחים.',
    ctaRequest: 'בקש הדגמה',
    ctaAccess: 'כניסה למערכת',
    stats: [
      { value: '11', label: 'מודולים משולבים' },
      { value: '4', label: 'שפות (HE/EN/RU/PT)' },
      { value: '5', label: 'רמות גישה' },
    ],
  },
  challenges: {
    label: 'אתגרים',
    title: 'אתגרים שאתה מכיר',
    subtitle: 'ZORD נבנה כדי לפתור את צווארי הבקבוק הקריטיים שעמם מתמודדים אנשי ביטחון ומודיעין מדי יום.',
    items: [
      { icon: '⊗', title: 'עומס מידע', desc: 'קושי לעבד ולקשר בין כמויות גדולות של נתונים ממקורות שונים.' },
      { icon: '⊟', title: 'פיצול ראיות', desc: 'ראיות מפוזרות על פני מערכות מרובות, המסכנות את האמינות ושרשרת החזקה.' },
      { icon: '⊞', title: 'ניתוח ידני איטי', desc: 'תהליכי ניתוח נתונים ידניים הצורכים זמן ומשאבים יקרים.' },
      { icon: '◈', title: 'שיתוף פעולה לא יעיל', desc: 'חסרות כלים משולבים לצוותים רב-תחומיים, המקשים על שיתוף מידע בטוח.' },
      { icon: '◉', title: 'קבלת החלטות איטית', desc: 'קושי להפוך נתונים מורכבים לתובנות ברורות לקבלת החלטות מהירות ואפקטיביות.' },
    ],
  },
  demo: {
    label: 'הדגמה אינטראקטיבית',
    title: 'חקור את המערכת לעומק',
    subtitle: 'שישה תרחישים אמיתיים · מלוח הבקרה הבסיסי למרכז מבצעים רב-חקירות. כל תצוגה משקפת את הממשק האמיתי של ZORD.',
    complexityLabels: ['פשוט', 'בינוני', 'מתקדם'],
    tabs: { dashboard: 'לוח בקרה', vault: 'ראיות', graph: 'גרף', timeline: 'ציר זמן', hypothesis: 'השערות', ops: 'מבצעים' },
    panels: {
      liveBadge: 'בשידור חי',
      severity: { critical: 'קריטי', high: 'גבוה', medium: 'בינוני', low: 'נמוך', info: 'מידע' },
      classification: { secret: 'סודי', confidential: 'חסוי', ultraSecret: 'סודי ביותר' },
      status: { critical: 'קריטית', high: 'גבוהה', medium: 'בינונית' },
      dashboard: {
        title: 'ZORD INTELLIGENCE · לוח בקרה',
        stats: ['חקירות פעילות', 'ישויות ממופות', 'ראיות בכספת', 'התראות קריטיות'],
        activityLabel: 'פעילות אחרונה',
        users: ['LEVY, A.', 'COHEN, R.', 'מנוע AI', 'RONEN, S.', 'מערכת', 'LEVY, A.'],
        activity: [
          'הוסיף ראיה DOC-2024-089 ← מבצע Nighthawk',
          'הישות "MIRKA CAPITAL" קושרה ל-3 חקירות פעילות',
          'השערה H1 עודכנה ל-94% · זוהו דפוסים פיננסיים חדשים',
          'דוח טקטי יוצא · מסווג · מבצע Alfa',
          'זוהה פער זמני: 47 ימים ללא אירועים במבצע Tempest',
          'נרשמה ישות חדשה: KARIM VORONOV · סיכון קיצוני (89/100)',
        ],
        alertsLabel: 'התראות פעילות',
        alerts: [
          'זוהתה תנועה של $350k',
          'ישות ב-3 מדינות בו-זמנית',
          'מסמך שונה לאחר חיתום',
          'זוהה דפוס VPN חדש',
          'פער זמני > 30 ימים',
          'דוח שבועי נוצר',
        ],
      },
      vault: {
        title: 'כספת ראיות · מבצע NIGHTHAWK',
        badge: 'מוצפן AES-256',
        headers: ['מזהה', 'שם', 'סוג', 'גודל', 'סיווג', 'החזקה'],
        types: { pdf: 'PDF', audio: 'אודיו', image: 'תמונה', sheet: 'גיליון', data: 'נתונים' },
        integrityOk: '✓ תקין',
        integrityPending: '⚠ ממתין',
        detailLabel: 'פרטים · EVD-001',
        detailKeys: ['קובץ', 'Hash SHA-256', 'נאסף בתאריך', 'נאסף על ידי', 'תיק'],
        collectedByValue: 'LEVY, Ariel (אנליסט)',
        custodyLabel: 'שרשרת החזקה',
        custodyActions: ['איסוף בשטח', 'העברה לכספת', 'ניתוח פורנזי'],
        custodyBy: ['LEVY, A.', 'מערכת', 'COHEN, R.'],
      },
      graph: {
        title: 'מבצע NIGHTHAWK · גרף קשרי ישויות',
        badge: 'קריטי',
        operationWord: 'מבצע',
        edges: ['מממן', 'מנהל', 'ממוקם', 'שולט', 'חשוד ראשי'],
        suspectLabel: 'חשוד ראשי',
        nodeOrg: 'ארגון',
        nodeTransfers: 'העברות',
        nodeFinancial: 'פיננסי',
        nodeLocation: 'מיקום',
        nodeCompany: 'חברה',
        riskLabel: 'סיכון כללי',
        riskLevel: 'קיצוני',
        statsLine: '18 אנשים · 27 ארגונים · 14 מקומות · 153 מסמכים',
        overlay: ['ישויות', 'קשרים', 'ראיות'],
      },
      timeline: {
        title: 'מבצע NIGHTHAWK · מנוע ציר זמן',
        badge: 'אפר←מאי 2024',
        axis: ['10 אפר', '15 אפר', '20 אפר', '25 אפר', '30 אפר', '05 מאי', '10 מאי', '15 מאי', '20 מאי'],
        tracks: ['תקשורת', 'פיננסי', 'תנועה', 'מסמכים'],
        commEvents: ['שיחה מוצפנת', 'אימייל', 'הודעת Telegram', 'שיחת VPN', 'הודעה'],
        finEvents: ['העברה $85k', 'משיכה', 'העברה $350k', 'הפקדה'],
        moveEvents: ['Dubai ← Istanbul', 'מלון', 'טיסה MIA←HKG'],
        docEvents: ['חוזה', 'מסמך ששונה', 'קובץ שנמחק', 'חוזה חדש', 'PDF יוצא'],
        correlationLabel: 'קורלציה זוהתה על ידי AI',
        correlationText: 'דפוס זוהה: העברות פיננסיות בערך גבוה (≥$100k) מתרחשות באופן שיטתי 24-48 שעות לאחר תקשורת מוצפנת שמקורה בדובאי. הסתברות להלבנת הון: ',
      },
      hypothesis: {
        title: 'מנוע השערות · ניתוח השוואתי',
        badge: 'AI פעיל',
        items: [
          'הלבנה בינלאומית של $4.2M',
          'רשת השפעה · מגזר פיננסי',
          'הברחה דרך נמל דובאי',
          'הונאה בחוזים ממשלתיים',
        ],
        corroborate: 'ראיות תומכות',
        contradict: 'סותרות',
        total: 'סך הכל',
        aiLabel: 'ניתוח AI',
        aiTextBold: 'H1 היא ההשערה הדומיננטית.',
        aiText: ' ההעברות של USD 350k (30 אפר) ו-USD 85k (15 אפר) מתואמות עם תקשורת מוצפנת שזוהתה 24-48 שעות קודם לכן, דרך צומת דובאי. דפוס עקבי עם טיפולוגיית layering של FATF.',
        gapsLabel: 'פערים שזוהו',
        gaps: ['תקופה ללא אירועים: 22-28 מאי', 'הישות "BROKER-X" ללא אימות', 'ל-H3 חסרה ראיה פיזית'],
        recommendationLabel: 'המלצה בעדיפות',
        recommendationText: 'למקד איסוף בתקופה 22-28 מאי לאישור או הפרכה של H1. לבקש MLAT לרשומות בנקאיות בדובאי.',
      },
      ops: {
        title: 'מרכז מבצעים · תצוגה רב-חקירתית',
        badge: '3 פעילות',
        stats: ['מבצעים פעילים', 'אנליסטים מחוברים', 'התראות קריטיות', 'H1 Trust Score'],
        operationsLabel: 'חקירות מתמשכות',
        names: ['מבצע NIGHTHAWK', 'פרויקט ALFA', 'מבצע TEMPEST'],
        tags: [['הלבנה', 'חוצה-גבולות', 'פיננסי'], ['שחיתות', 'מגזר ציבורי'], ['סחר', 'אזורי']],
        last: ['פעולה אחרונה: לפני 14 דק׳', 'פעולה אחרונה: לפני 1ש׳ 20דק׳', 'פעולה אחרונה: לפני 3ש׳ · זוהה פער'],
        trustScore: 'trust score',
        analysts: 'אנליסטים',
        feedLabel: 'הזנה חיה',
        feed: [
          'תנועה של USD 350k אושרה · חשבון שוויצרי',
          'הישות VORONOV זוהתה בדובאי ובאיסטנבול בו-זמנית',
          'חוזה #2024-089 שונה לאחר חתימה · hash שונה',
          'קשר חדש: BLACK SEA TRADING ← MIRKA CAPITAL (+$85k)',
          'זוהה פער זמני: 22-28 מאי ללא רשומות',
          'דוח חלקי נוצר · ממתין לאישור',
        ],
      },
    },
  },
  modules: {
    label: 'מודולים',
    title: 'מערכת אקולוגית מלאה לחקירות',
    subtitle: 'אחד עשר מודולים מתמחים המכסים את מחזור החקירה כולו — מאיסוף נתונים ועד לייצור מוצר המודיעין הסופי.',
    items: [
      { id: '01', name: 'Investigation Core', subtitle: 'מרכז פיקוד המבצע', icon: '⬡', color: 'from-blue-600/20 to-blue-900/10 border-blue-700/40', accent: 'text-blue-400', desc: 'נהל חקירות מורכבות עם יכולת מעקב מלאה. צור, הקצה ועקוב אחר תיקים עם מסלול ביקורת מפורט, שרשרת החזקת ראיות ושיתוף פעולה בין אנליסטים מרובים.', features: ['סביבת עבודה מרובת אנליסטים', 'מסלול ביקורת מלא', 'שרשרת החזקה', 'רמות סיווג'] },
      { id: '02', name: 'Entity Engine', subtitle: 'חשוף רשתות נסתרות', icon: '◈', color: 'from-purple-600/20 to-purple-900/10 border-purple-700/40', accent: 'text-purple-400', desc: 'בנה פרופילים מקיפים של אנשים, ארגונים, נכסים ומיקומים. נהל כינויים וקשר ישויות בין חקירות לגילוי קשרים נסתרים.', features: ['פרופילי אנשים וארגונים', 'מעקב נכסים', 'ניהול כינויים', 'קורלציה בין תיקים'] },
      { id: '03', name: 'Knowledge Graph', subtitle: 'הצג קשרים בלתי נראים', icon: '◉', color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-700/40', accent: 'text-cyan-400', desc: 'הצג באופן אינטראקטיבי קשרים, מפה רשתות השפעה וגלה קשרים שבלתי אפשרי לזהות ידנית. חיוני להבנת מבני קבוצות ורשתות הונאה.', features: ['קנבס אינטראקטיבי Neo4j', 'אשכול רשתות', 'ניתוח מסלול קצר ביותר', 'ציון השפעה'] },
      { id: '04', name: 'Timeline Engine', subtitle: 'כרונולוגיה לניתוח התנהגותי', icon: '⊞', color: 'from-green-600/20 to-green-900/10 border-green-700/40', accent: 'text-green-400', desc: 'מפה אירועים כרונולוגית, קשר פעילויות וזהה דפוסי התנהגות לאורך זמן, וחשוף תובנות מכריעות על מודוס אופרנדי.', features: ['ציר זמן מרובת מקורות', 'זיהוי דפוסים', 'קורלציה זמנית', 'קיבוץ אירועים'] },
      { id: '05', name: 'Evidence Vault', subtitle: 'אבטחה ושלמות הראיות', icon: '⊟', color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-700/40', accent: 'text-yellow-400', desc: 'אחסון מאובטח ומוצפן לכל הראיות. העלה, קטלג ושמור על שרשרת החזקה למסמכים, תמונות ומולטימדיה עם הצפנת AES-256.', features: ['הצפנת AES-256', 'שרשרת החזקה', 'חילוץ OCR', 'ניתוח מטא-דאטה'] },
      { id: '06', name: 'Hypothesis Engine', subtitle: 'ניהול מדעי של השערות', icon: '⊕', color: 'from-orange-600/20 to-orange-900/10 border-orange-700/40', accent: 'text-orange-400', desc: 'בנה השערות המקושרות לראיות עם ציון אמינות ותהליך אימות. ודא שכל תיאוריה אנליטית מבוססת על נתונים מאומתים.', features: ['בניית תיאוריות', 'קישור ראיות', 'ציון אמינות', 'תהליך אימות'] },
      { id: '07', name: 'Intelligence AI', subtitle: 'ניתוח חזוי ויצירת תובנות', icon: '⬢', color: 'from-pink-600/20 to-pink-900/10 border-pink-700/40', accent: 'text-pink-400', desc: 'נצל את כוח הבינה המלאכותית (GPT-4 ו-Claude) לניתוח מתקדם. סכם ראיות אוטומטית, זהה דפוסים מורכבים וצור דוחות מודיעין מבצעיים.', features: ['GPT-4 & Claude משולבים', 'סיכום אוטומטי', 'זיהוי דפוסים', 'שאילתות בשפה טבעית'] },
      { id: '08', name: 'Operations Center', subtitle: 'תיאום טקטי של צוותים', icon: '⊗', color: 'from-red-600/20 to-red-900/10 border-red-700/40', accent: 'text-red-400', desc: 'נהל משימות מבצעיות, הקצה שליחויות, עקוב אחר צוותים בשטח ותאם מבצעים רב-צוותיים ביעילות.', features: ['הקצאת משימות', 'מטריצת עדיפויות', 'תיאום רב-צוותי', 'בקרת לוחות זמנים'] },
      { id: '09', name: 'Report Generator', subtitle: 'דוחות מקצועיים תוך דקות', icon: '⊜', color: 'from-indigo-600/20 to-indigo-900/10 border-indigo-700/40', accent: 'text-indigo-400', desc: 'צור דוחות מודיעין מקצועיים עם תבניות מותאמות אישית לתדרוכים טקטיים, אסטרטגיים ומנהלים. סיווג אוטומטי וייצוא PDF/DOCX.', features: ['תבניות מותאמות אישית', 'סיווג אוטומטי', 'ייצוא PDF/DOCX', 'תדרוכי הנהלה'] },
      { id: '10', name: 'Trust Engine', subtitle: 'הערכת אמינות המידע', icon: '⬟', color: 'from-teal-600/20 to-teal-900/10 border-teal-700/40', accent: 'text-teal-400', desc: 'יישם את סולם האדמירליות להערכת ומעקב אחר אמינות מידע ומקורות. ודא שהניתוחים שלך מבוססים על נתונים מאומתים.', features: ['סולם האדמירליות', 'אמינות המקור', 'אמינות המודיעין', 'מעקב היסטורי'] },
      { id: '11', name: 'Gap Detection', subtitle: 'זיהוי פערי מודיעין', icon: '◬', color: 'from-amber-600/20 to-amber-900/10 border-amber-700/40', accent: 'text-amber-400', desc: 'זהה פערי מודיעין ודרישות איסוף. תעדף את הלא-ידוע והכוון משאבים לצרכי המידע הקריטיים.', features: ['מיפוי פערים', 'דרישות איסוף', 'ציון עדיפות', 'ניתוח כיסוי'] },
    ],
  },
  howItWorks: {
    label: 'זרימה מבצעית',
    title: 'מאיסוף לתובנה',
    subtitle: 'חמישה שלבים משולבים המהפכים נתונים גולמיים למוצרי מודיעין מבצעיים.',
    stepLabel: 'שלב',
    steps: [
      { step: '01', title: 'פתיחת חקירה', desc: 'האנליסט יוצר את החקירה, קובע רמת סיווג, מקצה צוות וקובע היקף. כל הגישות מבוקרות.', icon: '⬡' },
      { step: '02', title: 'איסוף והזנת נתונים', desc: 'ישויות נרשמות, ראיות מועלות לכספת המוצפנת ומקורות מוערכים על ידי Trust Engine בסולם האדמירליות.', icon: '◈' },
      { step: '03', title: 'ניתוח וקורלציה', desc: 'גרף הידע ממפה קשרים בין ישויות, מנוע הציר הזמני מסדר אירועים כרונולוגית, והבינה המלאכותית מנתחת דפוסים ומציעה קורלציות.', icon: '◉' },
      { step: '04', title: 'גיבוש השערות', desc: 'אנליסטים בונים השערות המקושרות לראיות קונקרטיות, עם ציון אמינות ותהליך אימות מובנה.', icon: '⊕' },
      { step: '05', title: 'יצירת מוצר מודיעין', desc: 'דוחות טקטיים ואסטרטגיים נוצרים אוטומטית עם שרשרת הראיות המלאה, מוכנים לתדרוך מנהלים או פעולה מבצעית.', icon: '⊜' },
    ],
  },
  multiTenant: {
    label: 'ארכיטקטורת מולטי-טנאנט',
    title: 'אבטחה ובידוד ללא תחרות',
    description: 'ZORD תוכנן להפעיל מספר מוסדות מבודדים לחלוטין על תשתית אחת. לכל ארגון יש נתונים, משתמשים והגדרות נפרדות: אין דליפת נתונים בין טנאנטים.',
    points: [
      'בידוד נתונים מלא לכל טנאנט בכל הטבלאות',
      'פורטל Super Admin ליצירה וניהול מוסדות',
      'תוכניות הניתנות להגדרה: מגבלות משתמשים, חקירות ואחסון',
      'SSO ו-MFA הניתנים להגדרה לכל מוסד',
      'יומני ביקורת נפרדים לכל ארגון',
    ],
    rolesLabel: 'היררכיית גישה',
    isolationLabel: 'בידוד נתונים',
    isolationNote: '↕ אפס דליפת נתונים בין טנאנטים',
    roles: [
      { role: 'SUPER ADMIN', desc: 'ניהול כל המוסדות', color: 'border-red-700/50 bg-red-950/30 text-red-400' },
      { role: 'TENANT ADMIN', desc: 'ניהול המוסד', color: 'border-orange-700/50 bg-orange-950/30 text-orange-400' },
      { role: 'ANALYST', desc: 'יצירה וניתוח מלא', color: 'border-blue-700/50 bg-blue-950/30 text-blue-400' },
      { role: 'OPERATOR', desc: 'ביצוע מבצעי', color: 'border-green-700/50 bg-green-950/30 text-green-400' },
      { role: 'VIEWER', desc: 'קריאה בלבד', color: 'border-zord-border bg-zord-muted/30 text-zord-text-muted' },
    ],
    institutions: ['סוכנות פדרלית', 'משטרת מחוז', 'פרקליטות המדינה'],
  },
  plans: {
    label: 'תוכניות',
    title: 'לכל קנה מידה של פעילות',
    mostPopular: 'הפופולרי ביותר',
    cta: 'בקש גישה',
    items: [
      { name: 'TRIAL', label: 'ניסיון', price: 'חינם', period: '30 יום', color: 'border-zord-border', accent: 'text-zord-text-muted', features: ['5 משתמשים', '10 חקירות', '5 GB אחסון', 'כל המודולים'] },
      { name: 'STARTER', label: 'בסיסי', price: '₪2,190', period: '/חודש', color: 'border-blue-700/50', accent: 'text-blue-400', features: ['25 משתמשים', '50 חקירות', '50 GB אחסון', 'תמיכה בדוא"ל'] },
      { name: 'PROFESSIONAL', label: 'מקצועי', price: '₪6,490', period: '/חודש', color: 'border-purple-700/50', accent: 'text-purple-400', highlight: true, features: ['100 משתמשים', '500 חקירות', '500 GB אחסון', 'תמיכה עדיפה'] },
      { name: 'ENTERPRISE', label: 'ארגוני', price: 'לפי הצעה', period: '', color: 'border-amber-700/50', accent: 'text-amber-400', features: ['משתמשים ללא הגבלה', 'חקירות ללא הגבלה', 'אחסון ללא הגבלה', 'SLA + תמיכה ייעודית'] },
    ],
  },
  cta: {
    badge: 'הדגמה מותאמת אישית',
    title: 'מוכן לשפר את יכולות החקירה שלך?',
    description: 'בקש הדגמה מותאמת אישית וגלה כיצד ZORD Intelligence Operating System יכול לחולל מהפכה בפעולות המודיעין החקירתי שלך.',
    primary: 'בקש הדגמה',
    secondary: 'כניסה למערכת',
  },
  footer: {
    copyright: '© 2026 ZORD. לשימוש בלעדי של ארגונים מורשים.',
    classification: 'CLASSIFICATION: UNCLASSIFIED',
  },
}

const ru: LandingContent = {
  nav: { access: 'Войти в систему', demo: 'Запросить демо' },
  hero: {
    badge: 'Ведущая платформа следственного интеллекта',
    tagline: 'Превратите сырые данные в оперативную разведку. Оптимизируйте расследования.',
    description:
      'Следователи сталкиваются со сложной реальностью: огромные объёмы данных, необходимость быстрой корреляции, обеспечение цепочки хранения доказательств и давление ради точных, мобилизационных результатов. ZORD создан как основа ваших операций — объединяет передовые технологии с проверенными следственными процессами.',
    ctaRequest: 'Запросить демонстрацию',
    ctaAccess: 'Войти в систему',
    stats: [
      { value: '11', label: 'Интегрированных модулей' },
      { value: '4', label: 'Языка (HE/EN/RU/PT)' },
      { value: '5', label: 'Уровней доступа' },
    ],
  },
  challenges: {
    label: 'Проблемы',
    title: 'Проблемы, которые вам знакомы',
    subtitle: 'ZORD создан для решения критических узких мест, с которыми специалисты в области безопасности и разведки сталкиваются каждый день.',
    items: [
      { icon: '⊗', title: 'Перегрузка информацией', desc: 'Сложность обработки и корреляции больших объёмов данных из разных источников.' },
      { icon: '⊟', title: 'Фрагментация доказательств', desc: 'Доказательства разбросаны по разным системам, что нарушает целостность и цепочку хранения.' },
      { icon: '⊞', title: 'Медленный ручной анализ', desc: 'Ручные процессы анализа данных, поглощающие ценное время и ресурсы.' },
      { icon: '◈', title: 'Неэффективное сотрудничество', desc: 'Отсутствие интегрированных инструментов для многопрофильных команд, что затрудняет безопасный обмен информацией.' },
      { icon: '◉', title: 'Медленное принятие решений', desc: 'Сложность преобразования комплексных данных в чёткие идеи для быстрых и эффективных решений.' },
    ],
  },
  demo: {
    label: 'Интерактивное демо',
    title: 'Изучите систему в глубину',
    subtitle: 'Шесть реальных сценариев · от базовой панели до многорасследовательского оперативного центра. Каждый вид отражает реальный интерфейс ZORD.',
    complexityLabels: ['ПРОСТОЙ', 'СРЕДНИЙ', 'СЛОЖНЫЙ'],
    tabs: { dashboard: 'Панель', vault: 'Улики', graph: 'Граф', timeline: 'Хронология', hypothesis: 'Гипотезы', ops: 'Операции' },
    panels: {
      liveBadge: 'В ЭФИРЕ',
      severity: { critical: 'КРИТИЧНО', high: 'ВЫСОКО', medium: 'СРЕДНЕ', low: 'НИЗКО', info: 'ИНФО' },
      classification: { secret: 'СЕКРЕТНО', confidential: 'КОНФИДЕНЦИАЛЬНО', ultraSecret: 'СОВ. СЕКРЕТНО' },
      status: { critical: 'КРИТИЧНАЯ', high: 'ВЫСОКАЯ', medium: 'СРЕДНЯЯ' },
      dashboard: {
        title: 'ZORD INTELLIGENCE · ПАНЕЛЬ УПРАВЛЕНИЯ',
        stats: ['Активные расследования', 'Картированные субъекты', 'Улик в хранилище', 'Критические оповещения'],
        activityLabel: 'Недавняя активность',
        users: ['LEVY, A.', 'COHEN, R.', 'AI ENGINE', 'RONEN, S.', 'СИСТЕМА', 'LEVY, A.'],
        activity: [
          'Добавлена улика DOC-2024-089 → Операция Nighthawk',
          'Субъект "MIRKA CAPITAL" связан с 3 активными расследованиями',
          'Гипотеза H1 обновлена до 94% · обнаружены новые финансовые паттерны',
          'Тактический отчёт экспортирован · СЕКРЕТНО · Операция Alfa',
          'Обнаружен временной пробел: 47 дней без событий в Операции Tempest',
          'Зарегистрирован новый субъект: KARIM VORONOV · ЭКСТРЕМАЛЬНЫЙ риск (89/100)',
        ],
        alertsLabel: 'Активные оповещения',
        alerts: [
          'Обнаружено движение $350k',
          'Субъект в 3 странах одновременно',
          'Документ изменён после опечатывания',
          'Обнаружен новый VPN-паттерн',
          'Временной пробел > 30 дней',
          'Сформирован еженедельный отчёт',
        ],
      },
      vault: {
        title: 'ХРАНИЛИЩЕ УЛИК · ОПЕРАЦИЯ NIGHTHAWK',
        badge: 'ШИФРОВАНИЕ AES-256',
        headers: ['ID', 'ИМЯ', 'ТИП', 'РАЗМЕР', 'КЛАСС.', 'ХРАНЕНИЕ'],
        types: { pdf: 'PDF', audio: 'АУДИО', image: 'ИЗОБР.', sheet: 'ТАБЛИЦА', data: 'ДАННЫЕ' },
        integrityOk: '✓ ЦЕЛО',
        integrityPending: '⚠ ОЖИДАНИЕ',
        detailLabel: 'Детали · EVD-001',
        detailKeys: ['Файл', 'Hash SHA-256', 'Собрано', 'Собрал', 'Дело'],
        collectedByValue: 'LEVY, Ariel (АНАЛИТИК)',
        custodyLabel: 'Цепочка хранения',
        custodyActions: ['Сбор в поле', 'Передача в хранилище', 'Криминалистический анализ'],
        custodyBy: ['LEVY, A.', 'СИСТЕМА', 'COHEN, R.'],
      },
      graph: {
        title: 'ОПЕРАЦИЯ NIGHTHAWK · ГРАФ СВЯЗЕЙ СУБЪЕКТОВ',
        badge: 'КРИТИЧНО',
        operationWord: 'ОПЕРАЦИЯ',
        edges: ['ФИНАНСИРУЕТ', 'РУКОВОДИТ', 'РАСПОЛОЖЕН', 'КОНТРОЛИРУЕТ', 'ОСНОВНОЙ ПОДОЗР.'],
        suspectLabel: 'ОСНОВНОЙ ПОДОЗРЕВАЕМЫЙ',
        nodeOrg: 'ОРГАНИЗАЦИЯ',
        nodeTransfers: 'ПЕРЕВОДЫ',
        nodeFinancial: 'ФИНАНСЫ',
        nodeLocation: 'ЛОКАЦИЯ',
        nodeCompany: 'КОМПАНИЯ',
        riskLabel: 'ОБЩИЙ РИСК',
        riskLevel: 'ЭКСТРЕМАЛЬНЫЙ',
        statsLine: '18 ЛИЦ · 27 ОРГ. · 14 МЕСТ · 153 ДОК.',
        overlay: ['Субъекты', 'Связи', 'Улики'],
      },
      timeline: {
        title: 'ОПЕРАЦИЯ NIGHTHAWK · ДВИЖОК ХРОНОЛОГИИ',
        badge: 'АПР→МАЙ 2024',
        axis: ['10 АПР', '15 АПР', '20 АПР', '25 АПР', '30 АПР', '05 МАЙ', '10 МАЙ', '15 МАЙ', '20 МАЙ'],
        tracks: ['СВЯЗЬ', 'ФИНАНСЫ', 'ПЕРЕМЕЩЕНИЕ', 'ДОКУМЕНТЫ'],
        commEvents: ['Шифр. звонок', 'Email', 'Telegram', 'VPN-звонок', 'Сообщение'],
        finEvents: ['Перевод $85k', 'Снятие', 'Перевод $350k', 'Депозит'],
        moveEvents: ['Дубай → Стамбул', 'Отель', 'Рейс MIA→HKG'],
        docEvents: ['Контракт', 'Изм. документ', 'Удал. файл', 'Новый контракт', 'PDF экспорт'],
        correlationLabel: 'КОРРЕЛЯЦИЯ ОБНАРУЖЕНА ИИ',
        correlationText: 'Выявлен паттерн: финансовые переводы высокой стоимости (≥$100k) систематически происходят через 24-48ч после зашифрованных коммуникаций из Дубая. Вероятность отмывания денег: ',
      },
      hypothesis: {
        title: 'ДВИЖОК ГИПОТЕЗ · СРАВНИТЕЛЬНЫЙ АНАЛИЗ',
        badge: 'ИИ АКТИВЕН',
        items: [
          'Международное отмывание $4.2M',
          'Сеть влияния · Финансовый сектор',
          'Контрабанда через порт Дубая',
          'Мошенничество в госконтрактах',
        ],
        corroborate: 'улик подтверждают',
        contradict: 'опровергают',
        total: 'всего',
        aiLabel: 'Анализ ИИ',
        aiTextBold: 'H1 — доминирующая гипотеза.',
        aiText: ' Переводы USD 350k (30 АПР) и USD 85k (15 АПР) коррелируют с зашифрованными коммуникациями, обнаруженными за 24-48ч до этого, через узел Дубай. Паттерн соответствует типологии layering FATF.',
        gapsLabel: 'Обнаруженные пробелы',
        gaps: ['Период без событий: 22-28 МАЙ', 'Субъект "BROKER-X" не верифицирован', 'H3 не хватает физических улик'],
        recommendationLabel: 'Приоритетная рекомендация',
        recommendationText: 'Сосредоточить сбор на периоде 22-28 МАЙ для подтверждения или опровержения H1. Запросить MLAT для банковских записей Дубая.',
      },
      ops: {
        title: 'ЦЕНТР ОПЕРАЦИЙ · МУЛЬТИ-РАССЛЕДОВАТЕЛЬСКИЙ ОБЗОР',
        badge: '3 АКТИВНЫХ',
        stats: ['Активные операции', 'Аналитиков онлайн', 'Критические оповещения', 'H1 Trust Score'],
        operationsLabel: 'Текущие расследования',
        names: ['ОПЕРАЦИЯ NIGHTHAWK', 'ПРОЕКТ ALFA', 'ОПЕРАЦИЯ TEMPEST'],
        tags: [['ОТМЫВАНИЕ', 'ТРАНСНАЦ.', 'ФИНАНСЫ'], ['КОРРУПЦИЯ', 'ГОССЕКТОР'], ['ТРАФИК', 'РЕГИОН.']],
        last: ['Последнее действие: 14 мин назад', 'Последнее действие: 1ч 20мин назад', 'Последнее действие: 3ч назад · Пробел обнаружен'],
        trustScore: 'trust score',
        analysts: 'аналитиков',
        feedLabel: 'Живая лента',
        feed: [
          'Движение USD 350k подтверждено · швейцарский счёт',
          'Субъект VORONOV обнаружен в Дубае и Стамбуле одновременно',
          'Контракт #2024-089 изменён после подписания · hash изменён',
          'Новая связь: BLACK SEA TRADING → MIRKA CAPITAL (+$85k)',
          'Выявлен временной пробел: 22-28 МАЙ без записей',
          'Сформирован частичный отчёт · ожидает утверждения',
        ],
      },
    },
  },
  modules: {
    label: 'Модули',
    title: 'Полная экосистема для расследований',
    subtitle: 'Одиннадцать специализированных модулей, охватывающих весь следственный цикл — от сбора данных до создания итогового разведывательного продукта.',
    items: [
      { id: '01', name: 'Investigation Core', subtitle: 'Командный центр операций', icon: '⬡', color: 'from-blue-600/20 to-blue-900/10 border-blue-700/40', accent: 'text-blue-400', desc: 'Управляйте сложными расследованиями с полной прослеживаемостью. Создавайте, назначайте и отслеживайте дела с подробным журналом аудита, цепочкой хранения доказательств и совместной работой нескольких аналитиков.', features: ['Рабочее пространство для нескольких аналитиков', 'Полный журнал аудита', 'Цепочка хранения', 'Уровни классификации'] },
      { id: '02', name: 'Entity Engine', subtitle: 'Раскрывайте скрытые сети', icon: '◈', color: 'from-purple-600/20 to-purple-900/10 border-purple-700/40', accent: 'text-purple-400', desc: 'Создавайте комплексные профили лиц, организаций, активов и мест. Управляйте псевдонимами и коррелируйте субъекты между расследованиями для обнаружения скрытых связей.', features: ['Профили лиц и организаций', 'Отслеживание активов', 'Управление псевдонимами', 'Межделовая корреляция'] },
      { id: '03', name: 'Knowledge Graph', subtitle: 'Визуализируйте невидимые связи', icon: '◉', color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-700/40', accent: 'text-cyan-400', desc: 'Интерактивно визуализируйте связи, картируйте сети влияния и обнаруживайте отношения, которые невозможно выявить вручную. Необходимо для понимания структур групп и сетей мошенничества.', features: ['Интерактивный холст Neo4j', 'Кластеризация сетей', 'Анализ кратчайшего пути', 'Оценка влияния'] },
      { id: '04', name: 'Timeline Engine', subtitle: 'Хронология для поведенческого анализа', icon: '⊞', color: 'from-green-600/20 to-green-900/10 border-green-700/40', accent: 'text-green-400', desc: 'Картируйте события в хронологическом порядке, коррелируйте действия и выявляйте поведенческие паттерны с течением времени, раскрывая ключевые сведения о методах работы.', features: ['Мультиисточниковая хронология', 'Обнаружение паттернов', 'Временная корреляция', 'Кластеризация событий'] },
      { id: '05', name: 'Evidence Vault', subtitle: 'Безопасность и целостность доказательств', icon: '⊟', color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-700/40', accent: 'text-yellow-400', desc: 'Безопасное зашифрованное хранилище для всех доказательств. Загружайте, классифицируйте и ведите цепочку хранения для документов, изображений и мультимедиа с шифрованием AES-256.', features: ['Шифрование AES-256', 'Цепочка хранения', 'Извлечение OCR', 'Анализ метаданных'] },
      { id: '06', name: 'Hypothesis Engine', subtitle: 'Научное управление гипотезами', icon: '⊕', color: 'from-orange-600/20 to-orange-900/10 border-orange-700/40', accent: 'text-orange-400', desc: 'Создавайте гипотезы, связанные с доказательствами, с оценкой достоверности и рабочими процессами валидации. Убедитесь, что каждая аналитическая теория основана на проверенных данных.', features: ['Построение теорий', 'Связывание доказательств', 'Оценка достоверности', 'Процесс валидации'] },
      { id: '07', name: 'Intelligence AI', subtitle: 'Предиктивный анализ и генерация инсайтов', icon: '⬢', color: 'from-pink-600/20 to-pink-900/10 border-pink-700/40', accent: 'text-pink-400', desc: 'Используйте мощь ИИ (GPT-4 и Claude) для продвинутого анализа. Автоматически суммируйте доказательства, выявляйте сложные паттерны и создавайте оперативные разведывательные отчёты.', features: ['Интеграция GPT-4 и Claude', 'Автоматическое суммирование', 'Распознавание паттернов', 'Запросы на естественном языке'] },
      { id: '08', name: 'Operations Center', subtitle: 'Тактическая координация команд', icon: '⊗', color: 'from-red-600/20 to-red-900/10 border-red-700/40', accent: 'text-red-400', desc: 'Управляйте оперативными задачами, назначайте миссии, отслеживайте полевые команды и эффективно координируйте многокомандные операции, обеспечивая соблюдение сроков.', features: ['Назначение задач', 'Матрица приоритетов', 'Многокомандная координация', 'Контроль сроков'] },
      { id: '09', name: 'Report Generator', subtitle: 'Профессиональные отчёты за минуты', icon: '⊜', color: 'from-indigo-600/20 to-indigo-900/10 border-indigo-700/40', accent: 'text-indigo-400', desc: 'Создавайте профессиональные разведывательные отчёты с настраиваемыми шаблонами для тактических, стратегических и управленческих брифингов. Автоклассификация и экспорт PDF/DOCX.', features: ['Настраиваемые шаблоны', 'Автоклассификация', 'Экспорт PDF/DOCX', 'Управленческие брифинги'] },
      { id: '10', name: 'Trust Engine', subtitle: 'Оценка достоверности информации', icon: '⬟', color: 'from-teal-600/20 to-teal-900/10 border-teal-700/40', accent: 'text-teal-400', desc: 'Применяйте шкалу Адмиралтейства для оценки и отслеживания достоверности информации и источников. Убедитесь, что ваш анализ основан на проверенных и надёжных данных.', features: ['Шкала Адмиралтейства', 'Надёжность источника', 'Достоверность разведки', 'Историческое отслеживание'] },
      { id: '11', name: 'Gap Detection', subtitle: 'Выявление разведывательных пробелов', icon: '◬', color: 'from-amber-600/20 to-amber-900/10 border-amber-700/40', accent: 'text-amber-400', desc: 'Выявляйте разведывательные пробелы и требования к сбору данных. Приоритизируйте неизвестное и направляйте ресурсы на критические информационные потребности.', features: ['Картирование пробелов', 'Требования к сбору', 'Оценка приоритета', 'Анализ покрытия'] },
    ],
  },
  howItWorks: {
    label: 'Оперативный поток',
    title: 'От сбора до инсайта',
    subtitle: 'Пять интегрированных шагов, превращающих сырые данные в оперативные разведывательные продукты.',
    stepLabel: 'Шаг',
    steps: [
      { step: '01', title: 'Открытие расследования', desc: 'Аналитик создаёт расследование, устанавливает уровень классификации, назначает команду и определяет объём. Весь доступ фиксируется в журнале.', icon: '⬡' },
      { step: '02', title: 'Сбор и загрузка данных', desc: 'Субъекты регистрируются, доказательства загружаются в зашифрованное хранилище, а источники оцениваются Trust Engine по шкале Адмиралтейства.', icon: '◈' },
      { step: '03', title: 'Анализ и корреляция', desc: 'Граф знаний картирует связи между субъектами, Timeline Engine упорядочивает события хронологически, а ИИ анализирует паттерны и предлагает корреляции.', icon: '◉' },
      { step: '04', title: 'Формулировка гипотез', desc: 'Аналитики строят гипотезы, связанные с конкретными доказательствами, с оценкой достоверности и структурированным процессом валидации.', icon: '⊕' },
      { step: '05', title: 'Создание разведывательного продукта', desc: 'Тактические и стратегические отчёты автоматически генерируются с полной цепочкой доказательств, готовые для управленческого брифинга или оперативного действия.', icon: '⊜' },
    ],
  },
  multiTenant: {
    label: 'Мультиарендная архитектура',
    title: 'Непревзойдённая безопасность и изоляция',
    description: 'ZORD спроектирован для работы множества полностью изолированных учреждений на единой инфраструктуре. Каждая организация имеет собственные данные, пользователей и настройки: никаких утечек данных между арендаторами.',
    points: [
      'Полная изоляция данных по арендатору во всех таблицах',
      'Портал Super Admin для создания учреждений и управления ими',
      'Настраиваемые планы: лимиты пользователей, расследований и хранилища',
      'Настраиваемые SSO и MFA для каждого учреждения',
      'Отдельные журналы аудита для каждой организации',
    ],
    rolesLabel: 'Иерархия доступа',
    isolationLabel: 'Изоляция данных',
    isolationNote: '↕ Нулевая утечка данных между арендаторами',
    roles: [
      { role: 'SUPER ADMIN', desc: 'Управление всеми учреждениями', color: 'border-red-700/50 bg-red-950/30 text-red-400' },
      { role: 'TENANT ADMIN', desc: 'Управление учреждением', color: 'border-orange-700/50 bg-orange-950/30 text-orange-400' },
      { role: 'ANALYST', desc: 'Полное создание и анализ', color: 'border-blue-700/50 bg-blue-950/30 text-blue-400' },
      { role: 'OPERATOR', desc: 'Оперативное исполнение', color: 'border-green-700/50 bg-green-950/30 text-green-400' },
      { role: 'VIEWER', desc: 'Только чтение', color: 'border-zord-border bg-zord-muted/30 text-zord-text-muted' },
    ],
    institutions: ['Федеральное агентство', 'Региональная полиция', 'Прокуратура'],
  },
  plans: {
    label: 'Тарифы',
    title: 'Для любого масштаба операций',
    mostPopular: 'Самый популярный',
    cta: 'Запросить доступ',
    items: [
      { name: 'TRIAL', label: 'Пробный', price: 'Бесплатно', period: '30 дней', color: 'border-zord-border', accent: 'text-zord-text-muted', features: ['5 пользователей', '10 расследований', '5 ГБ хранилища', 'Все модули'] },
      { name: 'STARTER', label: 'Начальный', price: '₽54 000', period: '/мес', color: 'border-blue-700/50', accent: 'text-blue-400', features: ['25 пользователей', '50 расследований', '50 ГБ хранилища', 'Поддержка по email'] },
      { name: 'PROFESSIONAL', label: 'Профессиональный', price: '₽162 000', period: '/мес', color: 'border-purple-700/50', accent: 'text-purple-400', highlight: true, features: ['100 пользователей', '500 расследований', '500 ГБ хранилища', 'Приоритетная поддержка'] },
      { name: 'ENTERPRISE', label: 'Корпоративный', price: 'По запросу', period: '', color: 'border-amber-700/50', accent: 'text-amber-400', features: ['Без ограничений пользователей', 'Без ограничений расследований', 'Без ограничений хранилища', 'SLA + выделенная поддержка'] },
    ],
  },
  cta: {
    badge: 'Персональная демонстрация',
    title: 'Готовы повысить возможности расследования?',
    description: 'Запросите персональную демонстрацию и узнайте, как ZORD Intelligence Operating System может революционизировать ваши операции следственного интеллекта.',
    primary: 'Запросить демонстрацию',
    secondary: 'Войти в систему',
  },
  footer: {
    copyright: '© 2026 ZORD. Исключительное использование авторизованными организациями.',
    classification: 'CLASSIFICATION: UNCLASSIFIED',
  },
}

export const LANDING_DATA: Record<LandingLocale, LandingContent> = { pt, en, he, ru }

'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

const CHALLENGES = [
  {
    icon: '⊗',
    title: 'Sobrecarga de Informações',
    desc: 'Dificuldade em processar e correlacionar grandes volumes de dados de diversas fontes.',
  },
  {
    icon: '⊟',
    title: 'Fragmentação de Evidências',
    desc: 'Evidências dispersas em múltiplos sistemas, comprometendo a integridade e a cadeia de custódia.',
  },
  {
    icon: '⊞',
    title: 'Análise Manual Demorada',
    desc: 'Processos manuais de análise de dados que consomem tempo e recursos valiosos.',
  },
  {
    icon: '◈',
    title: 'Colaboração Ineficiente',
    desc: 'Falta de ferramentas integradas para equipes multidisciplinares, dificultando o compartilhamento seguro.',
  },
  {
    icon: '◉',
    title: 'Tomada de Decisão Lenta',
    desc: 'Dificuldade em transformar dados complexos em insights claros para decisões rápidas e eficazes.',
  },
]

const MODULES = [
  {
    id: '01',
    name: 'Investigation Core',
    subtitle: 'Centro de Comando da Operação',
    icon: '⬡',
    color: 'from-blue-600/20 to-blue-900/10 border-blue-700/40',
    accent: 'text-blue-400',
    desc: 'Gerencie investigações complexas com rastreabilidade completa. Crie, atribua e monitore casos com trilha de auditoria detalhada, cadeia de custódia de evidências e colaboração multi-analista.',
    features: ['Workspace multi-analista', 'Trilha de auditoria completa', 'Cadeia de custódia', 'Níveis de classificação'],
  },
  {
    id: '02',
    name: 'Entity Engine',
    subtitle: 'Desvende Redes Ocultas',
    icon: '◈',
    color: 'from-purple-600/20 to-purple-900/10 border-purple-700/40',
    accent: 'text-purple-400',
    desc: 'Construa perfis abrangentes de indivíduos, organizações, ativos e locais. Gerencie aliases e correlacione entidades entre investigações para descobrir relacionamentos ocultos.',
    features: ['Perfis de pessoas e org.', 'Rastreamento de ativos', 'Gestão de aliases', 'Correlação entre casos'],
  },
  {
    id: '03',
    name: 'Knowledge Graph',
    subtitle: 'Visualize Conexões Invisíveis',
    icon: '◉',
    color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-700/40',
    accent: 'text-cyan-400',
    desc: 'Visualize interativamente conexões, mapeie redes de influência e descubra relacionamentos que seriam impossíveis de identificar manualmente. Essencial para entender estruturas de grupos e redes de fraude.',
    features: ['Canvas interativo Neo4j', 'Clustering de redes', 'Análise de menor caminho', 'Score de influência'],
  },
  {
    id: '04',
    name: 'Timeline Engine',
    subtitle: 'Cronologia para Análise Comportamental',
    icon: '⊞',
    color: 'from-green-600/20 to-green-900/10 border-green-700/40',
    accent: 'text-green-400',
    desc: 'Mapeie eventos cronologicamente, correlacione atividades e identifique padrões comportamentais ao longo do tempo, revelando insights cruciais para compreensão de modus operandi.',
    features: ['Timeline multi-fonte', 'Detecção de padrões', 'Correlação temporal', 'Agrupamento de eventos'],
  },
  {
    id: '05',
    name: 'Evidence Vault',
    subtitle: 'Segurança e Integridade das Provas',
    icon: '⊟',
    color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-700/40',
    accent: 'text-yellow-400',
    desc: 'Armazenamento seguro e criptografado para todas as evidências. Faça upload, categorize e mantenha a cadeia de custódia para documentos, imagens e multimídia com criptografia AES-256.',
    features: ['Criptografia AES-256', 'Cadeia de custódia', 'Extração OCR', 'Análise de metadados'],
  },
  {
    id: '06',
    name: 'Hypothesis Engine',
    subtitle: 'Gestão Científica de Hipóteses',
    icon: '⊕',
    color: 'from-orange-600/20 to-orange-900/10 border-orange-700/40',
    accent: 'text-orange-400',
    desc: 'Construa hipóteses vinculadas a evidências com score de confiança e workflow de validação. Garanta que cada teoria analítica seja fundamentada em dados verificados.',
    features: ['Construção de teorias', 'Vinculação de evidências', 'Score de confiança', 'Workflow de validação'],
  },
  {
    id: '07',
    name: 'Intelligence AI',
    subtitle: 'Análise Preditiva e Geração de Insights',
    icon: '⬢',
    color: 'from-pink-600/20 to-pink-900/10 border-pink-700/40',
    accent: 'text-pink-400',
    desc: 'Utilize o poder da inteligência artificial (GPT-4 e Claude) para análise avançada. Sumarize evidências automaticamente, identifique padrões complexos e gere relatórios de inteligência acionáveis.',
    features: ['GPT-4 & Claude integrados', 'Sumarização automática', 'Reconhecimento de padrões', 'Consultas em linguagem natural'],
  },
  {
    id: '08',
    name: 'Operations Center',
    subtitle: 'Coordenação Tática de Equipes',
    icon: '⊗',
    color: 'from-red-600/20 to-red-900/10 border-red-700/40',
    accent: 'text-red-400',
    desc: 'Gerencie tarefas operacionais, atribua missões, rastreie equipes em campo e coordene operações multi-equipes com eficiência, garantindo que prazos sejam cumpridos.',
    features: ['Atribuição de tarefas', 'Matriz de prioridades', 'Coordenação multi-equipe', 'Controle de prazos'],
  },
  {
    id: '09',
    name: 'Report Generator',
    subtitle: 'Relatórios Profissionais em Minutos',
    icon: '⊜',
    color: 'from-indigo-600/20 to-indigo-900/10 border-indigo-700/40',
    accent: 'text-indigo-400',
    desc: 'Gere relatórios de inteligência profissionais com modelos personalizáveis para briefings táticos, estratégicos e executivos. Classificação automática e exportação para PDF/DOCX.',
    features: ['Templates customizáveis', 'Classificação automática', 'Exportação PDF/DOCX', 'Briefings executivos'],
  },
  {
    id: '10',
    name: 'Trust Engine',
    subtitle: 'Avaliação da Credibilidade da Informação',
    icon: '⬟',
    color: 'from-teal-600/20 to-teal-900/10 border-teal-700/40',
    accent: 'text-teal-400',
    desc: 'Aplique a Escala Admiralty para avaliar e rastrear a credibilidade de informações e fontes. Garanta que suas análises sejam baseadas em dados verificados e confiáveis.',
    features: ['Escala Admiralty', 'Confiabilidade da fonte', 'Credibilidade da inteligência', 'Rastreamento histórico'],
  },
  {
    id: '11',
    name: 'Gap Detection',
    subtitle: 'Identifique Lacunas de Inteligência',
    icon: '◬',
    color: 'from-amber-600/20 to-amber-900/10 border-amber-700/40',
    accent: 'text-amber-400',
    desc: 'Identifique lacunas de inteligência e requisitos de coleta. Priorize o que é desconhecido e direcione recursos para as necessidades críticas de informação, garantindo cobertura completa.',
    features: ['Mapeamento de lacunas', 'Requisitos de coleta', 'Score de prioridade', 'Análise de cobertura'],
  },
]

const SECURITY_FEATURES = [
  { icon: '⬡', label: 'MFA TOTP', desc: 'Autenticação de dois fatores para todas as contas' },
  { icon: '⊞', label: 'JWT HttpOnly', desc: 'Tokens armazenados apenas em cookies seguros' },
  { icon: '◈', label: 'RBAC 5 níveis', desc: 'Permissões granulares por função' },
  { icon: '◉', label: 'Multi-tenant', desc: 'Isolamento completo de dados por instituição' },
  { icon: '⊟', label: 'AES-256', desc: 'Dados sensíveis criptografados em repouso' },
  { icon: '⬢', label: 'TLS 1.3', desc: 'Todo tráfego criptografado em trânsito' },
  { icon: '⊕', label: 'Audit Log', desc: 'Cada ação registrada de forma imutável' },
  { icon: '⊗', label: 'Rate Limiting', desc: 'Proteção contra DDoS e força bruta' },
]

const PLANS = [
  {
    name: 'TRIAL',
    label: 'Avaliação',
    price: 'Grátis',
    period: '30 dias',
    color: 'border-zord-border',
    accent: 'text-zord-text-muted',
    features: ['5 usuários', '10 investigações', '5 GB storage', 'Todos os módulos'],
  },
  {
    name: 'STARTER',
    label: 'Inicial',
    price: 'R$ 1.990',
    period: '/mês',
    color: 'border-blue-700/50',
    accent: 'text-blue-400',
    features: ['25 usuários', '50 investigações', '50 GB storage', 'Suporte por e-mail'],
  },
  {
    name: 'PROFESSIONAL',
    label: 'Profissional',
    price: 'R$ 5.990',
    period: '/mês',
    color: 'border-purple-700/50',
    accent: 'text-purple-400',
    highlight: true,
    features: ['100 usuários', '500 investigações', '500 GB storage', 'Suporte prioritário'],
  },
  {
    name: 'ENTERPRISE',
    label: 'Corporativo',
    price: 'Sob consulta',
    period: '',
    color: 'border-amber-700/50',
    accent: 'text-amber-400',
    features: ['Usuários ilimitados', 'Investigações ilimitadas', 'Storage ilimitado', 'SLA + suporte dedicado'],
  },
]

export default function LandingPage() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'he'
  const [activeModule, setActiveModule] = useState(0)
  const [demoTab, setDemoTab] = useState<'dashboard' | 'vault' | 'graph' | 'timeline' | 'hypothesis' | 'ops'>('dashboard')
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen bg-zord-bg text-zord-text">

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-zord-border bg-zord-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-zord-accent">
              <span className="text-xs font-black text-white">Z</span>
            </div>
            <span className="text-sm font-bold tracking-wider text-zord-text">ZORD</span>
            <span className="hidden rounded border border-zord-border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-zord-text-muted sm:inline">
              Intelligence OS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/login`}
              className="rounded border border-zord-border px-3 py-1.5 text-xs font-medium text-zord-text-muted transition-colors hover:border-zord-accent hover:text-zord-accent"
            >
              Acessar Sistema
            </Link>
            <a
              href="mailto:comercial@zord.pro"
              className="rounded bg-zord-accent px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-zord-border">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zord-bg" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 text-center sm:py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zord-accent/30 bg-zord-accent/5 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zord-accent" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Plataforma Definitiva para Inteligência Investigativa</span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-none tracking-tight text-zord-text sm:text-6xl lg:text-7xl">
            ZORD
            <span className="block text-xl font-light tracking-[0.3em] text-zord-text-muted sm:text-3xl">
              INTELLIGENCE OPERATING SYSTEM
            </span>
          </h1>

          <p className="mx-auto mb-4 max-w-2xl text-lg font-semibold leading-snug text-zord-text sm:text-xl">
            Transforme Dados Brutos em Inteligência Acionável. Otimize Suas Investigações.
          </p>

          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-zord-text-muted">
            Profissionais de investigação enfrentam um cenário complexo: volume massivo de dados, necessidade de correlação rápida, garantia da cadeia de custódia e a pressão por resultados precisos e acionáveis. O ZORD foi desenvolvido para ser a espinha dorsal de suas operações, integrando tecnologia de ponta com fluxos de trabalho investigativos comprovados.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:comercial@zord.pro"
              className="w-full rounded bg-zord-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Solicitar Demonstração
            </a>
            <Link
              href={`/${locale}/login`}
              className="w-full rounded border border-zord-border px-6 py-3 text-sm font-medium text-zord-text-muted transition-colors hover:border-zord-accent hover:text-zord-text sm:w-auto"
            >
              Acessar Sistema
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-zord-border pt-10">
            {[
              { value: '11', label: 'Módulos integrados' },
              { value: '4', label: 'Idiomas (HE/EN/RU/PT)' },
              { value: '5', label: 'Níveis de acesso' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-zord-accent sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[10px] text-zord-text-muted sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO VISUAL */}
      <section className="border-b border-zord-border bg-gradient-to-b from-zord-bg via-zord-muted/5 to-zord-bg py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Demonstração Interativa</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Explore o Sistema em Profundidade</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Seis cenários reais · do painel básico ao centro de operações multi-investigação. Cada visualização reflete a interface real do ZORD.
            </p>
          </div>

          {/* Complexity bar */}
          <div className="mb-2 hidden grid-cols-3 text-center sm:grid">
            {['SIMPLES', 'INTERMEDIÁRIO', 'AVANÇADO'].map((l) => (
              <div key={l} className="text-[9px] font-medium tracking-widest text-zord-text-muted/50">{l}</div>
            ))}
          </div>
          {/* Tab selector */}
          <div className="relative mb-8 grid grid-cols-3 gap-1 rounded-lg border border-zord-border bg-zord-surface/30 p-1 sm:grid-cols-6">
            <div className="absolute inset-y-1 hidden w-px bg-zord-border/50 sm:block" style={{ left: 'calc(33.33% - 0.5px)' }} />
            <div className="absolute inset-y-1 hidden w-px bg-zord-border/50 sm:block" style={{ left: 'calc(66.66% - 0.5px)' }} />
            {([
              { id: 'dashboard', label: 'Painel', icon: '⊞', color: 'text-blue-400' },
              { id: 'vault',     label: 'Evidências', icon: '⊟', color: 'text-yellow-400' },
              { id: 'graph',     label: 'Grafo', icon: '◉', color: 'text-purple-400' },
              { id: 'timeline',  label: 'Timeline', icon: '⬡', color: 'text-green-400' },
              { id: 'hypothesis',label: 'Hipóteses', icon: '◈', color: 'text-orange-400' },
              { id: 'ops',       label: 'Operações', icon: '⬢', color: 'text-red-400' },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDemoTab(tab.id)}
                className={`flex flex-col items-center gap-1 rounded px-2 py-2 text-[10px] font-medium transition-all sm:flex-row sm:justify-center sm:gap-1.5 ${
                  demoTab === tab.id
                    ? `${tab.color} border border-current/30 bg-current/5`
                    : 'text-zord-text-muted hover:text-zord-text'
                }`}
              >
                <span className={`text-base sm:text-xs ${demoTab === tab.id ? tab.color : ''}`}>{tab.icon}</span>
                <span className="leading-tight">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── PAINEL PRINCIPAL ── */}
          {demoTab === 'dashboard' && (
            <DemoShell title="ZORD INTELLIGENCE · PAINEL DE CONTROLE" badge="AO VIVO" badgeColor="text-green-400" pulse={pulse}>
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 border-b border-zord-border p-4 sm:grid-cols-4">
                {[
                  { v: '12', l: 'Investigações Ativas', c: 'text-zord-accent', bar: 'bg-zord-accent' },
                  { v: '847', l: 'Entidades Mapeadas', c: 'text-purple-400', bar: 'bg-purple-400' },
                  { v: '2.341', l: 'Evidências no Vault', c: 'text-yellow-400', bar: 'bg-yellow-400' },
                  { v: '8', l: 'Alertas Críticos', c: 'text-red-400', bar: 'bg-red-400' },
                ].map((s) => (
                  <div key={s.l} className="rounded border border-zord-border bg-zord-surface/50 p-3">
                    <div className={`font-mono text-2xl font-black ${s.c}`}>{s.v}</div>
                    <div className="mt-1 text-[10px] text-zord-text-muted">{s.l}</div>
                    <div className="mt-2 h-0.5 w-full rounded bg-zord-border">
                      <div className={`h-full rounded ${s.bar} opacity-60`} style={{ width: '70%' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
                {/* Activity feed */}
                <div className="col-span-2 border-r border-zord-border p-4">
                  <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-zord-text-muted">Atividade Recente</div>
                  {[
                    { time: '14:38', user: 'LEVY, A.', action: 'Adicionou evidência DOC-2024-089 → Operação Nighthawk', color: 'text-yellow-400', icon: '⊟' },
                    { time: '14:35', user: 'COHEN, R.', action: 'Entidade "MIRKA CAPITAL" vinculada a 3 investigações ativas', color: 'text-purple-400', icon: '◈' },
                    { time: '14:31', user: 'IA ENGINE', action: 'Hipótese H1 atualizada para 94% · novos padrões financeiros detectados', color: 'text-zord-accent', icon: '⬢' },
                    { time: '14:22', user: 'RONEN, S.', action: 'Relatório tático exportado · CLASSIFICADO · Operação Alfa', color: 'text-green-400', icon: '⊜' },
                    { time: '14:15', user: 'SISTEMA', action: 'Gap temporal detectado: 47 dias sem eventos na Operação Tempestade', color: 'text-orange-400', icon: '◉' },
                    { time: '13:58', user: 'LEVY, A.', action: 'Nova entidade cadastrada: KARIM VORONOV · risco EXTREMO (89/100)', color: 'text-red-400', icon: '⊗' },
                  ].map((ev, i) => (
                    <div key={i} className="flex gap-3 border-b border-zord-border/30 py-2 last:border-0">
                      <span className={`mt-0.5 shrink-0 text-sm ${ev.color}`}>{ev.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-zord-text-muted">{ev.time}</span>
                          <span className={`text-[9px] font-bold ${ev.color}`}>{ev.user}</span>
                        </div>
                        <p className="text-[10px] leading-snug text-zord-text-muted">{ev.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Alert panel */}
                <div className="p-4">
                  <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-zord-text-muted">Alertas Ativos</div>
                  {[
                    { sev: 'CRÍTICO', title: 'Movimentação $350k detectada', time: '14:31', c: 'border-red-700/60 bg-red-950/20 text-red-400' },
                    { sev: 'CRÍTICO', title: 'Entidade em 3 países simultâneos', time: '13:44', c: 'border-red-700/60 bg-red-950/20 text-red-400' },
                    { sev: 'ALTO', title: 'Documento modificado pós-lacre', time: '12:15', c: 'border-orange-700/60 bg-orange-950/20 text-orange-400' },
                    { sev: 'ALTO', title: 'Padrão de VPN nova detectado', time: '11:50', c: 'border-orange-700/60 bg-orange-950/20 text-orange-400' },
                    { sev: 'MÉDIO', title: 'Gap temporal > 30 dias', time: '10:22', c: 'border-yellow-700/60 bg-yellow-950/20 text-yellow-400' },
                    { sev: 'INFO', title: 'Relatório semanal gerado', time: '09:00', c: 'border-zord-border bg-zord-surface/30 text-zord-text-muted' },
                  ].map((a, i) => (
                    <div key={i} className={`mb-2 rounded border p-2 ${a.c}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold uppercase">{a.sev}</span>
                        <span className="font-mono text-[8px] opacity-60">{a.time}</span>
                      </div>
                      <p className="mt-0.5 text-[9px] leading-snug">{a.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </DemoShell>
          )}

          {/* ── COFRE DE EVIDÊNCIAS ── */}
          {demoTab === 'vault' && (
            <DemoShell title="COFRE DE EVIDÊNCIAS · OPERAÇÃO NIGHTHAWK" badge="CIFRADO AES-256" badgeColor="text-green-400" pulse={pulse}>
              <div className="grid grid-cols-1 sm:grid-cols-5">
                {/* File list */}
                <div className="col-span-3 overflow-x-auto border-r border-zord-border">
                  <table className="w-full min-w-[500px] text-[10px]">
                    <thead>
                      <tr className="border-b border-zord-border bg-zord-surface/50">
                        {['ID', 'NOME', 'TIPO', 'TAMANHO', 'CLASSIF.', 'CUSTÓDIA'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-mono font-bold text-zord-text-muted">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'EVD-001', name: 'contrato_black_sea_2024.pdf', type: 'PDF', size: '2.4 MB', cls: 'SECRETO', chain: true, sel: true, color: 'text-yellow-400' },
                        { id: 'EVD-002', name: 'audio_interceptado_24abr.mp3', type: 'ÁUDIO', size: '18.7 MB', cls: 'CONFIDENCIAL', chain: true, sel: false, color: 'text-blue-400' },
                        { id: 'EVD-003', name: 'foto_vigilancia_dubai_03.jpg', type: 'IMAGEM', size: '4.1 MB', cls: 'CONFIDENCIAL', chain: true, sel: false, color: 'text-blue-400' },
                        { id: 'EVD-004', name: 'wire_transfer_85k_mirka.xlsx', type: 'PLANILHA', size: '891 KB', cls: 'SECRETO', chain: true, sel: false, color: 'text-yellow-400' },
                        { id: 'EVD-005', name: 'passaporte_voronov_scan.pdf', type: 'PDF', size: '1.2 MB', cls: 'SECRETO', chain: false, sel: false, color: 'text-red-400' },
                        { id: 'EVD-006', name: 'historico_celular_abr2024.csv', type: 'DADOS', size: '3.8 MB', cls: 'SECRETO', chain: true, sel: false, color: 'text-yellow-400' },
                        { id: 'EVD-007', name: 'imagem_satelite_armazem.tiff', type: 'IMAGEM', size: '22.1 MB', cls: 'ULTRA SEC.', chain: true, sel: false, color: 'text-red-400' },
                      ].map((f) => (
                        <tr key={f.id} className={`border-b border-zord-border/30 transition-colors hover:bg-zord-surface/30 ${f.sel ? 'bg-zord-accent/5' : ''}`}>
                          <td className="px-3 py-2 font-mono text-zord-text-muted">{f.id}</td>
                          <td className={`px-3 py-2 font-mono ${f.sel ? 'font-bold text-zord-text' : 'text-zord-text-muted'}`}>{f.name}</td>
                          <td className={`px-3 py-2 font-mono ${f.color}`}>{f.type}</td>
                          <td className="px-3 py-2 font-mono text-zord-text-muted">{f.size}</td>
                          <td className="px-3 py-2">
                            <span className={`rounded border px-1.5 py-0.5 text-[8px] font-bold ${f.cls === 'ULTRA SEC.' ? 'border-red-700/60 bg-red-950/20 text-red-400' : f.cls === 'SECRETO' ? 'border-yellow-700/60 bg-yellow-950/20 text-yellow-400' : 'border-blue-700/60 bg-blue-950/20 text-blue-400'}`}>
                              {f.cls}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            {f.chain
                              ? <span className="font-mono text-[9px] text-green-400">✓ ÍNTEGRA</span>
                              : <span className="font-mono text-[9px] text-red-400">⚠ PENDENTE</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* File detail */}
                <div className="col-span-2 p-4">
                  <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-zord-text-muted">Detalhes · EVD-001</div>
                  <div className="space-y-2">
                    {[
                      { k: 'Arquivo', v: 'contrato_black_sea_2024.pdf' },
                      { k: 'Hash SHA-256', v: 'a8f3c91d2e...4b7f' },
                      { k: 'Coletado em', v: '14 ABR 2024 09:22 UTC' },
                      { k: 'Coletado por', v: 'LEVY, Ariel (ANALISTA)' },
                      { k: 'Caso', v: 'OP-NIGHTHAWK-2024' },
                    ].map(({ k, v }) => (
                      <div key={k} className="rounded border border-zord-border bg-zord-surface/30 px-3 py-2">
                        <div className="text-[8px] uppercase tracking-wider text-zord-text-muted">{k}</div>
                        <div className="mt-0.5 font-mono text-[9px] text-zord-text">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-zord-text-muted">Cadeia de Custódia</div>
                    {[
                      { step: 1, action: 'Coleta em campo', by: 'LEVY, A.', date: '14 ABR 09:22', ok: true },
                      { step: 2, action: 'Transferência ao vault', by: 'SISTEMA', date: '14 ABR 09:23', ok: true },
                      { step: 3, action: 'Análise forense', by: 'COHEN, R.', date: '15 ABR 11:40', ok: true },
                    ].map((s) => (
                      <div key={s.step} className="mb-1 flex gap-2">
                        <div className="flex flex-col items-center">
                          <div className={`h-4 w-4 rounded-full border text-center text-[7px] leading-4 font-bold ${s.ok ? 'border-green-600 bg-green-950/30 text-green-400' : 'border-zord-border text-zord-text-muted'}`}>{s.step}</div>
                          {s.step < 3 && <div className="w-px flex-1 bg-zord-border/40" />}
                        </div>
                        <div className="pb-2">
                          <div className="text-[9px] font-medium text-zord-text">{s.action}</div>
                          <div className="font-mono text-[8px] text-zord-text-muted">{s.by} · {s.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DemoShell>
          )}

          {/* ── GRAFO DE ENTIDADES ── */}
          {demoTab === 'graph' && (
            <DemoShell title="OPERAÇÃO NIGHTHAWK · ENTITY RELATIONSHIP GRAPH" badge="CRÍTICO" badgeColor="text-red-400" pulse={pulse}>

              {/* Graph canvas */}
              <div className="relative h-80 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)] sm:h-96">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,212,255,0.04)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="400" fill="url(#grid)" />

                  {/* Edges */}
                  <line x1="400" y1="200" x2="200" y2="100" stroke="rgba(0,212,255,0.3)" strokeWidth="1.5" strokeDasharray="4,2"/>
                  <line x1="400" y1="200" x2="600" y2="100" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5"/>
                  <line x1="400" y1="200" x2="620" y2="250" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" strokeDasharray="4,2"/>
                  <line x1="400" y1="200" x2="180" y2="300" stroke="rgba(251,191,36,0.4)" strokeWidth="2"/>
                  <line x1="400" y1="200" x2="400" y2="340" stroke="rgba(239,68,68,0.5)" strokeWidth="2.5"/>
                  <line x1="600" y1="100" x2="180" y2="300" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="3,3"/>
                  <line x1="200" y1="100" x2="400" y2="340" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="3,3"/>
                  <line x1="620" y1="250" x2="400" y2="340" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
                  <line x1="200" y1="100" x2="620" y2="250" stroke="rgba(0,212,255,0.15)" strokeWidth="1" strokeDasharray="2,4"/>

                  {/* Edge labels */}
                  <text x="295" y="142" fill="rgba(0,212,255,0.5)" fontSize="8" textAnchor="middle" fontFamily="monospace">FINANCIA</text>
                  <text x="508" y="142" fill="rgba(139,92,246,0.6)" fontSize="8" textAnchor="middle" fontFamily="monospace">DIRIGE</text>
                  <text x="520" y="228" fill="rgba(34,197,94,0.5)" fontSize="8" textAnchor="middle" fontFamily="monospace">LOCALIZADO</text>
                  <text x="285" y="260" fill="rgba(251,191,36,0.6)" fontSize="8" textAnchor="middle" fontFamily="monospace">CONTROLA</text>
                  <text x="400" y="278" fill="rgba(239,68,68,0.7)" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">SUSPEITO PRIMÁRIO</text>

                  {/* Center node · Investigation */}
                  <circle cx="400" cy="200" r="28" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.6)" strokeWidth="2"/>
                  <circle cx="400" cy="200" r="22" fill="rgba(0,10,20,0.9)"/>
                  <text x="400" y="197" fill="#00d4ff" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">OPERAÇÃO</text>
                  <text x="400" y="209" fill="#00d4ff" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">NIGHTHAWK</text>

                  {/* Node: SUSPECT */}
                  <circle cx="400" cy="340" r="26" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.8)" strokeWidth="2.5"/>
                  <circle cx="400" cy="340" r={pulse ? 30 : 26} fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="1" className="transition-all duration-700"/>
                  <text x="400" y="337" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">KARIM</text>
                  <text x="400" y="348" fill="#ef4444" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">VORONOV</text>
                  <text x="400" y="375" fill="rgba(239,68,68,0.5)" fontSize="7" textAnchor="middle" fontFamily="monospace">SUSPEITO PRINCIPAL</text>

                  {/* Node: Organization */}
                  <rect x="540" y="75" width="120" height="50" rx="4" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"/>
                  <text x="600" y="97" fill="#8b5cf6" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">BLACK SEA</text>
                  <text x="600" y="108" fill="#8b5cf6" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">TRADING LTD</text>
                  <text x="600" y="118" fill="rgba(139,92,246,0.5)" fontSize="7" textAnchor="middle" fontFamily="monospace">ORGANIZAÇÃO</text>

                  {/* Node: Financial */}
                  <rect x="140" y="75" width="120" height="50" rx="4" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.4)" strokeWidth="1.5"/>
                  <text x="200" y="97" fill="rgba(0,212,255,0.9)" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">TRANSFERÊNCIAS</text>
                  <text x="200" y="108" fill="rgba(0,212,255,0.9)" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">$4.2M USD</text>
                  <text x="200" y="118" fill="rgba(0,212,255,0.4)" fontSize="7" textAnchor="middle" fontFamily="monospace">FINANCEIRO</text>

                  {/* Node: Location */}
                  <circle cx="620" cy="250" r="22" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5"/>
                  <text x="620" y="247" fill="#22c55e" fontSize="8" textAnchor="middle" fontFamily="monospace">DUBAI</text>
                  <text x="620" y="257" fill="#22c55e" fontSize="8" textAnchor="middle" fontFamily="monospace">UAE</text>
                  <text x="620" y="282" fill="rgba(34,197,94,0.4)" fontSize="7" textAnchor="middle" fontFamily="monospace">LOCALIZAÇÃO</text>

                  {/* Node: Asset */}
                  <circle cx="180" cy="300" r="22" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5"/>
                  <text x="180" y="297" fill="#fbbf24" fontSize="8" textAnchor="middle" fontFamily="monospace">MIRKA</text>
                  <text x="180" y="307" fill="#fbbf24" fontSize="8" textAnchor="middle" fontFamily="monospace">CAPITAL</text>
                  <text x="180" y="330" fill="rgba(251,191,36,0.4)" fontSize="7" textAnchor="middle" fontFamily="monospace">EMPRESA</text>

                  {/* Risk indicator */}
                  <rect x="30" y="20" width="90" height="50" rx="4" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>
                  <text x="75" y="37" fill="rgba(239,68,68,0.7)" fontSize="7" textAnchor="middle" fontFamily="monospace">RISCO GERAL</text>
                  <text x="75" y="54" fill="#ef4444" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold">89</text>
                  <text x="75" y="64" fill="rgba(239,68,68,0.5)" fontSize="7" textAnchor="middle" fontFamily="monospace">EXTREMO</text>

                  {/* Stats */}
                  <text x="680" y="370" fill="rgba(0,212,255,0.3)" fontSize="8" textAnchor="middle" fontFamily="monospace">18 PESSOAS · 27 ORG. · 14 LOCAIS · 153 DOC.</text>
                </svg>

                {/* Overlay stats */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {[
                    { label: 'Entidades', value: '62', color: 'text-zord-accent' },
                    { label: 'Conexões', value: '124', color: 'text-purple-400' },
                    { label: 'Evidências', value: '153', color: 'text-yellow-400' },
                  ].map((s) => (
                    <div key={s.label} className="rounded border border-zord-border bg-zord-bg/80 px-2 py-1 backdrop-blur-sm">
                      <div className={`text-xs font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-[9px] text-zord-text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </DemoShell>
          )}

          {/* TIMELINE */}
          {demoTab === 'timeline' && (
            <DemoShell title="OPERAÇÃO NIGHTHAWK · TIMELINE ENGINE" badge="ABR→MAI 2024" badgeColor="text-green-400" pulse={pulse}>

              <div className="p-4">
                {/* Timeline axis */}
                <div className="mb-4 flex items-center gap-0 overflow-x-auto pb-2">
                  {['10 ABR', '15 ABR', '20 ABR', '25 ABR', '30 ABR', '05 MAI', '10 MAI', '15 MAI', '20 MAI'].map((d) => (
                    <div key={d} className="shrink-0 flex-1 text-center text-[9px] text-zord-text-muted font-mono">{d}</div>
                  ))}
                </div>

                {/* Tracks */}
                {[
                  {
                    label: 'COMUNICAÇÃO',
                    color: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
                    dot: 'bg-blue-400',
                    events: [
                      { pos: 5, label: 'Chamada Cript.', wide: false },
                      { pos: 22, label: 'Email', wide: false },
                      { pos: 45, label: 'Msg Telegram', wide: false },
                      { pos: 62, label: 'Chamada VPN', wide: false },
                      { pos: 80, label: 'Mensagem', wide: false },
                    ],
                  },
                  {
                    label: 'FINANCEIRO',
                    color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
                    dot: 'bg-yellow-400',
                    events: [
                      { pos: 15, label: 'Wire $85k', wide: true },
                      { pos: 38, label: 'Saque', wide: false },
                      { pos: 55, label: 'Wire $350k', wide: true },
                      { pos: 72, label: 'Depósito', wide: false },
                    ],
                  },
                  {
                    label: 'DESLOCAMENTO',
                    color: 'bg-green-500/20 border-green-500/50 text-green-400',
                    dot: 'bg-green-400',
                    events: [
                      { pos: 12, label: 'Dubai → Istambul', wide: true },
                      { pos: 42, label: 'Hotel', wide: false },
                      { pos: 65, label: 'Voo MIA→HKG', wide: true },
                    ],
                  },
                  {
                    label: 'DOCUMENTOS',
                    color: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
                    dot: 'bg-purple-400',
                    events: [
                      { pos: 8, label: 'Contrato', wide: false },
                      { pos: 30, label: 'Doc Modificado', wide: false },
                      { pos: 50, label: 'Arquivo Deletado', wide: false },
                      { pos: 70, label: 'Novo Contrato', wide: false },
                      { pos: 88, label: 'PDF Exportado', wide: false },
                    ],
                  },
                ].map((track) => (
                  <div key={track.label} className="mb-3 flex items-center gap-3">
                    <div className="w-20 shrink-0">
                      <div className={`rounded border px-1.5 py-0.5 text-center text-[8px] font-bold ${track.color}`}>
                        {track.label}
                      </div>
                    </div>
                    <div className="relative h-8 flex-1 rounded border border-zord-border/30 bg-zord-muted/10">
                      {track.events.map((ev, i) => (
                        <div
                          key={i}
                          className={`absolute top-1/2 -translate-y-1/2 rounded border px-1 py-0.5 ${track.color} cursor-pointer hover:opacity-100 transition-opacity`}
                          style={{ left: `${ev.pos}%`, transform: 'translate(-50%, -50%)', opacity: 0.85 }}
                        >
                          <span className="whitespace-nowrap text-[7px] font-mono">{ev.label}</span>
                        </div>
                      ))}
                      {/* Timeline bar */}
                      <div className={`absolute inset-y-0 left-0 w-full rounded opacity-10 ${track.dot.replace('bg-', 'bg-')}`} />
                    </div>
                  </div>
                ))}

                {/* Correlation highlight */}
                <div className="mt-4 rounded border border-zord-accent/30 bg-zord-accent/5 p-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full bg-zord-accent ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
                    <span className="text-[10px] font-medium text-zord-accent">CORRELAÇÃO DETECTADA PELA IA</span>
                  </div>
                  <p className="mt-1 text-[10px] leading-relaxed text-zord-text-muted">
                    Padrão identificado: transferências financeiras de alto valor (≥$100k) ocorrem sistematicamente 24-48h após comunicações criptografadas com origem Dubai. Probabilidade de lavagem de dinheiro: <span className="font-bold text-zord-accent">94%</span>
                  </p>
                </div>
              </div>
            </DemoShell>
          )}

          {/* ── MOTOR DE HIPÓTESES ── */}
          {demoTab === 'hypothesis' && (
            <DemoShell title="HYPOTHESIS ENGINE · ANÁLISE COMPARATIVA" badge="IA ATIVA" badgeColor="text-purple-400" pulse={pulse}>
              <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
                {/* Hypothesis list */}
                <div className="col-span-2 space-y-4 border-r border-zord-border p-5">
                  {[
                    { id: 'H1', title: 'Lavagem Internacional de $4.2M', score: 94, ev: 12, ce: 2, level: 'CRÍTICO', color: 'text-red-400', bar: 'bg-red-500', border: 'border-red-700/50 bg-red-950/10' },
                    { id: 'H2', title: 'Rede de Influência · Setor Financeiro', score: 78, ev: 8, ce: 1, level: 'ALTO', color: 'text-orange-400', bar: 'bg-orange-500', border: 'border-orange-700/50 bg-orange-950/10' },
                    { id: 'H3', title: 'Contrabando Via Porto de Dubai', score: 61, ev: 5, ce: 3, level: 'MÉDIO', color: 'text-yellow-400', bar: 'bg-yellow-500', border: 'border-yellow-700/50 bg-yellow-950/10' },
                    { id: 'H4', title: 'Fraude em Contratos Governamentais', score: 45, ev: 4, ce: 4, level: 'BAIXO', color: 'text-zord-text-muted', bar: 'bg-zord-border', border: 'border-zord-border bg-zord-surface/20' },
                  ].map((h) => (
                    <div key={h.id} className={`rounded border p-4 ${h.border}`}>
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-xs font-black ${h.color}`}>{h.id}</span>
                            <span className={`rounded border px-1.5 py-0.5 text-[8px] font-bold ${h.color} border-current/40 bg-current/5`}>{h.level}</span>
                          </div>
                          <div className="mt-0.5 text-xs font-semibold text-zord-text">{h.title}</div>
                        </div>
                        <div className={`shrink-0 font-mono text-2xl font-black ${h.color}`}>{h.score}%</div>
                      </div>
                      {/* Score bar */}
                      <div className="mb-3 h-1.5 w-full rounded-full bg-zord-border/40">
                        <div className={`h-full rounded-full ${h.bar}`} style={{ width: `${h.score}%`, opacity: 0.7 }} />
                      </div>
                      {/* Evidence counters */}
                      <div className="flex gap-4 text-[9px]">
                        <span className="text-green-400">✓ {h.ev} evidências corroboram</span>
                        <span className="text-red-400">✗ {h.ce} contradizem</span>
                        <span className="text-zord-text-muted">· {h.ev + h.ce} total</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* AI Analysis panel */}
                <div className="p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full bg-purple-400 ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400">Análise da IA</span>
                  </div>
                  <div className="rounded border border-purple-700/40 bg-purple-950/10 p-3 text-[10px] leading-relaxed text-zord-text-muted mb-4">
                    <span className="font-semibold text-purple-400">H1 é a hipótese dominante.</span> As transferências de USD 350k (30 ABR) e USD 85k (15 ABR) correlacionam com comunicações criptografadas detectadas 24-48h antes, via nó Dubai. Padrão consistente com tipologia FATF de layering.
                  </div>
                  <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-zord-text-muted">Gaps Detectados</div>
                  {[
                    { t: 'Período sem eventos: 22-28 MAI', s: 'ALTO' },
                    { t: 'Entidade "BROKER-X" sem verificação', s: 'MÉDIO' },
                    { t: 'H3 carece de evidência física', s: 'BAIXO' },
                  ].map((g) => (
                    <div key={g.t} className="mb-2 flex items-start gap-2 rounded border border-zord-border/50 bg-zord-surface/20 p-2">
                      <span className={`mt-0.5 text-[8px] font-bold ${g.s === 'ALTO' ? 'text-red-400' : g.s === 'MÉDIO' ? 'text-yellow-400' : 'text-zord-text-muted'}`}>{g.s}</span>
                      <span className="text-[9px] text-zord-text-muted">{g.t}</span>
                    </div>
                  ))}
                  <div className="mt-4 rounded border border-zord-accent/30 bg-zord-accent/5 p-3">
                    <div className="text-[9px] font-bold text-zord-accent mb-1">Recomendação Prioritária</div>
                    <p className="text-[9px] leading-snug text-zord-text-muted">Focar coleta em período 22-28 MAI para confirmar ou refutar H1. Solicitar MLAT para registros bancários Dubai.</p>
                  </div>
                </div>
              </div>
            </DemoShell>
          )}

          {/* ── CENTRO DE OPERAÇÕES ── */}
          {demoTab === 'ops' && (
            <DemoShell title="CENTRO DE OPERAÇÕES · VISÃO MULTI-INVESTIGAÇÃO" badge="3 ATIVAS" badgeColor="text-red-400" pulse={pulse}>
              {/* Top bar */}
              <div className="grid grid-cols-4 border-b border-zord-border">
                {[
                  { v: '3', l: 'Operações Ativas', c: 'text-zord-accent' },
                  { v: '11', l: 'Analistas Online', c: 'text-green-400' },
                  { v: '8', l: 'Alertas Críticos', c: 'text-red-400' },
                  { v: '94%', l: 'H1 Trust Score', c: 'text-purple-400' },
                ].map((s) => (
                  <div key={s.l} className="border-r border-zord-border p-3 last:border-r-0 text-center">
                    <div className={`font-mono text-xl font-black ${s.c}`}>{s.v}</div>
                    <div className="text-[9px] text-zord-text-muted">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
                {/* Operations */}
                <div className="col-span-2 border-r border-zord-border p-4">
                  <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-zord-text-muted">Investigações em Curso</div>
                  <div className="space-y-3">
                    {[
                      {
                        id: 'OP-2024-001', name: 'OPERAÇÃO NIGHTHAWK', cls: 'SECRETO', status: 'CRÍTICA',
                        analistas: 5, score: 94, bar: 'bg-red-500',
                        color: 'border-red-700/50 bg-red-950/10',
                        badge: 'text-red-400 border-red-700/50 bg-red-950/20',
                        tags: ['LAVAGEM', 'TRANSNACIONAL', 'FINANCEIRO'],
                        last: 'Última ação: 14 min atrás',
                      },
                      {
                        id: 'OP-2024-007', name: 'PROJETO ALFA', cls: 'CONFIDENCIAL', status: 'ALTA',
                        analistas: 3, score: 71, bar: 'bg-orange-500',
                        color: 'border-orange-700/50 bg-orange-950/10',
                        badge: 'text-orange-400 border-orange-700/50 bg-orange-950/20',
                        tags: ['CORRUPÇÃO', 'SETOR PÚBLICO'],
                        last: 'Última ação: 1h 20min atrás',
                      },
                      {
                        id: 'OP-2024-011', name: 'OPERAÇÃO TEMPESTADE', cls: 'CONFIDENCIAL', status: 'MÉDIA',
                        analistas: 2, score: 43, bar: 'bg-yellow-500',
                        color: 'border-yellow-700/50 bg-yellow-950/10',
                        badge: 'text-yellow-400 border-yellow-700/50 bg-yellow-950/20',
                        tags: ['TRÁFICO', 'REGIONAL'],
                        last: 'Última ação: 3h atrás · Gap detectado',
                      },
                    ].map((op) => (
                      <div key={op.id} className={`rounded border p-3 ${op.color}`}>
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[9px] text-zord-text-muted">{op.id}</span>
                              <span className={`rounded border px-1.5 py-0.5 text-[8px] font-bold ${op.badge}`}>{op.status}</span>
                              <span className="rounded border border-zord-border px-1.5 py-0.5 text-[8px] text-zord-text-muted">{op.cls}</span>
                            </div>
                            <div className="mt-0.5 text-xs font-bold text-zord-text">{op.name}</div>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="font-mono text-lg font-black text-zord-text">{op.score}%</div>
                            <div className="text-[8px] text-zord-text-muted">trust score</div>
                          </div>
                        </div>
                        <div className="mb-2 h-1 w-full rounded-full bg-zord-border/40">
                          <div className={`h-full rounded-full ${op.bar}`} style={{ width: `${op.score}%`, opacity: 0.7 }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {op.tags.map((t) => (
                              <span key={t} className="rounded bg-zord-border/30 px-1.5 py-0.5 text-[8px] text-zord-text-muted">{t}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-[8px] text-zord-text-muted">
                            <span>👤</span><span>{op.analistas} analistas</span>
                          </div>
                        </div>
                        <div className="mt-1 text-[8px] text-zord-text-muted/60">{op.last}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live feed */}
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full bg-red-400 ${pulse ? 'opacity-100' : 'opacity-40'} transition-opacity`} />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">Feed ao Vivo</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { t: '14:38', op: 'NIGHTHAWK', msg: 'Movimentação USD 350k confirmada · conta Suíça', sev: 'CRÍTICO', sc: 'text-red-400 border-red-700/50 bg-red-950/20' },
                      { t: '14:35', op: 'NIGHTHAWK', msg: 'Entidade VORONOV detectada em Dubai e Istambul simultaneamente', sev: 'CRÍTICO', sc: 'text-red-400 border-red-700/50 bg-red-950/20' },
                      { t: '14:22', op: 'ALFA', msg: 'Contrato #2024-089 modificado pós-assinatura · hash alterado', sev: 'ALTO', sc: 'text-orange-400 border-orange-700/50 bg-orange-950/20' },
                      { t: '13:58', op: 'NIGHTHAWK', msg: 'Nova conexão: BLACK SEA TRADING → MIRKA CAPITAL (+$85k)', sev: 'ALTO', sc: 'text-orange-400 border-orange-700/50 bg-orange-950/20' },
                      { t: '13:44', op: 'TEMPESTADE', msg: 'Gap temporal identificado: 22-28 MAI sem registros', sev: 'MÉDIO', sc: 'text-yellow-400 border-yellow-700/50 bg-yellow-950/20' },
                      { t: '13:30', op: 'ALFA', msg: 'Relatório parcial gerado · aguardando aprovação', sev: 'INFO', sc: 'text-zord-text-muted border-zord-border bg-zord-surface/20' },
                    ].map((ev, i) => (
                      <div key={i} className={`rounded border p-2 ${ev.sc}`}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-mono text-[8px] font-bold">{ev.sev}</span>
                          <span className="font-mono text-[8px] opacity-60">{ev.t} · {ev.op}</span>
                        </div>
                        <p className="text-[9px] leading-snug">{ev.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DemoShell>
          )}
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">O Problema</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Desafios da Investigação Moderna</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Cada um desses obstáculos compromete a eficiência operacional e a qualidade do produto de inteligência. O ZORD foi criado para eliminar todos eles.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CHALLENGES.map((c) => (
              <div key={c.title} className="panel cursor-default p-5 transition-all hover:border-zord-accent/40 hover:shadow-lg hover:shadow-zord-accent/5">
                <div className="mb-3 text-2xl text-zord-accent">{c.icon}</div>
                <div className="mb-2 text-xs font-semibold text-zord-text">{c.title}</div>
                <p className="text-[11px] leading-relaxed text-zord-text-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Sua Vantagem Estratégica</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">11 Módulos Integrados em Cada Etapa</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Cada módulo foi projetado para otimizar uma fase do ciclo de inteligência investigativa, desde a coleta de dados até a geração de relatórios estratégicos.
            </p>
          </div>

          {/* Mobile selector */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(i)}
                className={`shrink-0 rounded border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeModule === i
                    ? 'border-zord-accent bg-zord-accent/10 text-zord-accent'
                    : 'border-zord-border text-zord-text-muted'
                }`}
              >
                {m.id}
              </button>
            ))}
          </div>

          <div className="lg:hidden">
            <ModuleCard module={MODULES[activeModule]!} />
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-3 xl:grid-cols-4">
            {MODULES.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Fluxo Operacional</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Da Coleta ao Insight</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Cinco etapas integradas que transformam dados brutos em produtos de inteligência acionáveis.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-zord-accent/50 to-transparent sm:block lg:left-1/2" />

            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Abertura da Investigação',
                  desc: 'O analista cria a investigação, define nível de classificação, atribui equipe e estabelece o escopo. Todos os acessos são auditados.',
                  icon: '⬡',
                },
                {
                  step: '02',
                  title: 'Coleta e Ingestão de Dados',
                  desc: 'Entidades são cadastradas, evidências carregadas no Vault criptografado e fontes avaliadas pelo Trust Engine com a Escala Admiralty.',
                  icon: '◈',
                },
                {
                  step: '03',
                  title: 'Análise e Correlação',
                  desc: 'O Knowledge Graph mapeia conexões entre entidades, o Timeline Engine ordena eventos cronologicamente, e a IA analisa padrões e sugere correlações.',
                  icon: '◉',
                },
                {
                  step: '04',
                  title: 'Formulação de Hipóteses',
                  desc: 'Analistas constroem hipóteses vinculadas a evidências concretas, com score de confiança e workflow estruturado de validação.',
                  icon: '⊕',
                },
                {
                  step: '05',
                  title: 'Geração do Produto de Inteligência',
                  desc: 'Relatórios táticos e estratégicos são gerados automaticamente com toda a cadeia de evidências, prontos para briefing executivo ou ação operacional.',
                  icon: '⊜',
                },
              ].map((step, i) => (
                <div key={step.step} className={`flex gap-6 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="relative flex shrink-0 flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zord-accent/50 bg-zord-accent/10 text-lg text-zord-accent">
                      {step.icon}
                    </div>
                  </div>
                  <div className={`panel flex-1 cursor-default p-5 transition-all hover:border-zord-accent/30 hover:shadow-lg hover:shadow-zord-accent/5 lg:max-w-lg ${i % 2 !== 0 ? 'lg:ml-auto' : ''}`}>
                    <div className="mb-1 text-[10px] font-medium uppercase tracking-widest text-zord-accent">Etapa {step.step}</div>
                    <h3 className="mb-2 text-sm font-semibold text-zord-text">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-zord-text-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MULTI-TENANT */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Arquitetura Multi-Tenant</span>
              <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Segurança e Isolamento Inigualáveis</h2>
              <p className="mt-4 text-sm leading-relaxed text-zord-text-muted">
                O ZORD foi arquitetado para operar múltiplas instituições completamente isoladas em uma única infraestrutura. Cada organização tem seus dados, usuários e configurações separados: <strong className="text-zord-text">nenhum dado vaza entre tenants</strong>. Isso garante a máxima segurança e confidencialidade para suas operações.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Isolamento total de dados por tenant em todas as tabelas',
                  'Portal Super Admin para criação e gestão de instituições',
                  'Planos configuráveis: limites de usuários, investigações e storage',
                  'SSO e MFA configuráveis por instituição',
                  'Logs de auditoria separados por organização',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zord-text-muted">
                    <span className="mt-0.5 text-zord-accent">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="panel p-4">
                <div className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zord-text-muted">Hierarquia de Acesso</div>
                <div className="space-y-2">
                  {[
                    { role: 'SUPER ADMIN', desc: 'Gestão de todas as instituições', color: 'border-red-700/50 bg-red-950/30 text-red-400' },
                    { role: 'TENANT ADMIN', desc: 'Gestão da instituição', color: 'border-orange-700/50 bg-orange-950/30 text-orange-400' },
                    { role: 'ANALYST', desc: 'Criação e análise completa', color: 'border-blue-700/50 bg-blue-950/30 text-blue-400' },
                    { role: 'OPERATOR', desc: 'Execução operacional', color: 'border-green-700/50 bg-green-950/30 text-green-400' },
                    { role: 'VIEWER', desc: 'Leitura somente', color: 'border-zord-border bg-zord-muted/30 text-zord-text-muted' },
                  ].map((r) => (
                    <div key={r.role} className={`flex cursor-default items-center justify-between rounded border px-3 py-2 transition-all hover:scale-[1.01] hover:shadow-sm ${r.color}`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{r.role}</span>
                      <span className="text-[10px]">{r.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-4">
                <div className="mb-3 text-[10px] font-medium uppercase tracking-widest text-zord-text-muted">Isolamento de Dados</div>
                <div className="grid grid-cols-3 gap-2">
                  {['Agência Federal', 'Polícia Civil', 'Ministério Público'].map((inst) => (
                    <div key={inst} className="cursor-default rounded border border-zord-border bg-zord-muted/20 p-2 text-center transition-all hover:border-zord-accent/30 hover:bg-zord-muted/40">
                      <div className="mb-1 text-lg">🏛</div>
                      <div className="text-[9px] font-medium text-zord-text">{inst}</div>
                      <div className="mt-1 text-[8px] text-zord-text-muted">Isolado</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-center text-[9px] text-zord-text-muted">↕ Zero vazamento entre tenants</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Segurança</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Construído para Ambientes Hostis</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Arquitetura de segurança em camadas seguindo OWASP Top 10, Zero Trust e boas práticas militares de proteção da informação.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SECURITY_FEATURES.map((f) => (
              <div key={f.label} className="panel cursor-default p-4 text-center transition-all hover:border-zord-accent/40 hover:shadow-lg hover:shadow-zord-accent/5">
                <div className="mb-2 text-2xl text-zord-accent">{f.icon}</div>
                <div className="text-xs font-semibold text-zord-text">{f.label}</div>
                <div className="mt-1 text-[10px] text-zord-text-muted">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Stack Tecnológico</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Tecnologias de Produção</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Next.js 15', role: 'Frontend', color: 'text-white' },
              { name: 'NestJS 10', role: 'Backend', color: 'text-red-400' },
              { name: 'PostgreSQL 16', role: 'Database', color: 'text-blue-400' },
              { name: 'Neo4j 5', role: 'Graph DB', color: 'text-green-400' },
              { name: 'Redis 7', role: 'Cache / Queue', color: 'text-red-300' },
              { name: 'OpenSearch 2', role: 'Full-text Search', color: 'text-yellow-400' },
              { name: 'MinIO', role: 'Object Storage', color: 'text-pink-400' },
              { name: 'Prisma 6', role: 'ORM', color: 'text-teal-400' },
              { name: 'Docker', role: 'Containers', color: 'text-blue-300' },
              { name: 'Turborepo', role: 'Monorepo', color: 'text-cyan-400' },
              { name: 'GPT-4 & Claude', role: 'Camada de IA', color: 'text-purple-400' },
              { name: 'PM2', role: 'Process Manager', color: 'text-orange-400' },
            ].map((t) => (
              <div key={t.name} className="panel cursor-default p-3 text-center transition-all hover:scale-[1.03] hover:border-zord-accent/30">
                <div className={`text-xs font-semibold ${t.color}`}>{t.name}</div>
                <div className="mt-0.5 text-[10px] text-zord-text-muted">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Planos</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Para Cada Escala de Operação</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`panel relative p-5 transition-all hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 ${p.highlight ? 'border-purple-700/50 bg-purple-950/10 hover:border-purple-600/60' : 'hover:border-zord-accent/30'}`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-purple-700/50 bg-purple-900/80 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-300">
                    Mais popular
                  </div>
                )}
                <div className={`text-[10px] font-bold uppercase tracking-widest ${p.accent}`}>{p.name}</div>
                <div className="mt-1 text-sm text-zord-text-muted">{p.label}</div>
                <div className="mt-3">
                  <span className="text-2xl font-black text-zord-text">{p.price}</span>
                  {p.period && <span className="text-xs text-zord-text-muted">{p.period}</span>}
                </div>
                <ul className="mt-4 space-y-2 border-t border-zord-border pt-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-zord-text-muted">
                      <span className={p.accent}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:comercial@zord.pro"
                  className={`mt-5 block w-full rounded border py-2 text-center text-xs font-medium transition-colors ${
                    p.highlight
                      ? 'border-purple-700/50 bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
                      : 'border-zord-border text-zord-text-muted hover:border-zord-accent hover:text-zord-text'
                  }`}
                >
                  Solicitar acesso
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zord-accent/30 bg-zord-accent/5 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zord-accent" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Demonstração Personalizada</span>
          </div>
          <h2 className="text-3xl font-black text-zord-text sm:text-4xl">
            Pronto para Elevar Suas Capacidades de Investigação?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-zord-text-muted">
            Solicite uma demonstração personalizada e descubra como o ZORD Intelligence Operating System pode revolucionar suas operações de inteligência investigativa.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:comercial@zord.pro"
              className="w-full rounded bg-zord-accent px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Solicitar Demonstração
            </a>
            <Link
              href={`/${locale}/login`}
              className="w-full rounded border border-zord-border px-8 py-3 text-sm font-medium text-zord-text-muted transition-colors hover:border-zord-accent hover:text-zord-text sm:w-auto"
            >
              Acessar Sistema
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zord-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-zord-accent">
                <span className="text-[10px] font-black text-white">Z</span>
              </div>
              <span className="text-xs font-bold text-zord-text">ZORD Intelligence OS</span>
            </div>
            <div className="text-[10px] text-zord-text-muted">
              © 2026 ZORD. Uso exclusivo para organizações autorizadas.
            </div>
            <div className="flex gap-4">
              <span className="text-[10px] text-zord-text-muted">CLASSIFICATION: UNCLASSIFIED</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DemoShell({
  title,
  badge,
  badgeColor,
  pulse,
  children,
}: {
  title: string
  badge: string
  badgeColor: string
  pulse: boolean
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-zord-border shadow-2xl shadow-black/40">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-zord-border bg-zord-surface/80 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-[10px] text-zord-text-muted tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${pulse ? 'opacity-100' : 'opacity-30'} transition-opacity ${badgeColor.replace('text-', 'bg-')}`} />
          <span className={`font-mono text-[9px] font-bold ${badgeColor}`}>{badge}</span>
        </div>
      </div>
      {children}
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-6 w-px bg-gradient-to-b from-zord-accent/50 to-zord-accent/20" />
      <div className="text-zord-accent/50 text-xs">▼</div>
    </div>
  )
}

function ModuleCard({ module: m }: { module: typeof MODULES[0] }) {
  return (
    <div className={`panel bg-gradient-to-br p-5 transition-all hover:scale-[1.01] ${m.color}`}>
      <div className="mb-3 flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border text-xl ${m.color}`}>
          <span className={m.accent}>{m.icon}</span>
        </div>
        <div>
          <div className={`text-[10px] font-bold uppercase tracking-widest ${m.accent}`}>{m.id}</div>
          <div className="text-xs font-semibold text-zord-text">{m.name}</div>
        </div>
      </div>
      <div className={`mb-1 text-[9px] font-medium uppercase tracking-wider ${m.accent} opacity-70`}>{m.subtitle}</div>
      <p className="mb-3 text-[11px] leading-relaxed text-zord-text-muted">{m.desc}</p>
      <ul className="space-y-1">
        {m.features.map((f) => (
          <li key={f} className={`flex items-center gap-1.5 text-[10px] ${m.accent}`}>
            <span>◆</span>
            <span className="text-zord-text-muted">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

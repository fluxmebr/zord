'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

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
          <div className="flex items-center gap-2">
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

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:py-32">
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
            Transforme Dados Brutos em Inteligência Acionável.<br className="hidden sm:block" /> Otimize Suas Investigações.
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

      {/* CHALLENGES */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">O Problema</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Desafios da Investigação Moderna</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Cada um desses obstáculos compromete a eficiência operacional e a qualidade do produto de inteligência. O ZORD foi criado para eliminar todos eles.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CHALLENGES.map((c) => (
              <div key={c.title} className="panel p-5">
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
        <div className="mx-auto max-w-7xl px-4">
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

          <div className="hidden grid-cols-3 gap-4 xl:grid-cols-4 lg:grid">
            {MODULES.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4">
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
                  <div className={`panel flex-1 p-5 lg:max-w-lg ${i % 2 !== 0 ? 'lg:ml-auto' : ''}`}>
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
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Arquitetura Multi-Tenant</span>
              <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Segurança e Isolamento Inigualáveis</h2>
              <p className="mt-4 text-sm leading-relaxed text-zord-text-muted">
                O ZORD foi arquitetado para operar múltiplas instituições completamente isoladas em uma única infraestrutura. Cada organização tem seus dados, usuários e configurações separados — <strong className="text-zord-text">nenhum dado vaza entre tenants</strong>. Isso garante a máxima segurança e confidencialidade para suas operações.
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
                    <div key={r.role} className={`flex items-center justify-between rounded border px-3 py-2 ${r.color}`}>
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
                    <div key={inst} className="rounded border border-zord-border bg-zord-muted/20 p-2 text-center">
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
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Segurança</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Construído para Ambientes Hostis</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Arquitetura de segurança em camadas seguindo OWASP Top 10, Zero Trust e boas práticas militares de proteção da informação.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SECURITY_FEATURES.map((f) => (
              <div key={f.label} className="panel p-4 text-center">
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
        <div className="mx-auto max-w-7xl px-4">
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
              <div key={t.name} className="panel p-3 text-center">
                <div className={`text-xs font-semibold ${t.color}`}>{t.name}</div>
                <div className="mt-0.5 text-[10px] text-zord-text-muted">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Planos</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Para Cada Escala de Operação</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`panel relative p-5 ${p.highlight ? 'border-purple-700/50 bg-purple-950/10' : ''}`}
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
        <div className="mx-auto max-w-3xl px-4 text-center">
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
        <div className="mx-auto max-w-7xl px-4">
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

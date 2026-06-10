'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const MODULES = [
  {
    id: '01',
    name: 'Investigation Core',
    icon: '⬡',
    color: 'from-blue-600/20 to-blue-900/10 border-blue-700/40',
    accent: 'text-blue-400',
    desc: 'Central operations hub. Create, assign and monitor complex investigations with full audit trail, evidence chain and multi-analyst collaboration.',
    features: ['Multi-analyst workspace', 'Full audit trail', 'Evidence chain of custody', 'Classification levels'],
  },
  {
    id: '02',
    name: 'Entity Engine',
    icon: '◈',
    color: 'from-purple-600/20 to-purple-900/10 border-purple-700/40',
    accent: 'text-purple-400',
    desc: 'Build comprehensive profiles of individuals, organizations, assets and locations. Cross-reference entities across all investigations.',
    features: ['Person & org profiles', 'Asset tracking', 'Cross-investigation links', 'Alias management'],
  },
  {
    id: '03',
    name: 'Knowledge Graph',
    icon: '◉',
    color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-700/40',
    accent: 'text-cyan-400',
    desc: 'Interactive Neo4j-powered graph canvas. Visualize connections, map networks of influence and discover hidden relationships.',
    features: ['Interactive canvas', 'Network clustering', 'Shortest path analysis', 'Influence scoring'],
  },
  {
    id: '04',
    name: 'Timeline Engine',
    icon: '⊞',
    color: 'from-green-600/20 to-green-900/10 border-green-700/40',
    accent: 'text-green-400',
    desc: 'Chronological intelligence mapping. Plot events, correlate activities and identify behavioral patterns over time.',
    features: ['Multi-source timeline', 'Pattern detection', 'Temporal correlation', 'Event clustering'],
  },
  {
    id: '05',
    name: 'Evidence Vault',
    icon: '⊟',
    color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-700/40',
    accent: 'text-yellow-400',
    desc: 'Secure encrypted storage for all evidence. Upload, tag, version and maintain chain of custody for documents, images and multimedia.',
    features: ['AES-256 encryption', 'Chain of custody', 'OCR extraction', 'Metadata analysis'],
  },
  {
    id: '06',
    name: 'Hypothesis Engine',
    icon: '⊕',
    color: 'from-orange-600/20 to-orange-900/10 border-orange-700/40',
    accent: 'text-orange-400',
    desc: 'Scientific hypothesis management. Build theories, assign evidence, score trust levels and track validation progress.',
    features: ['Theory building', 'Evidence linkage', 'Trust scoring', 'Validation workflow'],
  },
  {
    id: '07',
    name: 'Intelligence AI',
    icon: '⬢',
    color: 'from-pink-600/20 to-pink-900/10 border-pink-700/40',
    accent: 'text-pink-400',
    desc: 'AI-powered analysis using GPT-4 and Claude. Auto-summarize evidence, identify patterns and generate actionable intelligence reports.',
    features: ['GPT-4 & Claude integration', 'Auto-summarization', 'Pattern recognition', 'Natural language queries'],
  },
  {
    id: '08',
    name: 'Operations Center',
    icon: '⊗',
    color: 'from-red-600/20 to-red-900/10 border-red-700/40',
    accent: 'text-red-400',
    desc: 'Operational task management. Assign missions, track field teams, manage deadlines and coordinate multi-team operations.',
    features: ['Task assignment', 'Priority matrix', 'Team coordination', 'Deadline tracking'],
  },
  {
    id: '09',
    name: 'Report Generator',
    icon: '⊜',
    color: 'from-indigo-600/20 to-indigo-900/10 border-indigo-700/40',
    accent: 'text-indigo-400',
    desc: 'Professional intelligence report generation. Templates for tactical, strategic and executive briefings with automatic classification marking.',
    features: ['Custom templates', 'Auto classification', 'PDF/DOCX export', 'Executive briefs'],
  },
  {
    id: '10',
    name: 'Trust Engine',
    icon: '⬟',
    color: 'from-teal-600/20 to-teal-900/10 border-teal-700/40',
    accent: 'text-teal-400',
    desc: 'Source and intelligence reliability scoring. Apply Admiralty Scale to evaluate and track the credibility of information and sources.',
    features: ['Admiralty Scale', 'Source reliability', 'Information credibility', 'Historical tracking'],
  },
  {
    id: '11',
    name: 'Gap Detection',
    icon: '◬',
    color: 'from-amber-600/20 to-amber-900/10 border-amber-700/40',
    accent: 'text-amber-400',
    desc: 'Identify intelligence gaps and collection requirements. Prioritize what is unknown and direct resources to critical information needs.',
    features: ['Gap mapping', 'Collection requirements', 'Priority scoring', 'Coverage analysis'],
  },
]

const SECURITY_FEATURES = [
  { icon: '⬡', label: 'MFA TOTP', desc: 'Two-factor authentication for all accounts' },
  { icon: '⊞', label: 'JWT HttpOnly', desc: 'Tokens stored only in secure cookies' },
  { icon: '◈', label: 'RBAC 5 roles', desc: 'Granular permissions per role' },
  { icon: '◉', label: 'Multi-tenant', desc: 'Complete data isolation per institution' },
  { icon: '⊟', label: 'AES-256', desc: 'Sensitive data encrypted at rest' },
  { icon: '⬢', label: 'TLS 1.3', desc: 'All traffic encrypted in transit' },
  { icon: '⊕', label: 'Audit Log', desc: 'Every action recorded immutably' },
  { icon: '⊗', label: 'Rate Limiting', desc: 'DDoS and brute-force protection' },
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
    features: ['Ilimitado', 'Ilimitado', 'Ilimitado', 'SLA + suporte dedicado'],
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
              Entrar
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
        {/* Grid background */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zord-bg" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zord-accent/30 bg-zord-accent/5 px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zord-accent" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Sistema Operacional de Inteligência</span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-none tracking-tight text-zord-text sm:text-6xl lg:text-7xl">
            ZORD
            <span className="block text-xl font-light tracking-[0.3em] text-zord-text-muted sm:text-3xl">
              INTELLIGENCE OPERATING SYSTEM
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-zord-text-muted sm:text-base">
            Plataforma militar de inteligência investigativa para agências de segurança, forças policiais e equipes de contra-inteligência.
            11 módulos integrados. Multi-tenant. Segurança de nível corporativo.
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

          {/* Stats */}
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

      {/* MODULES */}
      <section className="border-b border-zord-border py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Módulos do Sistema</span>
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">11 Capacidades Integradas</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zord-text-muted">
              Cada módulo foi projetado para fluxos reais de inteligência investigativa, integrados em um único sistema coeso.
            </p>
          </div>

          {/* Module selector — mobile */}
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

          {/* Mobile single module */}
          <div className="lg:hidden">
            <ModuleCard module={MODULES[activeModule]!} />
          </div>

          {/* Desktop grid */}
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
            <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Como o ZORD Funciona</h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-[19px] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-zord-accent/50 to-transparent sm:block lg:left-1/2" />

            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Abertura da Investigação',
                  desc: 'O analista cria uma investigação, define nível de classificação, atribui equipe e estabelece o escopo inicial. Todos os acessos são registrados.',
                  icon: '⬡',
                },
                {
                  step: '02',
                  title: 'Coleta e Ingestão de Dados',
                  desc: 'Entidades são cadastradas, evidências são carregadas no Vault criptografado, fontes são avaliadas pelo Trust Engine com escala Admiralty.',
                  icon: '◈',
                },
                {
                  step: '03',
                  title: 'Análise e Correlação',
                  desc: 'O Knowledge Graph mapeia conexões entre entidades. O Timeline Engine ordena eventos. A IA analisa padrões e sugere correlações não óbvias.',
                  icon: '◉',
                },
                {
                  step: '04',
                  title: 'Formulação de Hipóteses',
                  desc: 'Analistas constroem hipóteses vinculadas a evidências. Cada hipótese recebe score de confiança e passa por workflow de validação.',
                  icon: '⊕',
                },
                {
                  step: '05',
                  title: 'Geração de Produto de Inteligência',
                  desc: 'Relatórios táticos ou estratégicos são gerados automaticamente com toda a cadeia de evidências, prontos para briefing executivo ou ação operacional.',
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
                    <div className="mb-1 text-[10px] font-medium uppercase tracking-widest text-zord-accent">Passo {step.step}</div>
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
              <h2 className="mt-2 text-2xl font-bold text-zord-text sm:text-3xl">Uma Plataforma, Múltiplas Instituições</h2>
              <p className="mt-4 text-sm leading-relaxed text-zord-text-muted">
                O ZORD foi arquitetado para operar múltiplas instituições completamente isoladas em uma única infraestrutura. Cada organização tem seus dados, usuários e configurações separados — nenhum dado vaza entre tenants.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Isolamento total de dados por tenant via tenantId em todas as tabelas',
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
              {/* Architecture diagram */}
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
                  {['Instituição A', 'Instituição B', 'Instituição C'].map((inst, i) => (
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
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Segurança 2026</span>
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
              { name: 'OpenAI / Claude', role: 'AI Layer', color: 'text-purple-400' },
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
            <span className="text-[10px] font-medium uppercase tracking-widest text-zord-accent">Acesso Restrito</span>
          </div>
          <h2 className="text-3xl font-black text-zord-text sm:text-4xl">Pronto para Elevar o Nível da sua Operação?</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-zord-text-muted">
            O ZORD é disponibilizado exclusivamente para agências governamentais, forças de segurança e organizações de inteligência credenciadas.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:comercial@zord.pro"
              className="w-full rounded bg-zord-accent px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              Entrar em Contato
            </a>
            <Link
              href={`/${locale}/login`}
              className="w-full rounded border border-zord-border px-8 py-3 text-sm font-medium text-zord-text-muted transition-colors hover:border-zord-accent hover:text-zord-text sm:w-auto"
            >
              Login Operacional
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

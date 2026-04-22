import { type MouseEvent, useState } from 'react';
import { ExternalLink, Mail, Calendar, Trophy, Users, Download } from 'lucide-react';
import CursorHalo from './components/CursorHalo';

const GithubIcon = ({size = 20}: {size?: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 4.9 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const InstagramIcon = ({size = 20}: {size?: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({size = 20}: {size?: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-display text-7xl font-bold text-amber-500/[0.07] select-none leading-none">{number}</span>
      <h2 className="font-display text-3xl font-bold text-white tracking-tight">{title}</h2>
    </div>
  );
}

type Project = {
  title: string;
  href: string | undefined;
  body: string;
  sub: Array<{ label: string; text: string }>;
  tags: string[];
};

const cubiktechProjects: Project[] = [
  {
    title: "Agile Receivables Platform",
    href: "https://agilereceivables.com/",
    body: "Led backend development of a multi-tenant AWS system, architecting event-driven workflows (FastAPI, SQS, EventBridge) for asynchronous task orchestration. Implemented strict data isolation (Twilio, AWS SES) with RBAC, Stripe integration, and AI voice agents (Retell, Cartesia). Built an invoice syncing engine integrating QuickBooks and Xero APIs to eliminate manual entry.",
    sub: [],
    tags: ["FastAPI", "SQS", "EventBridge", "Stripe", "Twilio", "Retell"],
  },
  {
    title: "AI Agentic Framework",
    href: undefined as string | undefined,
    body: "Engineered a modular backend orchestrating 20+ specialized AI agents for semantic search and GraphRAG operations (pgvector, Neo4j).",
    sub: [],
    tags: ["Python", "pgvector", "Neo4j", "GraphRAG"],
  },
  {
    title: "Stateful AI Sales Agent",
    href: undefined as string | undefined,
    body: "Developed a WhatsApp bot (n8n, OpenAI, LangChain) qualifying leads via the SPIN framework, using Supabase for conversational memory.",
    sub: [],
    tags: ["n8n", "OpenAI", "LangChain", "Supabase"],
  },
  {
    title: "GST Manager App",
    href: "https://gstmanager.com/",
    body: "Developed a cross-platform Flutter app for B2B tax management using GetX and Dart. Integrated Razorpay for SaaS billing, secure JWT lifecycles, and Firebase Cloud Messaging.",
    sub: [],
    tags: ["Flutter", "Dart", "GetX", "Razorpay", "Firebase"],
  },
];

function CubiktechProjects() {
  const [active, setActive] = useState(0);
  const p = cubiktechProjects[active];
  return (
    <div className="rounded-xl border border-gray-800/60 overflow-hidden">
      {/* Mobile: scrollable top tabs */}
      <div className="flex md:hidden overflow-x-auto border-b border-gray-800/60">
        {cubiktechProjects.map((proj, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`interactive-lift flex-shrink-0 px-3 py-2.5 text-xs font-medium transition-colors border-r border-gray-800/40 last:border-r-0 ${
              active === i ? 'text-amber-400 bg-amber-500/[0.08]' : 'text-gray-500 hover:text-gray-300'
            }`}
          >{proj.title}</button>
        ))}
      </div>
      <div className="flex">
        {/* Desktop: left nav */}
        <div className="hidden md:flex flex-col w-48 flex-shrink-0">
          {cubiktechProjects.map((proj, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={active === i ? { boxShadow: 'inset 2px 0 0 rgb(245 158 11 / 0.7)' } : undefined}
              className={`interactive-lift text-left px-4 py-3.5 text-xs font-medium transition-all border-b border-r border-gray-800/60 last:border-b-0 leading-snug ${
                active === i ? 'text-amber-400 bg-amber-500/[0.06]' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900/30'
              }`}
            >{proj.title}</button>
          ))}
        </div>
        {/* Content panel */}
        <div className="flex-1 p-5 bg-gray-900/20 min-h-55">
          <div className="mb-3">
            {p.href ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer"
                className="interactive-lift font-semibold text-base text-gray-100 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                {p.title} <ExternalLink size={13} className="text-amber-500/50" />
              </a>
            ) : (
              <span className="font-semibold text-base text-gray-100">{p.title}</span>
            )}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
          {p.sub.length > 0 && (
            <div className="mt-3 ml-3 pl-3 border-l border-gray-800 space-y-1.5">
              {p.sub.map((s, i) => (
                <p key={i} className="text-gray-500 text-xs leading-relaxed">
                  <span className="text-gray-400 font-medium">{s.label} — </span>{s.text}
                </p>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {p.tags.map(tag => (
              <span key={tag} className="font-mono text-xs text-amber-400/60 bg-amber-950/20 border border-amber-900/20 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const projectCardBase =
  'interactive-lift group flex flex-col bg-gray-900/30 hover:bg-gray-900/60 border border-gray-800/40 border-l-2 border-l-amber-500/20 hover:border-l-amber-500 rounded-r-xl p-5 transition-all';

function App() {
  const emailAddress = 'azverndias09@gmail.com';
  const contactSubject = 'Portfolio Inquiry';
  const contactMailto = `mailto:${emailAddress}?subject=${encodeURIComponent(contactSubject)}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(contactSubject)}`;

  const handleContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    window.location.href = contactMailto;

    window.setTimeout(() => {
      if (document.visibilityState === 'visible' && document.hasFocus()) {
        window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen pb-32">
      <CursorHalo />
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-28">

        {/* Hero */}
        <header className="flex flex-col md:flex-row gap-10 md:gap-16 items-start justify-between">
          <div className="flex-1 space-y-7">
            <div className="space-y-4">
              <div className="pb-5 border-b border-amber-500/30">
                <h1 className="font-display text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
                  Azvern Dias
                </h1>
              </div>
              <p className="text-xl text-amber-400 font-medium">Backend Engineer & AI Integrator</p>
              <p className="text-gray-400 leading-relaxed max-w-xl">
                Specializing in event-driven architectures, multi-tenant FastAPI backends, and AI integrations on AWS. I combine robust engineering with a creative background in 3D design, cinematography and VFX to deliver scalable, user-centric systems.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/azverndias09"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-lift flex items-center gap-2 text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition-all px-4 py-2 rounded-lg text-sm font-medium"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/azverndias0912"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-lift flex items-center gap-2 text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition-all px-4 py-2 rounded-lg text-sm font-medium"
              >
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/azz.create/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-lift flex items-center gap-2 text-gray-300 hover:text-white bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition-all px-4 py-2 rounded-lg text-sm font-medium"
              >
                <InstagramIcon size={16} />
                Creative
              </a>
              <a
                href={contactMailto}
                onClick={handleContactClick}
                className="interactive-lift flex items-center gap-2 text-gray-950 bg-amber-500 hover:bg-amber-400 transition-all px-5 py-2 rounded-lg text-sm font-semibold"
              >
                <Mail size={16} />
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                className="interactive-lift flex items-center gap-2 text-amber-400 hover:text-amber-300 border border-amber-900/60 hover:border-amber-700/60 hover:bg-amber-950/30 transition-all px-4 py-2 rounded-lg text-sm font-medium"
              >
                <Download size={16} />
                Resume
              </a>
            </div>
          </div>
          <div className="shrink-0 order-first md:order-last">
            <img
              src="/me.jpg"
              alt="Azvern Dias"
              className="w-32 h-32 md:w-44 md:h-44 rounded-xl object-cover ring-1 ring-amber-500/30"
            />
          </div>
        </header>

        {/* Experience */}
        <section className="space-y-10">
          <SectionHeader number="01" title="Experience" />

          <div className="space-y-10">
            {/* Cubiktech */}
            <div className="group relative pl-8 border-l-2 border-gray-800 hover:border-amber-500/40 transition-colors pb-8">
              <div className="absolute w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-gray-950 -left-2 top-1.5"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-100">Backend Engineer</h3>
                  <p className="text-amber-400 font-medium flex items-center gap-1.5">
                    Cubiktech
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs bg-gray-900/60 px-3 py-1 rounded-full border border-gray-800 w-fit">
                  <Calendar size={12} />
                  June 2025 – Present
                </div>
              </div>
              <CubiktechProjects />
            </div>

            {/* TP Sports Arena */}
            <div className="group relative pl-8 border-l-2 border-gray-800 hover:border-amber-500/40 transition-colors pb-8">
              <div className="absolute w-3.5 h-3.5 rounded-full bg-gray-900 border-2 border-gray-700 group-hover:border-amber-500/60 transition-colors -left-[8px] top-1.5"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-100">Freelancer</h3>
                  <a href="https://www.tpsports.in/" target="_blank" rel="noopener noreferrer" className="interactive-lift text-amber-400 font-medium hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    TP Sports Arena
                    <ExternalLink size={13} className="text-amber-500/50" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs bg-gray-900/60 px-3 py-1 rounded-full border border-gray-800 w-fit">
                  <Calendar size={12} />
                  2025
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="text-amber-500/50 mr-2">—</span>Built a high-concurrency reservation platform with race-condition-safe time-slot locking, dual validation, and a state-driven booking system integrating PhonePe webhooks, automated refunds, and Google Calendar sync using Next.js and Firebase.
              </p>
            </div>

            {/* Minor roles */}
            <div className="relative pl-8 border-l-2 border-gray-800">
              <div className="absolute w-3.5 h-3.5 rounded-full bg-gray-900 border-2 border-gray-700 -left-[8px] top-1.5"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-display text-base font-bold text-gray-200">Software Engineering Intern</h3>
                  <p className="text-amber-400 text-sm font-medium">Sequalize <span className="text-gray-600 font-mono">· 2024</span></p>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">Developed a scalable event management platform using Flutter and Supabase with real-time messaging and access control.</p>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-gray-200">Software Engineer</h3>
                  <p className="text-amber-400 text-sm font-medium">Nexocide <span className="text-gray-600 font-mono">· 2022–2023</span></p>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">Contributed to 3D multiplayer backend mechanics (Unreal Engine) and freelanced a live e-commerce tourism app.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <SectionHeader number="02" title="Projects" />
            <a
              href="https://github.com/azverndias09"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-lift text-amber-500/60 hover:text-amber-400 text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              All repos on GitHub <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1 — featured full width */}
            <a
              href="https://github.com/azverndias09/GeneticCarLearner"
              target="_blank"
              rel="noopener noreferrer"
              className={`${projectCardBase} md:col-span-3 md:flex-row md:items-center md:gap-6`}
            >
              <div className="md:flex-none">
                <h3 className="font-display text-lg font-bold text-gray-100 group-hover:text-amber-300 transition-colors">Genetic Car Learner</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-grow mt-2 md:mt-0">Implements NEAT (NeuroEvolution of Augmenting Topologies) to evolve a neural network that learns autonomous driving from scratch — no hardcoded rules.</p>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0 shrink-0">
                <span className="font-mono text-xs text-amber-400/70 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded">Python</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">NEAT</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">AI</span>
              </div>
            </a>

            {/* Row 2 — three equal hackathon winners */}
            <a
              href="https://github.com/azverndias09/car-pool"
              target="_blank"
              rel="noopener noreferrer"
              className={projectCardBase}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg font-bold text-gray-100 group-hover:text-amber-300 transition-colors">RideShare</h3>
                <span className="bg-amber-500 text-gray-950 text-xs font-bold px-2 py-0.5 rounded shrink-0 ml-2">1st Place</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-grow">Carpooling logistics app that clusters overlapping routes and matches riders in real time. Winner at PCCE Hackathon.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="font-mono text-xs text-amber-400/70 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded">Python</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">Fullstack</span>
              </div>
            </a>

            <a
              href="https://github.com/azverndias09/nutri-scan"
              target="_blank"
              rel="noopener noreferrer"
              className={projectCardBase}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg font-bold text-gray-100 group-hover:text-amber-300 transition-colors">NutriScan</h3>
                <span className="bg-amber-500 text-gray-950 text-xs font-bold px-2 py-0.5 rounded shrink-0 ml-2">1st Place</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-grow">Scans food labels and parses nutritional data in real time using computer vision. Winner at IT Dept Hackathon.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="font-mono text-xs text-amber-400/70 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded">C++</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">CV</span>
              </div>
            </a>

            <a
              href="https://github.com/azverndias09/virtual_engineer"
              target="_blank"
              rel="noopener noreferrer"
              className={projectCardBase}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display text-lg font-bold text-gray-100 group-hover:text-amber-300 transition-colors">Virtual Engineer</h3>
                <span className="bg-amber-500 text-gray-950 text-xs font-bold px-2 py-0.5 rounded shrink-0 ml-2">1st Place</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed flex-grow">Hardware-software bridge built for IEEE hackathon - Flutter app communicating with embedded C++ firmware in real time.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="font-mono text-xs text-amber-400/70 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded">Flutter</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">C++</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">IEEE</span>
              </div>
            </a>
          </div>
        </section>

        {/* Leadership & Hackathons */}
        <section className="space-y-10">
          <SectionHeader number="03" title="Hackathons & Leadership" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Leadership */}
            <div className="space-y-7">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-800/60">
                <Users size={15} className="text-amber-500/70" />
                <h3 className="font-display font-bold text-gray-200 text-sm uppercase tracking-wider">Community Leadership</h3>
              </div>
              <div className="space-y-8">
                <div className="relative pl-5 border-l border-gray-800 hover:border-amber-500/40 transition-colors">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-gray-950 -left-[6px] top-1"></div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-gray-200 leading-snug">Co-founder, ARM Robotics</h4>
                    <a href="https://arms--xi.vercel.app/" target="_blank" rel="noopener noreferrer" className="interactive-lift shrink-0 text-xs font-mono text-amber-500/60 hover:text-amber-400 transition-colors mt-0.5">ARM Website ↗</a>
                  </div>
                  <p className="text-gray-500 mt-1.5 text-sm leading-relaxed">Co-founded and managed a robotics club with 400+ members and gave talk sessions and self-hosted workshops in college, orphanages, and village schools - bringing hands-on robotics education beyond campus.</p>
                </div>
                <div className="relative pl-5 border-l border-gray-800 hover:border-amber-500/40 transition-colors">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-gray-950 -left-[6px] top-1"></div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-gray-200 leading-snug">President, Coder's Club</h4>
                    <a href="https://www.geccoders.club/" target="_blank" rel="noopener noreferrer" className="interactive-lift shrink-0 text-xs font-mono text-amber-500/60 hover:text-amber-400 transition-colors mt-0.5">Coder's Club Website ↗</a>
                  </div>
                  <p className="text-gray-500 mt-1.5 text-sm leading-relaxed">Led and managed a student technical community, organizing workshops, coding sessions, and large-scale events.</p>
                </div>
                <div className="relative pl-5 border-l border-gray-800 hover:border-amber-500/40 transition-colors">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-gray-700 border-2 border-gray-950 -left-[6px] top-1"></div>
                  <h4 className="font-display font-bold text-gray-300 leading-snug">Lead-Coordinator, Spectrathon 2024</h4>
                  <span className="text-xs font-mono text-amber-500/60 mt-0.5 inline-block">National Level</span>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed">Coordinated a national-level hackathon hosting 50+ participating teams, managing logistics and technical requirements.</p>
                </div>
                <div className="relative pl-5 border-l border-gray-800 hover:border-amber-500/40 transition-colors">
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-gray-700 border-2 border-gray-950 -left-[6px] top-1"></div>
                  <h4 className="font-display font-bold text-gray-300 leading-snug">Lead-Coordinator, Technothon 2023 & 2024</h4>
                  <span className="text-xs font-mono text-amber-500/60 mt-0.5 inline-block">State Level</span>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed">Organized consecutive state-level hackathons fostering regional innovation and competitive programming across colleges.</p>
                </div>
              </div>
            </div>

            {/* Hackathon Standings */}
            <div className="space-y-7">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-800/60">
                <Trophy size={15} className="text-amber-500/70" />
                <h3 className="font-display font-bold text-gray-200 text-sm uppercase tracking-wider">Hackathon Standings</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-600 mb-3">Winners - 1st Place</p>
                  <div className="space-y-3">
                    {['Technothon 2022', 'Promotheus 25', 'AISPIRE IEEE'].map((name) => (
                      <div key={name} className="flex items-center gap-4">
                        <span className="font-display text-xl font-bold text-amber-500 w-9 shrink-0 leading-none">1st</span>
                        <span className="text-gray-200 text-sm font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-600 mb-3">Runners-up - 2nd Place</p>
                  <div className="space-y-2.5">
                    {['Inspirathon 2023', 'Inspirathon 2024', 'Retrothon 2025'].map((name) => (
                      <div key={name} className="flex items-center gap-4">
                        <span className="font-display text-xl font-bold text-gray-600 w-9 shrink-0 leading-none">2nd</span>
                        <span className="text-gray-400 text-sm">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-8">
          <SectionHeader number="04" title="Technical Arsenal" />
          <div>
            {[
              { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C/C++', 'Dart', 'SQL'] },
              { label: 'Frameworks', items: ['FastAPI', 'Next.js', 'React', 'Flutter', 'Node.js', 'Express'] },
              { label: 'Backend', items: ['PostgreSQL', 'Redis', 'Neo4j', 'Supabase', 'Firebase', 'Stripe', 'Twilio', 'QuickBooks', 'Xero'] },
              { label: 'Cloud', items: ['AWS (Lambda, SQS, EventBridge, SES, Bedrock, RDS, EC2, KMS)', 'Docker', 'Terraform'] },
              { label: 'AI & Automation', items: ['n8n', 'LangChain', 'CrewAI', 'OpenAI', 'Retell', 'pgvector'] },
            ].map(({ label, items }) => (
              <div key={label} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-5 border-b border-gray-800/40">
                <span className="font-display font-bold text-amber-400 text-xs uppercase tracking-widest w-24 shrink-0">{label}</span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;

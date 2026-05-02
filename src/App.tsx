import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Mail, Calendar, Trophy, Users, Download, Menu, X } from 'lucide-react';
import CursorHalo from './components/CursorHalo';

const sectionNavItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'skills', label: 'Skills' },
  { id: 'freelance', label: 'Freelance' },
] as const;

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
    body: "Led backend development of a multi-tenant AWS receivables platform designed for concurrent multi-tenant scale.",
    sub: [
      { label: "Campaign Engine", text: "Architected an event-driven campaign engine (SQS, EventBridge) for asynchronous multi-channel campaign orchestration and webhook processing across isolated tenant environments." },
      { label: "Payments", text: "Built Stripe and Stripe Connect integration for subscription management, automated payment workflows, and multi-tenant payment routing; enforced data isolation with RBAC, AWS KMS, Twilio subaccounts, and SES — zero cross-tenant leakage by design." },
      { label: "AI Voice Agents", text: "Deployed automated AI voice call agents (Retell, Cartesia) for outbound debt collection workflows, reducing manual follow-up overhead." },
      { label: "Accounting Sync", text: "Built a QuickBooks/Xero sync engine architected for 10,000+ invoice operations, eliminating manual reconciliation — validated through client onboarding demos." },
    ],
    tags: ["FastAPI", "SQS", "EventBridge", "Stripe Connect", "Twilio", "Retell"],
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
    body: "Built an automated WhatsApp sales agent (n8n, OpenAI, LangChain) with intent classification, next-best-action recommendations, and graph memory for contextual intelligence — qualifying leads via the SPIN framework to drive calendar bookings, with Supabase for conversational state.",
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
  const tabsRef = useRef<HTMLDivElement>(null);
  
  const handleTabClick = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    setActive(i);
    if (tabsRef.current) {
      const button = e.currentTarget;
      const container = tabsRef.current;
      // Scroll active tab to left edge, leaving a small peek of the previous tab
      container.scrollTo({ left: Math.max(0, button.offsetLeft - 8), behavior: 'smooth' });
    }
  };

  const p = cubiktechProjects[active];
  return (
    <div className="rounded-xl border border-gray-800/60 overflow-hidden">
      {/* Mobile: scrollable top tabs */}
      <div className="md:hidden relative border-b border-gray-800/60">
        <div
          ref={tabsRef}
          className="flex overflow-x-auto scrollbar-hide no-scrollbar custom-scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cubiktechProjects.map((proj, i) => (
            <button
              key={i}
              onClick={(e) => handleTabClick(i, e)}
              className={`interactive-lift whitespace-nowrap flex-shrink-0 px-4 py-3 text-xs font-medium transition-colors border-r border-gray-800/40 last:border-r-0 ${
                active === i ? 'text-amber-400 bg-amber-500/[0.08]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >{proj.title}</button>
          ))}
        </div>
        {/* edge fades hint at more tabs */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l from-gray-950 to-transparent" />
        <div className="pointer-events-none absolute top-0 left-0 h-full w-6 bg-linear-to-r from-gray-950 to-transparent" />
      </div>
      <div className="flex">
        {/* Desktop: left nav */}
        <div className="hidden md:flex flex-col w-48 flex-shrink-0">
          {cubiktechProjects.map((proj, i) => (
            <button key={i} onClick={(e) => handleTabClick(i, e as any)}
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
  'interactive-lift group flex flex-col bg-gray-900/35 hover:bg-gray-900/65 border border-gray-800/40 border-l-2 border-l-amber-500/25 hover:border-l-amber-500 rounded-r-xl p-5 min-h-60 transition-all';

function App() {
  const emailAddress = 'azverndias09@gmail.com';
  const contactSubject = 'Portfolio Inquiry';
  const contactMailto = `mailto:${emailAddress}?subject=${encodeURIComponent(contactSubject)}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(contactSubject)}`;
  const [activeSection, setActiveSection] = useState<(typeof sectionNavItems)[number]['id']>('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const navHideTimeoutRef = useRef<number | null>(null);

  const clearNavHide = useCallback(() => {
    if (navHideTimeoutRef.current) {
      window.clearTimeout(navHideTimeoutRef.current);
      navHideTimeoutRef.current = null;
    }
  }, []);

  const scheduleNavHide = useCallback(() => {
    clearNavHide();
    if (window.scrollY > 60) {
      navHideTimeoutRef.current = window.setTimeout(() => {
        setIsNavVisible(false);
      },800);
    }
  }, [clearNavHide]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      setIsNavVisible(true);

      if (isMobileMenuOpen) {
        clearNavHide();
      } else {
        scheduleNavHide();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearNavHide();
    };
  }, [clearNavHide, isMobileMenuOpen, scheduleNavHide]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateHover = () => {
      setCanHover(media.matches);
      if (!media.matches) {
        setIsNavHovered(false);
      }
    };

    updateHover();

    if (media.addEventListener) {
      media.addEventListener('change', updateHover);
      return () => media.removeEventListener('change', updateHover);
    }

    media.addListener(updateHover);
    return () => media.removeListener(updateHover);
  }, []);

  useEffect(() => {
    let ticking = false;
    let sections: Array<{
      id: (typeof sectionNavItems)[number]['id'];
      top: number;
      bottom: number;
    }> = [];

    const computeSections = () => {
      sections = sectionNavItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) {
            return null;
          }
          const top = element.getBoundingClientRect().top + window.scrollY;
          const bottom = top + element.offsetHeight;
          return {
            id: item.id,
            top,
            bottom,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)
        .sort((a, b) => a.top - b.top) as Array<{
          id: (typeof sectionNavItems)[number]['id'];
          top: number;
          bottom: number;
        }>;
    };

    const updateActiveSection = () => {
      if (sections.length === 0) {
        ticking = false;
        return;
      }

      const markerX = Math.floor(window.innerWidth / 2);
      const markerY = Math.min(window.innerHeight * 0.35, 260);
      const markerElement = document.elementFromPoint(markerX, markerY);
      const markerSection = markerElement?.closest('.scroll-section') as HTMLElement | null;

      if (markerSection?.id) {
        setActiveSection(markerSection.id as (typeof sectionNavItems)[number]['id']);
        ticking = false;
        return;
      }

      const marker = window.scrollY + 140;
      let currentSection = sections[0].id;

      for (const section of sections) {
        if (marker >= section.top && marker < section.bottom) {
          currentSection = section.id;
          break;
        }
      }

      const pageBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (pageBottom >= documentHeight - 8) {
        currentSection = sections[sections.length - 1].id;
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
      }
    };

    const onResize = () => {
      computeSections();
      updateActiveSection();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, []);

  const handleSectionJump = (sectionId: (typeof sectionNavItems)[number]['id']) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
    <div className="min-h-screen pb-6">
      <CursorHalo />
      <nav 
        className={`sticky top-2 md:top-3 z-50 pt-4 transition-all duration-500 ease-in-out ${
          !isNavVisible && !isNavHovered && isScrolled && !isMobileMenuOpen
            ? 'opacity-0 -translate-y-4 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
        onMouseEnter={() => {
          if (canHover) {
            setIsNavHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (canHover) {
            setIsNavHovered(false);
          }
        }}
      >
        <div className="max-w-5xl mx-auto w-full h-12 relative pointer-events-none">
          <div 
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] md:w-auto md:max-w-none pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? 'md:max-w-[calc(100vw-3rem)]' : 'md:left-6 md:translate-x-0'
            }`}
          >
            <div className="border-0 bg-transparent shadow-none md:border md:border-gray-800/70 md:bg-gray-950/80 md:backdrop-blur-md md:rounded-xl md:shadow-xl md:shadow-black/20">
              <div className="flex items-center justify-start md:justify-between px-2 py-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen((prev) => {
                      const next = !prev;
                      if (next) {
                        clearNavHide();
                      } else {
                        scheduleNavHide();
                      }
                      return next;
                    });
                    setIsNavVisible(true);
                  }}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-nav"
                  className="md:hidden interactive-lift inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap border text-gray-200 border-amber-700/50 bg-amber-500/10 hover:bg-amber-500/20"
                >
                  {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                  Menu
                </button>

                <ul className="hidden md:flex items-center gap-2 overflow-visible">
                  {sectionNavItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSectionJump(item.id)}
                          aria-current={isActive ? 'page' : undefined}
                          className={`interactive-lift px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap border transition-colors ${
                            isActive
                              ? 'text-amber-300 border-amber-700/70 bg-amber-500/10'
                              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-900/70'
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div
                id="mobile-nav"
                className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'max-h-72 opacity-100 pb-2' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="mx-2 rounded-lg border border-gray-800/70 bg-gray-950/60">
                  <ul className="flex flex-col py-2">
                    {sectionNavItems.map((item) => {
                      const isActive = activeSection === item.id;

                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleSectionJump(item.id)}
                            aria-current={isActive ? 'page' : undefined}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                              isActive
                                ? 'text-amber-300 bg-amber-500/10'
                                : 'text-gray-300 hover:text-white hover:bg-gray-900/70'
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-28">

        {/* Hero */}
        <header id="about" className="scroll-section flex flex-col md:flex-row gap-10 md:gap-16 items-start justify-between">
          <div className="flex-1 space-y-7">
            <div className="space-y-5">
              {/* <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-amber-400/80 border border-amber-900/40 bg-amber-950/25 rounded-full px-3 py-1">
                Available for Freelance Projects
              </p> */}
              <div className="pb-5 border-b border-amber-500/30">
                <h1 className="font-display text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
                  Azvern Dias
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-amber-300 font-semibold leading-snug max-w-2xl">
                I build event-driven backend systems and AI workflows that move from idea to production fast.
              </p>
              <p className="text-gray-400 leading-relaxed max-w-xl text-sm md:text-base">
                FastAPI and AWS specialist focused on multi-tenant architecture, reliable automation, and clean user-facing outcomes.
              </p>
              <div className="flex items-center justify-between md:justify-start w-full md:w-auto md:gap-2.5 pt-1">
                {['Event-Driven AWS', 'FastAPI Systems', 'AI Integrations'].map((pill) => (
                  <span key={pill} className="font-mono text-[11px] sm:text-xs text-center text-amber-300/80 border border-amber-900/40 bg-amber-950/20 px-2 sm:px-2.5 py-1.5 rounded-md whitespace-nowrap">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-0.5">
              <div className="flex gap-4">
                <a
                  href={contactMailto}
                  onClick={handleContactClick}
                  className="interactive-lift inline-flex min-w-44 items-center justify-center gap-2 text-gray-950 bg-amber-500 hover:bg-amber-400 transition-all px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-amber-500/20"
                >
                  <Mail size={18} />
                  Contact Me
                </a>
                <a
                  href="/resume.pdf"
                  className="interactive-lift inline-flex min-w-44 items-center justify-center gap-2 text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/60 hover:bg-amber-500/10 transition-all px-6 py-2.5 rounded-lg text-sm font-bold"
                >
                  <Download size={18} />
                  Resume
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6">
                <a
                  href="https://github.com/azverndias09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-lift flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <GithubIcon size={18} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/azverndias0912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-lift flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <LinkedinIcon size={18} />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/azz.create/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive-lift flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <InstagramIcon size={18} />
                  Creative
                </a>
              </div>
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
        <section id="experience" className="scroll-section space-y-10">
          <SectionHeader number="01" title="Experience" />

          <div className="space-y-10">
            {/* Cubiktech */}
            <div className="group relative pl-8 border-l-2 border-gray-800 hover:border-amber-500/40 transition-colors pb-8">
              <div className="absolute w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-gray-950 -left-2 top-1.5"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-4 gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-100">Software Engineer</h3>
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
                  <h3 className="font-display text-base font-bold text-gray-200">Project Tech Lead & Software Engineering Intern</h3>
                  <p className="text-amber-400 text-sm font-medium">Sequalize <span className="text-gray-600 font-mono">· 2024–2025</span></p>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">Directed project execution and technical strategy for a scalable event platform; previously engineered the cross-platform Flutter client and architected the Supabase backend for real-time messaging and secure access control.</p>
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-gray-200">Software Developer</h3>
                  <p className="text-amber-400 text-sm font-medium">Nexocide <span className="text-gray-600 font-mono">· 2022–2023</span></p>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">Engineered core multiplayer networking mechanics for 3D environments using Unreal Engine. Additionally, developed a live, full-stack e-commerce application tailored for the tourism sector.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-section space-y-10">
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
              className={`${projectCardBase} md:col-span-3`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-display text-lg md:text-xl font-bold text-gray-100 group-hover:text-amber-300 transition-colors">Genetic Car Learner</h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400/70 border border-amber-900/40 bg-amber-950/25 px-2 py-0.5 rounded shrink-0">
                  Featured
                </span>
              </div>
              <div className="space-y-2.5 grow">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400/70 mr-2">Outcome</span>
                  Evolved an autonomous driving agent that learns without hardcoded rules.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-gray-600 mr-2">Built</span>
                  Implemented NEAT (NeuroEvolution of Augmenting Topologies) to iteratively improve neural network behavior.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
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
              <div className="space-y-2.5 grow">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400/70 mr-2">Outcome</span>
                  Matched riders on overlapping routes in real time for smoother carpooling logistics.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-gray-600 mr-2">Built</span>
                  Route clustering and live pairing logic delivered as a full-stack hackathon product.
                </p>
              </div>
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
              <div className="space-y-2.5 grow">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400/70 mr-2">Outcome</span>
                  Turned food labels into instant nutrition insights during live scans.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-gray-600 mr-2">Built</span>
                  Computer-vision parsing workflow tuned for speed and low-friction user interaction.
                </p>
              </div>
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
              <div className="space-y-2.5 grow">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400/70 mr-2">Outcome</span>
                  Enabled reliable real-time communication between hardware and mobile interface.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-gray-600 mr-2">Built</span>
                  Flutter app integrated with embedded C++ firmware as a practical hardware-software bridge.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="font-mono text-xs text-amber-400/70 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded">Flutter</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">C++</span>
                <span className="font-mono text-xs text-gray-500 bg-gray-800/40 border border-gray-800/40 px-2 py-0.5 rounded">IEEE</span>
              </div>
            </a>
          </div>
        </section>

        {/* Leadership & Hackathons */}
        <section id="leadership" className="scroll-section space-y-10">
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
        <section id="skills" className="scroll-section space-y-8">
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

        <section id="freelance" className="scroll-section space-y-10">
          <SectionHeader number="05" title="Open For Freelance" />
          <div className="group relative pl-8 border-l-2 border-gray-800 hover:border-amber-500/40 transition-colors pb-2">
            <div className="absolute w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-gray-950 -left-2 top-1.5"></div>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              Available for freelance work in  website/app development, video editing, VFX, animation.
            </p>
            <p className="mt-3 text-sm md:text-base text-gray-400 leading-relaxed">
              If you have a project in mind, send me a quick brief and I'll reply with scope and timelines :)
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {['Video Editing', 'VFX', 'Animation', 'Websites', 'Apps'].map((service) => (
                <span key={service} className="font-mono text-xs text-amber-400/60 bg-amber-950/20 border border-amber-900/20 px-2 py-0.5 rounded">
                  {service}
                </span>
              ))}
            </div>
            <a
              href={contactMailto}
              onClick={handleContactClick}
              className="interactive-lift inline-flex items-center gap-2 mt-5 text-gray-950 bg-amber-500 hover:bg-amber-400 transition-all px-5 py-2 rounded-lg text-sm font-semibold"
            >
              <Mail size={16} />
              Contact Me
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-r from-amber-950/30 via-gray-900/80 to-gray-900/80 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
              <div className="space-y-2 max-w-2xl md:flex-1">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-400/70">Let's Build</p>
                <h3 className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight">
                  Need an app, website or AI workflow that is production-ready?
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  Send a brief and I will respond with scope, timeline, and the cleanest implementation path.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:w-52 md:justify-center">
                <a
                  href={contactMailto}
                  onClick={handleContactClick}
                  className="interactive-lift inline-flex items-center gap-2 text-gray-950 bg-amber-500 hover:bg-amber-400 transition-all px-5 py-2.5 rounded-lg text-sm font-semibold"
                >
                  <Mail size={16} />
                  Start a Project
                </a>
                {/* <a
                  href="/resume.pdf"
                  className="interactive-lift inline-flex items-center gap-2 text-amber-300 border border-amber-900/60 hover:border-amber-700/60 hover:bg-amber-950/30 transition-all px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <Download size={16} />
                  View Resume
                </a> */}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-4 border-t border-gray-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Azvern Dias. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://github.com/azverndias09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-400 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/azverndias0912"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-400 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="https://www.instagram.com/azz.create/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-400 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href={contactMailto}
              onClick={handleContactClick}
              className="text-gray-500 hover:text-amber-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;

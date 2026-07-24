import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Code2,
  Download,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Phone,
  Rocket,
  Send,
  Smartphone,
  Sparkles,
  Star,
  User,
  Wand2,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

import {
  certifications,
  experience,
  nav,
  profile,
  projects,
  services,
  skills,
  stats,
  testimonials,
  tools,
} from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Web Developer & UI/UX Designer` },
      {
        name: "description",
        content:
          "Premium portfolio of a web developer, no-code builder and UI/UX designer crafting fast, beautiful digital experiences.",
      },
      { property: "og:title", content: `${profile.name} — Portfolio` },
      {
        property: "og:description",
        content:
          "Web development, no-code, UI/UX design and creative digital work — engineered for performance and delight.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: PortfolioPage,
});

/* ---------- helpers ---------- */

function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon)] shadow-[0_0_10px_var(--neon)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.15}>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- background layer ---------- */

function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 aurora" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[var(--neon)]/25 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-40 h-[560px] w-[560px] rounded-full bg-[var(--neon-2)]/20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-[var(--neon-3)]/20 blur-3xl animate-blob [animation-delay:-12s]" />
    </div>
  );
}

/* ---------- navigation ---------- */

function TopNav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]" : "glass"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)] font-bold text-black">
            {profile.firstName[0]}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            {profile.name}
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === n.id ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03] md:inline-flex"
        >
          Hire me <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 bg-white transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-4 bg-white transition ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-16 w-[calc(100%-2rem)] max-w-sm rounded-2xl glass-strong p-3 md:hidden"
          >
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- hero ---------- */

function TypingRoles() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "del">("type");
  useEffect(() => {
    const word = profile.typingRoles[i];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 70);
      } else {
        t = setTimeout(() => setPhase("hold"), 1200);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("del"), 400);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), 35);
      } else {
        setI((v) => (v + 1) % profile.typingRoles.length);
        setPhase("type");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, i]);
  return (
    <span className="text-gradient">
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-1 animate-pulse bg-[var(--neon)]" />
    </span>
  );
}

function Hero() {
  const socials = [
    { icon: Github, href: profile.socials.github, label: "GitHub" },
    { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
    { icon: FaXTwitter, href: profile.socials.twitter, label: "X" },
  ];

  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 15 });

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for freelance & full-time
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
          >
            Hi, I'm <span className="text-gradient animate-gradient-shift">{profile.firstName}</span>.
            <br />
            I'm a{" "}
            <span className="inline-block min-w-[6ch]">
              <TypingRoles />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-6 max-w-xl text-base text-white/70 md:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)] px-6 py-3 text-sm font-semibold text-black glow"
            >
              View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Hire Me <Sparkles className="h-4 w-4" />
            </a>
            <a
              href={profile.resumeUrl}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              <Download className="h-4 w-4" /> Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Portrait card with tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
          style={{ perspective: 1200 }}
          onMouseMove={(e) => {
            const el = cardRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry.set(px * 14);
            rx.set(-py * 14);
          }}
          onMouseLeave={() => {
            rx.set(0);
            ry.set(0);
          }}
        >
          <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative aspect-[4/5] rounded-[2rem] p-[1.5px]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)] opacity-80 blur-sm" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] glass-strong">
              <img
                src={profile.photo}
                alt={profile.name}
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
                style={{ transform: "translateZ(40px)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div
                className="absolute left-4 right-4 top-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-white/80"
                style={{ transform: "translateZ(60px)" }}
              >
                <span>◍ live</span>
                <span>{profile.location.split("·")[0].trim()}</span>
              </div>
              <div
                className="absolute inset-x-4 bottom-4 rounded-2xl glass p-4"
                style={{ transform: "translateZ(60px)" }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Currently</p>
                <p className="mt-1 text-sm font-medium">
                  Designing & building premium sites for founders & studios.
                </p>
              </div>
            </div>
          </motion.div>
          {/* floating chips */}
          <motion.div
            className="absolute -left-6 top-10 rounded-2xl glass px-3 py-2 text-xs animate-float-slow"
            style={{ transform: "translateZ(30px)" }}
          >
            ⚡ 98 Lighthouse
          </motion.div>
          <motion.div
            className="absolute -right-4 bottom-24 rounded-2xl glass px-3 py-2 text-xs animate-float-slow [animation-delay:-3s]"
          >
            ✦ Awwwards feat.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="About Me"
          title={<>Designer who codes. <span className="text-gradient">Developer who cares.</span></>}
          desc="A quick look at the person behind the pixels."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="text-lg font-semibold">The intro</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                I'm a multidisciplinary creator who lives at the intersection of design and code.
                For the past five years I've helped founders, studios and agencies ship
                digital products that look premium and perform like Formula 1.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="text-lg font-semibold">My journey</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Started tinkering with HTML at 14, fell in love with UI at university,
                and turned professional through freelance work with early-stage startups.
                Today I lead design & engineering for ambitious brands worldwide.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass h-full rounded-3xl p-8">
              <h3 className="text-lg font-semibold">What makes me unique</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                I think in systems, obsess over typography, and treat motion as a first-class
                design tool. You get one collaborator who owns the outcome from wireframe to
                deploy — no handoffs, no compromises.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6 text-center">
                <p className="text-4xl font-bold text-gradient md:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/60">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- skills ---------- */

function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Skills"
          title={<>The <span className="text-gradient">craft</span> I've mastered.</>}
          desc="Five years of building shipped me a toolkit I can rely on end to end."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <span className="font-mono text-sm text-white/60">{s.level}%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)] opacity-20 blur-lg" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- tools ---------- */

function Tools() {
  const row = [...tools, ...tools];
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Tools I use"
          title={<>My daily <span className="text-gradient">stack</span>.</>}
        />
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-4 px-4">
          {row.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="group flex min-w-[180px] items-center gap-3 rounded-2xl glass px-5 py-4 transition hover:-translate-y-1 hover:border-white/25"
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-xl text-sm font-bold text-black"
                style={{ background: t.accent }}
              >
                {t.initial}
              </span>
              <span className="font-medium">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- services ---------- */

const SERVICE_ICONS = { Code2, Wand2, Palette, Rocket, Sparkles, Smartphone, User, Briefcase };

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="My Services"
          title={<>What I can <span className="text-gradient">build with you</span>.</>}
          desc="End-to-end offerings from strategy to launch."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon as keyof typeof SERVICE_ICONS] ?? Sparkles;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass p-6 transition hover:-translate-y-1">
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--neon)]/30 to-[var(--neon-2)]/20 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-[var(--neon-2)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
                   
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- projects ---------- */

function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Featured Projects"
          title={<>Selected <span className="text-gradient">work</span>.</>}
          desc="A glimpse of recent products, sites and interfaces I've shipped."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl glass">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/65">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:scale-[1.03]"
                    >
                      Live Demo <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- certifications ---------- */


function Certifications() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title={<>Verified <span className="text-gradient">credentials</span>.</>}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <a
                href={c.link}
                className="group block h-full overflow-hidden rounded-3xl glass transition hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">{c.date}</p>
                  <h3 className="mt-1 text-base font-semibold leading-snug">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{c.org}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--neon-2)]">
                    View credential <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- experience ---------- */

function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Experience"
          title={<>A short <span className="text-gradient">timeline</span>.</>}
        />
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--neon)] via-[var(--neon-3)] to-transparent md:left-1/2" />
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.08}>
              <div
                className={`relative mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <div className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--neon)] shadow-[0_0_20px_var(--neon)] md:left-1/2" />
                <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--neon-2)]">
                    {e.period}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{e.role}</h3>
                  <p className="text-white/60">{e.company}</p>
                </div>
                <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}>
                  <div className="glass rounded-2xl p-5">
                    <p className="text-sm text-white/70">{e.desc}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                      {e.achievements.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neon-2)]" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */

function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Kind words from <span className="text-gradient">people I've worked with</span>.</>}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="glass h-full rounded-3xl p-7">
                <div className="flex items-center gap-1 text-[var(--neon-3)]">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-white/80">
                  "{t.review}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img src={t.photo} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-white/60">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={<>Let's <span className="text-gradient">create something great</span>.</>}
          desc="Open for freelance projects and full-time roles. Reply within 24 hours."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
              { icon: MapPin, label: "Location", value: profile.location, href: "#" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 rounded-2xl glass p-5 transition hover:-translate-y-0.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-[var(--neon-2)]">
                  <c.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">{c.label}</p>
                  <p className="truncate text-sm font-medium">{c.value}</p>
                </div>
              </a>
            ))}
            <div className="flex items-center gap-3 rounded-2xl glass p-5">
              {[
                { icon: Github, href: profile.socials.github, label: "GitHub" },
                { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
                { icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
                { icon: FaXTwitter, href: profile.socials.twitter, label: "X" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            }}
            className="glass-strong lg:col-span-3 space-y-4 rounded-3xl p-7"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-white/60">Name</span>
                <input
                  required
                  maxLength={100}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[var(--neon)]"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-white/60">Email</span>
                <input
                  required
                  type="email"
                  maxLength={255}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[var(--neon)]"
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-white/60">Subject</span>
              <input
                required
                maxLength={140}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[var(--neon)]"
                placeholder="Let's build something"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-white/60">Message</span>
              <textarea
                required
                maxLength={1000}
                rows={5}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[var(--neon)]"
                placeholder="Tell me about your project…"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)] px-6 py-3 text-sm font-semibold text-black glow"
            >
              {sent ? "Sent — talk soon ✨" : (<>Send message <Send className="h-4 w-4" /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)] font-bold text-black">
              {profile.firstName[0]}
            </span>
            <span className="font-semibold">{profile.name}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/60">{profile.tagline}</p>
        </div>
        <nav className="flex flex-wrap items-start gap-x-5 gap-y-2 md:justify-center">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-white/70 hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex gap-2">
            {[
              { icon: Github, href: profile.socials.github, label: "GitHub" },
              { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
              { icon: Instagram, href: profile.socials.instagram, label: "Instagram" },
              { icon: FaXTwitter, href: profile.socials.twitter, label: "X" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white"
              >
                <s.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)] text-black shadow-[0_10px_30px_-10px_var(--neon)]"
          aria-label="Back to top"
        >
          <ArrowRight className="h-5 w-5 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const width = useTransform(w, (v) => `${v * 100}%`);
  return (
    <motion.div
      style={{ width }}
      className="fixed left-0 top-0 z-[70] h-[2px] bg-gradient-to-r from-[var(--neon)] via-[var(--neon-3)] to-[var(--neon-2)]"
    />
  );
}

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", h);
    return () => window.removeEventListener("pointermove", h);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{
        translateX: sx,
        translateY: sy,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon)]/10 blur-3xl md:block"
    />
  );
}

/* ---------- page ---------- */

function PortfolioPage() {
  const [active, setActive] = useState("home");
  const sectionIds = useMemo(() => nav.map((n) => n.id), []);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackground />
      <CursorGlow />
      <ScrollProgress />
      <TopNav active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Tools />
        <Services />
        <Projects />
        
        <Certifications />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

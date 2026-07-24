// Edit this file to update all portfolio content.
import profileImg from "@/assets/profile.jpg";
import projectLiminox from "@/assets/projects/liminox.jpg";
import projectNorr from "@/assets/projects/norr.jpg";
import projectOrbit from "@/assets/projects/orbit.jpg";
import projectKinetic from "@/assets/projects/kinetic.jpg";
import projectHalo from "@/assets/projects/halo.jpg";
import projectAtelier from "@/assets/projects/atelier.jpg";
import certOpenAI from "@/assets/certs/openai-prompt.jpg";
import certLinux from "@/assets/certs/linux-cli.jpg";
import certSQL from "@/assets/certs/sql.jpg";

export const profile = {
  name: "Shyam Gupta",
  firstName: "Shyam",
  role: "Web Developer · UI/UX Designer · Creative Digital Builder",
  tagline: "Designing & building premium digital experiences.",
  intro:
    "I craft high-performance websites and interfaces that blend beautiful design with clean, scalable code. From landing pages to full products — I turn ideas into experiences people remember.",
  email: "guptashyam1121@gmail.com",
  phone: "+91 9220786079",
  location: "Remote · Available worldwide",
  resumeUrl: "#",
  photo: profileImg,
  typingRoles: [
    "Web Developer",
    "No-Code Builder",
    "UI/UX Designer",
    "Creative Digital Creator",
  ],
  socials: {
    github: "https://github.com/guptashyam69",
    linkedin: "https://www.linkedin.com/in/shyamgupta1112",
    instagram: "https://www.instagram.com/codecraftbuilds?igsh=eHBkbHlzZjIycGd1",
    twitter: "https://x.com/",
  },
};

export const stats = [
  { value: 2, suffix: "+", label: "Years Crafting Products" },
  { value: 50, suffix: "+", label: "Projects Developed" },
  { value: 10, suffix: "", label: "Awards & Certifications" },
];

export const skills = [
  { name: "Web Development", level: 95, color: "from-[#22D3EE] to-[#818CF8]" },
  { name: "Graphic Designing", level: 94, color: "from-[#FF61F6] to-[#7B61FF]" },
  { name: "UI/UX Design", level: 92, color: "from-[#A259FF] to-[#FF61F6]" },
  { name: "Backend Development", level: 88, color: "from-[#3ECF8E] to-[#22D3EE]" },
  { name: "Firebase Integration", level: 86, color: "from-[#F7DF1E] to-[#F0C419]" },
  { name: "IoT Development", level: 84, color: "from-[#264DE4] to-[#2965F1]" },
  { name: "API Integration", level: 85, color: "from-[#8993BE] to-[#4F5D95]" },
  { name: "Canva", level: 96, color: "from-[#00C4CC] to-[#22D3EE]" },
  { name: "Creative Thinking", level: 93, color: "from-[#FF5C87] to-[#FFC800]" },
  { name: "Adaptability & Multitasking", level: 91, color: "from-[#F16529] to-[#F7DF1E]" },
  { name: "Communication", level: 90, color: "from-[#2965F1] to-[#22D3EE]" },
  { name: "Leadership", level: 89, color: "from-[#7B61FF] to-[#FF61F6]" },
];

export const tools = [
  { name: "Lovable", initial: "L", accent: "#FF5C87" },
  { name: "Framer", initial: "F", accent: "#0055FF" },
  { name: "Figma", initial: "Fi", accent: "#A259FF" },
  { name: "Canva", initial: "C", accent: "#00C4CC" },
  { name: "WordPress", initial: "W", accent: "#21759B" },
  { name: "Webflow", initial: "Wf", accent: "#4353FF" },
  { name: "Wix", initial: "Wx", accent: "#FFC800" },
  { name: "GitHub", initial: "Gh", accent: "#E5E7EB" },
  { name: "Supabase", initial: "S", accent: "#3ECF8E" },
  { name: "n8n", initial: "n8", accent: "#EA4B71" },
];

export const services = [
  { title: "Website Development", desc: "Custom-coded, blazing-fast websites built with modern stacks and clean architecture.", icon: "Code2" },
  { title: "No-Code Development", desc: "Ship production-ready sites in days using Framer, Webflow, Wix and Lovable.", icon: "Wand2" },
  { title: "UI/UX Design", desc: "Interfaces that are intuitive, accessible and unmistakably premium.", icon: "Palette" },
  { title: "Landing Pages", desc: "High-converting landings engineered for storytelling and speed.", icon: "Rocket" },
  { title: "Website Redesign", desc: "Modernize tired sites into elegant, on-brand experiences.", icon: "Sparkles" },
  { title: "Responsive Websites", desc: "Pixel-perfect across mobile, tablet, laptop and 4K displays.", icon: "Smartphone" },
  { title: "Portfolio Websites", desc: "Personal brands that make recruiters and clients stop scrolling.", icon: "User" },
  { title: "Business Websites", desc: "SEO-ready marketing sites that turn visitors into revenue.", icon: "Briefcase" },
];

export const projects = [
  {
    title: "Liminox",
    category: "Web App",
    desc: "A Marketing Website for an Emerging Startup",
    tech: ["React", "TypeScript", "Tailwind"],
    image: projectLiminox,
    demo: "https://www.liminox.live",
  },
  {
    title: "Norr — E-commerce",
    category: "Storefront",
    desc: "Nordic-inspired storefront with editorial product pages and smooth checkout.",
    tech: ["Next.js", "Stripe", "Framer Motion"],
    image: projectNorr,
    demo: "#",
  },
  {
    title: "Orbit — Studio Site",
    category: "Agency",
    desc: "Award-worthy interactive site for a creative motion studio.",
    tech: ["Framer", "GSAP", "WebGL"],
    image: projectOrbit,
    demo: "#",
  },
  {
    title: "Kinetic — Fintech",
    category: "Fintech",
    desc: "Investment platform with elegant onboarding and real-time portfolio views.",
    tech: ["React", "Node", "Postgres"],
    image: projectKinetic,
    demo: "#",
  },
  {
    title: "Halo — Wellness App",
    category: "Mobile UI",
    desc: "Meditation companion with breath-driven micro-interactions.",
    tech: ["Figma", "React Native"],
    image: projectHalo,
    demo: "#",
  },
  {
    title: "Atelier — Portfolio CMS",
    category: "No-Code",
    desc: "A no-code CMS letting creators publish stunning case studies in minutes.",
    tech: ["Webflow", "n8n"],
    image: projectAtelier,
    demo: "#",
  },
];

export const certifications = [
  {
    name: "Prompt Engineering & Programming with OpenAI",
    org: "Columbia+ University",
    date: "Credential Verified",
    image: certOpenAI,
    link: "#",
  },
  {
    name: "Command Line in Linux",
    org: "Coursera",
    date: "Credential: 7TDZEK4VAUEJ",
    image: certLinux,
    link: "https://www.coursera.org/account/accomplishments/verify/7TDZEK4VAUEJ",
  },
  {
    name: "SQL",
    org: "United Latino Students Association",
    date: "Credential: 52",
    image: certSQL,
    link: "#",
  },
];

export const experience = [
  {
    company: "Northwind Studio",
    role: "Senior Product Designer & Developer",
    period: "2023 — Present",
    desc: "Leading design & front-end for premium SaaS and DTC brands.",
    achievements: [
      "Shipped 20+ marketing sites averaging 98 Lighthouse.",
      "Built the internal design system used across 6 products.",
      "Mentored 4 designers into senior roles.",
    ],
  },
  {
    company: "Lumen Labs",
    role: "UI/UX Designer",
    period: "2021 — 2023",
    desc: "Designed data-heavy dashboards and mobile experiences for fintech clients.",
    achievements: [
      "Increased activation rate by 38% via onboarding redesign.",
      "Introduced motion guidelines across the product suite.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer & Designer",
    period: "2019 — 2021",
    desc: "Partnered with 30+ startups shipping brand sites, landings and MVPs.",
    achievements: [
      "Delivered 45+ websites on Webflow, WordPress, and custom stacks.",
      "Featured twice on Awwwards Sites of the Day.",
    ],
  },
];

export const testimonials = [
  {
    name: "Elena Marchetti",
    role: "Founder",
    company: "Norr Studio",
    rating: 5,
    review:
      "Shyam translated our vision into a site that feels like a magazine and performs like an app. Instant credibility upgrade.",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop",
  },
  {
    name: "Marcus Chen",
    role: "Head of Product",
    company: "Kinetic",
    rating: 5,
    review:
      "One of the rare people who thinks like a designer and executes like an engineer. Every detail was intentional.",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop",
  },
  {
    name: "Priya Anand",
    role: "CEO",
    company: "Halo App",
    rating: 5,
    review:
      "The micro-interactions alone doubled our App Store rating conversations. Truly premium work.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80&auto=format&fit=crop",
  },
];

export const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

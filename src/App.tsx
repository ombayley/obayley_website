import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Github, Linkedin, MapPin, Briefcase, Calendar, ExternalLink, Moon, Sun, ChevronRight, Code2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaPython, FaJava, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiCplusplus, SiJavascript, SiDotnet } from "react-icons/si";
"use client";

// --- Easily editable content ---
const DATA = {
  name: "Olly Bayley",
  title: "Organic Chemist • Backend Developer",
  location: "Amsterdam, NL",
  email: "ombayley@uva.nl",
  links: {
    github: "https://github.com/ombayley",
    linkedin: "https://www.linkedin.com/in/ollybayleynz/",
    resume: "docs/obayley_cv.pdf",
    phdThesis: "/docs/obayley_phd_thesis.pdf",
    mastersThesis: "/docs/obayley_masters_thesis.pdf",
  },
  blurb:
    "A Post-Doctoral Researcher at the University of Amsterdam (NRG) with a focus on chemical synthesis, hardware automation and autmoarted data analysis. ",
  highlights: [
    { label: "yrs chem", value: 10 },
    { label: "yrs code", value: 2 },
    { label: "education", value: "PhD" },
  ],
skills: [
  { name: "Python", icon: <FaPython className="w-5 h-5" /> },
  { name: "C++", icon: <SiCplusplus className="w-5 h-5" /> },
  { name: "C#", icon: <SiDotnet className="w-5 h-5" /> },
  { name: "Java", icon: <FaJava className="w-5 h-5" /> },
  { name: "Node.js", icon: <FaNodeJs className="w-5 h-5" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" /> },
  { name: "JavaScript", icon: <SiJavascript className="w-5 h-5" /> },
],
  about:[
    "Orginally a pure chemist, my focus has been on natural product total synthesis and drug development (NZ - Masters + Industry). After a few years of this I moved to Molecular Machine research (UK - PhD) and subsequently to chemical automation (Netherlands - Post-Doc)."
  ],
  projects: [
    {
      name: "ChromTroller",
      tagline: "Automated Hardware Control and Chemical Data Analysis",
      description:
        "Automated control and analysis software to automate the collection and analysis of UV data from an Agilent 1290 UPLC running on the closed OpenLab software",
      stack: ["Python", "C++", "Arduino", "OpenLab CDS"],
      repo: "https://github.com/ombayley/ChromTroller",
    },
    {
      name: "RoboChem",
      tagline: "Automated self-optimizing reaction platform",
      description:
        "RoboChem is an automated, self-optimizing reaction platform designed for the automated optimisation of flow reactions. This system integrates an AI-driven package with an automated hardware platform to perform reaction optimization.",
      stack: ["Python", "C++", "Arduino", "PyTorch (BoTorch)", "pydantic"],
      repo: "https://github.com/Noel-Research-Group/RoboChem_1",
    },
    {
      name: "Personal Website",
      tagline: "Personal Website",
      description:
        "Personal website built with Next.js and Tailwind CSS. Hosted on Vercel.",
      stack: ["Next.js", "Tailwind CSS", "TypeScript"],
      repo: "https://github.com/yourname/website",
    },
    {
      name: "UPLC Data Analyser GUI",
      tagline: "GUI Application for automated analysis of Agilen OpenLab CDS raw data",
      description:
        "The UPLC Data Analyser is a GUI application designed to open and analyse chromatogram data stored in Agilent's proprietary .dx files. This application utilizes CustomTKinter for the user interface and Matplotlib+seaborn for plotting the chromatogram data. ",
      stack: ["Python", "(Custom)Tkinter", "Matplotlib", "Seaborn"],
      repo: "https://github.com/ombayley/UPLC_Data_Analyser",
    },
  ],
  experience: [
    {
      company: "University of Amsterdam (UvA)",
      location: "Amsterdam, NL",
      role: "Postdoc",
      period: "Nov 2023 — Present",
      summary:
        "Research on the automation of chemical reaction development",
      bullets: [
        "Designed new hardware for reaction execution at 100th of the price of commercial systems",
        "Developed new software tools for the automated analysis of HPLC, Mass Spec, NMR and UV chromatograms and spectra",
        "Built high-level control architecture to drive autonomous reaction systems",
        "Wrote low-level control software to automate mechanical and robotinc components"
      ],
    },
    {
      company: "University of Auckland Cancer Society Research Centre (ACSRC)",
      location: "Auckland, NZ",
      role: "Post Graduate Research Assistant",
      period: "Jun 2019 — Dec 2019",
      summary:
        "Gram scale synthesis of anti-cancer compounds for the Faculty of Medicine and Health Science at the Auckland Cancer Society Research Centre",
      bullets: [
        "Convergant 20-Step (total step count) Synthesis",
        ">5g of final products",
        "Material used in pre-clinical trials"
      ],
    },
    {
      company: "Victoria University of Wellington",
      location: "Remote",
      role: "Post Graduate Research Assistant",
      period: "May 2019 - Jul 2019",
      summary:
        "Review and edit schemes for a book chapter",
      bullets: [
        ">100 Schemes",
        "Simple templating integration",
      ],
    },
        {
      company: "Callaghan Innovation",
      location: "Wellington, NZ",
      role: "Research Assistant",
      period: "Nov 2016 - Mar 2017",
      summary:
        "Project at a CRI (Crown Research Institute) focusing on nano/microencapsulation of nutraceutical oils",
      bullets: [
        "Introduction to nanoencapsualtion techniques",
      ],
    },
  ],
  education: [
    { 
      school: "University of Bristol",
      location: "Bristol, UK",
      program: "PhD, Chemistry",
      period: "Mar 2020 - Feb 2024",
      summary: "Development of A New Class of Molecular Machine: Light-Fuelled Single-Bond Rotors",
      file: "/docs/obayley_phd_thesis.pdf"
    },
    { 
      school: "Victoria University of Wellington",
      location: "Wellington, NZ",
      program: "Master of Drug Discovery and Development",
      period: " Feb 2018 - May 2019",
      summary: "Synthesis of Novel Pyran Fragments to Incorporate into Peloruside Analogues",
      file: "/docs/obayley_masters_thesis.pdf"
    },
    { 
      school: "Victoria University of Wellington",
      location: "Wellington, NZ",
      program: "Bachelor of Biomedical Science",
      period: "Feb 2015 - May 2018",
      summary: "Major in Molecular Pharmacology and Medicinal Chemistry"
    }
  ],
};

// --- Small helpers ---
const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28 py-16 md:py-24">
    <div className="max-w-6xl mx-auto px-4">
      <motion.h2 variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
        {title}
      </motion.h2>
      {children}
    </div>
  </section>
);

export default function Page() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.title = "Olly Bayley — Organic Chemist • Backend Developer";
  }, [dark]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    // <div className="scroll-smooth antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
    <div className="relative min-h-screen text-neutral-900 dark:text-neutral-100 scroll-smooth antialiased">
    {/* Fixed background layer */}
    <div
      aria-hidden
      className="fixed inset-0 -z-10 bg-gradient-to-b
                 from-white to-neutral-100
                 dark:from-neutral-950 dark:to-neutral-950"
    />

    {/* Optional: move the decorative blob here so it stays fixed */}
    <div
      aria-hidden
      className="fixed -top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-20
                 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 -z-10"
    />
      {/* Sticky nav */}
      <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200/60 dark:border-neutral-800">
        <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">{DATA.name}</a>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#education" className="hover:opacity-80">Education</a>
            <a href="#experience" className="hover:opacity-80">Experience</a>
            <a href="#projects" className="hover:opacity-80">Projects</a>
            <a href="#skills" className="hover:opacity-80">Skills</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setDark(d => !d)}>
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <a href={DATA.links.resume} className="hidden sm:inline-flex">
              <Button size="sm" className="rounded-2xl">
                <Download className="w-4 h-4 mr-2" /> Download CV
              </Button>
            </a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <header id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs mb-6">
              <Badge variant="secondary" className="rounded-full">Open to interesting roles</Badge>
              <span className="opacity-70">{DATA.location}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">{DATA.title}</span><br />
              {DATA.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg opacity-80">{DATA.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${DATA.email}`}>
                <Button className="rounded-2xl">
                  <Mail className="w-4 h-4 mr-2" /> Email me
                </Button>
              </a>
              <a href={DATA.links.github} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-2xl"><Github className="w-4 h-4 mr-2" /> GitHub</Button>
              </a>
              <a href={DATA.links.linkedin} target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-2xl"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</Button>
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 max-w-md gap-4">
              {DATA.highlights.map((h, i) => (
                <Card key={i} className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="text-2xl md:text-3xl font-semibold">{h.value}</div>
                    <div className="text-xs opacity-70 uppercase tracking-wide">{h.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
        {/* Soft gradient backdrop */}
        {/* <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500" /> */}
      </header>

      <Section id="about" title="About">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-12"
        >
          {/* Photo (narrow) */}
          <div className="md:col-span-2 lg:col-span-3 flex items-center justify-center p-6 md:p-4">
            <img
              src="/docs/obayley_photo.jpeg"
              alt="Olly Bayley"
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover
                        border border-neutral-300 dark:border-neutral-700"
            />
          </div>

          {/* About (wider) */}
          <Card className="rounded-2xl md:col-span-6 lg:col-span-5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="w-4 h-4" /> Currently based in {DATA.location}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm opacity-90">
              {DATA.about}
            </CardContent>
          </Card>

          {/* Highlights (side) */}
          <Card className="rounded-2xl md:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="w-4 h-4" /> Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm opacity-90 space-y-2">
              <div>• Post-Doc - Primary maintainer for the <span className="font-mono">RoboChem</span> repo of the NRG.</div>
              <div>• PhD - Best presentation @ 4/4 conferences (National and International).</div>
              <div>• Masters - Graduated with highest GPA in the history of the course.</div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

       {/* Education */}
      <Section id="education" title="Education">
        <div className="space-y-6">
          {DATA.education.map((study, i) => (
            <motion.div
              key={i}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <div className="font-medium">{study.program} · {study.school}</div>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {study.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {study.location}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm opacity-90">{study.summary}</p>

              {/* Show download button only if file is provided */}
              {study.file && (
                <div className="mt-4">
                  <a href={study.file} download>
                    <Button variant="outline" className="rounded-2xl">
                      <Download className="w-4 h-4 mr-2" /> Download Thesis
                    </Button>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="space-y-6">
          {DATA.experience.map((job, i) => (
            <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <div className="font-medium">{job.role} · {job.company}</div>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70"><Calendar className="w-4 h-4" /> 
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {job.period}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm opacity-90">{job.summary}</p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
                {job.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 opacity-60 mt-1" /> <span>{b}</span></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {DATA.projects.map((p, i) => (
            <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card className="rounded-2xl h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm opacity-80">{p.tagline}</div>
                  <div className="text-sm opacity-90">{p.description}</div>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
                    ))}
                  </div>
                  <div className="pt-2 flex gap-3">
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm hover:underline">
                      <Github className="w-4 h-4" /> Code
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA.skills.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 px-4 py-3"
            >
              {s.icon}
              <span className="text-sm">{s.name}</span>
            </div>
          ))}
        </motion.div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium">Let's talk</h3>
              <p className="mt-2 text-sm opacity-80">Have a role, project, or idea? I'm happy to chat.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={`mailto:${DATA.email}`}><Button className="rounded-2xl"><Mail className="w-4 h-4 mr-2" /> {DATA.email}</Button></a>
                <a href={DATA.links.linkedin} target="_blank" rel="noreferrer"><Button variant="outline" className="rounded-2xl"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</Button></a>
                <a href={DATA.links.github} target="_blank" rel="noreferrer"><Button variant="outline" className="rounded-2xl"><Github className="w-4 h-4 mr-2" /> GitHub</Button></a>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 opacity-80"><MapPin className="w-4 h-4" /> {DATA.location}</div>
              <div className="flex items-center gap-2 opacity-80"><Calendar className="w-4 h-4" /> © {year} {DATA.name}</div>
              <div className="flex items-center gap-2 opacity-80"><Download className="w-4 h-4" /> <a className="hover:underline" href={DATA.links.resume}>Download full CV</a></div>
            </div>
          </div>
        </motion.div>
      </Section>

      <footer className="py-10 text-center text-xs opacity-60">
        Built with React & Tailwind · Smooth scroll, sticky nav, and tasteful motion.
      </footer>
    </div>
  );
}

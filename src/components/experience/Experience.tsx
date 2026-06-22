import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import {
  ChevronDown,
  ArrowUpRight,
  CloudCog,
  Target,
  Megaphone,
  Globe,
  LineChart,
  PhoneCall,
} from "lucide-react";
import CityScene from "./CityScene";
import { SCENES, type Scene } from "./scenes";

const N = SCENES.length;

function CountUp({
  value,
  suffix = "",
  duration = 1.2,
  delay = 1.8,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const end = value;
      const totalSteps = 60;
      const stepTime = (duration * 1000) / totalSteps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / totalSteps;
        const easeProgress = progress * (2 - progress); // Ease out quadratic
        const currentVal = Math.floor(easeProgress * end);
        setCount(currentVal);

        if (currentStep >= totalSteps) {
          clearInterval(interval);
          setCount(end);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, duration, delay]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

function EcosystemDiagram() {
  const nodes = [
    {
      label: "Sales Cloud",
      icon: Target,
      delay: 2.8,
      position: { left: "50%", top: "16%" },
    },
    {
      label: "Marketing Cloud",
      icon: Megaphone,
      delay: 3.0,
      position: { left: "82.3%", top: "39.5%" },
    },
    {
      label: "Experience Cloud",
      icon: Globe,
      delay: 3.2,
      position: { left: "70%", top: "77.5%" },
    },
    {
      label: "Analytics",
      icon: LineChart,
      delay: 3.4,
      position: { left: "30%", top: "77.5%" },
    },
    {
      label: "AI Voice Platform",
      icon: PhoneCall,
      delay: 3.6,
      position: { left: "17.7%", top: "39.5%" },
    },
  ];

  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[280px] md:max-w-[310px] lg:max-w-[330px] aspect-square flex items-center justify-center select-none">
      {/* SVG Connection Lines */}
      <motion.svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <defs>
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="grad-0" x1="50%" y1="50%" x2="50%" y2="16%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="grad-1" x1="50%" y1="50%" x2="82.3%" y2="39.5%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="grad-2" x1="50%" y1="50%" x2="70%" y2="77.5%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="grad-3" x1="50%" y1="50%" x2="30%" y2="77.5%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="grad-4" x1="50%" y1="50%" x2="17.7%" y2="39.5%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <line x1="250" y1="250" x2="250" y2="80" stroke="url(#grad-0)" strokeWidth="3.5" filter="url(#glow-filter)" />
        <line x1="250" y1="250" x2="411.6" y2="197.5" stroke="url(#grad-1)" strokeWidth="3.5" filter="url(#glow-filter)" />
        <line x1="250" y1="250" x2="350" y2="387.5" stroke="url(#grad-2)" strokeWidth="3.5" filter="url(#glow-filter)" />
        <line x1="250" y1="250" x2="150" y2="387.5" stroke="url(#grad-3)" strokeWidth="3.5" filter="url(#glow-filter)" />
        <line x1="250" y1="250" x2="88.4" y2="197.5" stroke="url(#grad-4)" strokeWidth="3.5" filter="url(#glow-filter)" />

        <line x1="250" y1="250" x2="250" y2="80" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6, 12" className="animated-pulse-line" />
        <line x1="250" y1="250" x2="411.6" y2="197.5" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6, 12" className="animated-pulse-line" />
        <line x1="250" y1="250" x2="350" y2="387.5" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6, 12" className="animated-pulse-line" />
        <line x1="250" y1="250" x2="150" y2="387.5" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6, 12" className="animated-pulse-line" />
        <line x1="250" y1="250" x2="88.4" y2="197.5" stroke="#60A5FA" strokeWidth="2" strokeDasharray="6, 12" className="animated-pulse-line" />
      </motion.svg>

      {/* Center Node */}
      <motion.div
        className="absolute w-18 h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#2563EB] text-white flex flex-col items-center justify-center z-10 shadow-[0_0_24px_rgba(14,165,233,0.35)] border border-white/20 select-none text-center p-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 2.1,
        }}
      >
        <div className="p-1 bg-white/10 rounded-lg mb-0.5 backdrop-blur-[2px]">
          <CloudCog className="w-3.5 h-3.5 text-white animate-pulse" />
        </div>
        <span className="text-[7px] uppercase tracking-[0.15em] font-semibold text-white/70">Salesforce</span>
        <span className="text-[8px] md:text-[9px] font-extrabold tracking-wider leading-none">CORE</span>
      </motion.div>

      {/* Radial Nodes */}
      {nodes.map((node, index) => (
        <motion.div
          key={index}
          className="absolute w-14 h-14 md:w-16 md:h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/85 backdrop-blur-[12px] border border-white/95 shadow-[0_6px_18px_rgba(15,23,42,0.05)] flex flex-col items-center justify-center hover:scale-105 hover:bg-white/90 transition-all duration-300 z-10 p-1 text-center"
          style={node.position}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: node.delay,
          }}
        >
          <div className="p-0.5 bg-[#0EA5E9]/10 rounded-md mb-0.5">
            <node.icon className="w-3 h-3 text-[#0EA5E9]" />
          </div>
          <span className="text-[7px] md:text-[7.5px] font-bold text-[#0F172A] leading-tight max-w-[48px]">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function SceneOverlay({
  scene,
  index,
  progress,
}: {
  scene: Scene;
  index: number;
  progress: MotionValue<number>;
}) {
  const center = (index + 0.5) / N;
  const w = 1 / N;
  const opacity = useTransform(
    progress,
    [
      Math.max(0, center - w * 0.62),
      Math.max(0, center - w * 0.28),
      Math.min(1, center + w * 0.28),
      Math.min(1, center + w * 0.62),
    ],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [
      Math.max(0, center - w * 0.62),
      center,
      Math.min(1, center + w * 0.62),
    ],
    [60, 0, -60],
  );
  const scale = useTransform(
    progress,
    [
      Math.max(0, center - w * 0.62),
      center,
      Math.min(1, center + w * 0.62),
    ],
    [0.94, 1, 1.04],
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`pointer-events-none fixed inset-0 flex items-center justify-center px-6 md:px-12 py-10`}
    >
      <SceneContent scene={scene} />
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="size-1.5 rounded-full bg-primary animate-pulse" />
      {children}
    </span>
  );
}

function SceneContent({ scene }: { scene: Scene }) {
  if (scene.variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.5 }}
        className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-5 sm:p-6 lg:p-7 xl:p-8 w-full max-w-5xl relative overflow-hidden grid grid-cols-1 gap-6 lg:gap-8 items-center lg:grid-cols-12"
      >
        {/* Left column: story content */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-start">
          <div>
            <Kicker>STRATEGIC INNOVATION PARTNER</Kicker>
          </div>

          <h1 className="mt-3 text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-extrabold leading-[1.02] tracking-tight text-[#0F172A] font-display">
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
              >
                Cascade Tech:
              </motion.span>
            </div>
            <div className="overflow-hidden mt-0.5">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
              >
                Empowering Growth
              </motion.span>
            </div>
            <div className="overflow-hidden mt-0.5">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
              >
                Through <span className="text-[#0EA5E9]">Salesforce Expertise</span>
              </motion.span>
            </div>
            <div className="overflow-hidden mt-0.5">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
              >
                & <span className="text-[#2563EB]">AI Innovation</span>
              </motion.span>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-3 text-xs md:text-sm text-[#475569] font-semibold leading-relaxed max-w-xl"
          >
            Unlocking potential through strategic Salesforce solutions and next-generation AI voice technology.
          </motion.p>

          {/* Metrics Info Section with thin dividers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="grid grid-cols-2 gap-y-3 mt-4 pt-4 border-t border-slate-200/40"
          >
            {/* Item 1 */}
            <div className="flex flex-col pr-4">
              <span className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-[#0F172A] tracking-tight font-display">
                <CountUp value={50} suffix="+" delay={2.0} />
              </span>
              <span className="mt-0.5 text-[9px] md:text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                Projects Delivered
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col pl-6 border-l border-slate-200/40">
              <span className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-[#0F172A] tracking-tight font-display">
                <CountUp value={99} suffix="%" delay={2.1} />
              </span>
              <span className="mt-0.5 text-[9px] md:text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                Client Satisfaction
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col pr-4 pt-4 border-t border-slate-200/40 mt-0.5">
              <span className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-[#0F172A] tracking-tight font-display">
                <CountUp value={100} suffix="%" delay={2.2} />
              </span>
              <span className="mt-0.5 text-[9px] md:text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                Salesforce Experts
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col pl-6 border-t border-l border-slate-200/40 pt-4 mt-0.5">
              <span className="text-xl md:text-2xl lg:text-[26px] font-extrabold text-[#0F172A] tracking-tight font-display">
                Next-Gen
              </span>
              <span className="mt-0.5 text-[9px] md:text-[10px] font-bold text-[#475569] uppercase tracking-wider">
                AI Solutions
              </span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.6 }}
            className="mt-4 pt-3 border-t border-slate-200/20 flex items-center gap-3 text-[#475569]"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Scroll to explore</span>
            <ChevronDown className="size-4 animate-bounce text-[#0EA5E9]" />
          </motion.div>
        </div>

        {/* Right column: animated ecosystem node diagram */}
        <div className="lg:col-span-5 xl:col-span-6 flex justify-center items-center h-full">
          <EcosystemDiagram />
        </div>
      </motion.div>
    );
  }

  if (scene.variant === "final") {
    return (
      <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-5 sm:p-6 lg:p-8 w-full max-w-4xl flex flex-col items-center text-center">
        <Kicker>{scene.kicker}</Kicker>
        <h2 className="mt-4 text-3xl font-bold text-[#0F172A] md:text-4xl">
          {scene.title}
        </h2>
        <p className="mt-3 max-w-xl text-[#475569] font-medium text-sm md:text-base">{scene.subtitle}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          {scene.items?.map((it) => (
            <span
              key={it.title}
              className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#0F172A]"
            >
              <it.icon className="size-4 text-primary" />
              {it.title}
            </span>
          ))}
        </div>
        <div className="glass-panel mt-6 rounded-2xl px-6 py-4 text-left border border-slate-200/60 bg-white/50">
          <p className="text-xs uppercase tracking-[0.2em] text-[#475569] font-semibold">
            Contact
          </p>
          <p className="mt-1 text-base font-bold text-[#0F172A]">Yash Jain</p>
          <p className="text-sm font-semibold text-primary">CTO — Cascade Tech Ventures</p>
        </div>
        <a
          href="mailto:hello@cascadetech.ventures"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-14px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-transform hover:scale-[1.03]"
        >
          Let's Build The Future Together
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    );
  }

  if (scene.variant === "duo") {
    return (
      <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-5 sm:p-6 lg:p-8 w-full max-w-5xl">
        <Header scene={scene} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {scene.items?.map((it) => (
            <div key={it.title} className="glass-panel rounded-2xl p-5 border border-slate-200/50 bg-white/50">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <it.icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#0F172A]">{it.title}</h3>
              {it.body && (
                <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-[#475569] font-medium">
                  {it.body}
                </p>
              )}
            </div>
          ))}
        </div>
        {scene.stats && (
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {scene.stats.map((s) => (
              <div
                key={s.label}
                className="glass-chip rounded-xl px-5 py-2 text-center border border-slate-200/40 bg-white/40"
              >
                <div className="text-xl font-bold text-gradient">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wide text-[#475569] font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (scene.variant === "flow") {
    return (
      <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-5 sm:p-6 lg:p-8 w-full max-w-5xl">
        <Header scene={scene} />
        {scene.stats && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {scene.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="glass-panel rounded-2xl px-5 py-3 text-center border border-slate-200/50 bg-white/50">
                  <div className="text-lg font-bold text-primary">{s.value}</div>
                  <div className="text-xs font-semibold text-[#0F172A]">{s.label}</div>
                </div>
                {i < scene.stats!.length - 1 && (
                  <span className="text-primary/50 font-bold">→</span>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {scene.items?.map((it) => (
            <div key={it.title} className="glass-panel rounded-2xl p-5 border border-slate-200/50 bg-white/50">
              <it.icon className="size-5 text-primary" />
              <h3 className="mt-3 text-sm md:text-base font-bold text-[#0F172A]">{it.title}</h3>
              {it.body && (
                <p className="mt-1 text-xs text-[#475569] font-medium">{it.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // grid (default)
  return (
    <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-5 sm:p-6 lg:p-8 w-full max-w-5xl">
      <Header scene={scene} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scene.items?.map((it) => (
          <div
            key={it.title}
            className="glass-panel rounded-2xl p-5 border border-slate-200/50 bg-white/50 transition-transform hover:-translate-y-1"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <it.icon className="size-5 text-primary" />
            </div>
            <h3 className="mt-3 text-sm md:text-base font-bold text-[#0F172A]">{it.title}</h3>
            {it.body && (
              <p className="mt-1 text-xs leading-relaxed text-[#475569] font-medium">
                {it.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ scene }: { scene: Scene }) {
  return (
    <div className="max-w-2xl">
      <Kicker>{scene.kicker}</Kicker>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
        {scene.title}
      </h2>
      {scene.subtitle && (
        <p className="mt-3 text-base text-muted-foreground">{scene.subtitle}</p>
      )}
    </div>
  );
}

function ProgressDots({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(N - 1, Math.round(v * (N - 1))));
  });
  return (
    <div className="fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
      {SCENES.map((s, i) => (
        <button
          key={s.id}
          aria-label={`Go to ${s.title}`}
          onClick={() =>
            window.scrollTo({
              top: ((i + 0.5) / N) * (document.body.scrollHeight - window.innerHeight),
              behavior: "smooth",
            })
          }
          className="group flex items-center justify-end gap-2"
        >
          <span
            className={`h-1.5 rounded-full bg-primary transition-all ${
              i === active ? "w-7 opacity-100" : "w-1.5 opacity-30 group-hover:opacity-60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => setMounted(true), []);

  return (
    <div ref={containerRef} style={{ height: `${N * 100}vh` }} className="relative">
      {/* Fixed 3D world */}
      <div className="fixed inset-0 z-0 ambient-glow">
        {mounted && (
          <Canvas
            dpr={[1, 1.8]}
            camera={{ position: [0, 14, 60], fov: 52, near: 0.1, far: 600 }}
            gl={{ antialias: true, alpha: false }}
          >
            <CityScene progress={progressRef} />
          </Canvas>
        )}
      </div>

      {/* Top brand bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="glass-chip pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">
            C
          </span>
          <span className="text-sm font-bold tracking-tight text-foreground">
            Cascade Tech
          </span>
        </div>
        <span className="glass-chip pointer-events-auto hidden rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground sm:block">
          Salesforce · AI Voice · Analytics
        </span>
      </div>

      {/* Scene overlays */}
      {SCENES.map((scene, i) => (
        <SceneOverlay key={scene.id} scene={scene} index={i} progress={scrollYProgress} />
      ))}

      <ProgressDots progress={scrollYProgress} />

      {/* Bottom progress bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 h-1 bg-border/40">
        <motion.div
          style={{ scaleX: barScaleX, transformOrigin: "0% 50%" }}
          className="h-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </div>
  );
}

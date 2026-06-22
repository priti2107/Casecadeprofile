import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  Check,
  Sparkles,
  Volume2,
  Clock,
  Phone,
  Mic,
  TrendingUp,
  BarChart3,
  Headset,
  Workflow,
  Users,
  Search,
  Code,
  ChevronRight,
  Cloud,
  Layers,
} from "lucide-react";
import CityScene from "./CityScene";
import { SCENES, type Scene } from "./scenes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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



function SceneOverlay({
  scene,
  index,
  progress,
  active,
}: {
  scene: Scene;
  index: number;
  progress: MotionValue<number>;
  active: number;
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

  const shouldRender = Math.abs(active - index) <= 1;
  if (!shouldRender) return null;

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
        className="pointer-events-auto hero-glass-panel rounded-[32px] w-[92vw] md:w-[90vw] h-[86vh] md:h-[80vh] max-w-7xl relative overflow-hidden flex flex-col md:flex-row p-8 md:p-10 justify-center gap-6 md:gap-10"
      >
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full text-left">
          {/* Top content */}
          <div className="flex flex-col justify-start">
            {/* Kicker Pill */}
            <div className="inline-flex items-center gap-1.5 bg-[#F0F9FF] border border-[#E0F2FE] rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-[#0369A1] w-fit mb-2">
              <span className="size-1.5 rounded-full bg-[#0284C7] animate-pulse" />
              Salesforce Partner &bull; AI Voice Platform
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[44px] font-[800] leading-[1.08] tracking-tight text-[#0F172A] font-display">
              Empowering <br />
              Growth Through <br />
              <span className="text-[#0284C7]">Salesforce Expertise</span> <br />
              & AI Innovation
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="mt-2 text-xs sm:text-sm text-[#475569] font-medium leading-relaxed max-w-md"
            >
              Unlocking potential through strategic Salesforce solutions and next-generation AI voice technology.
            </motion.p>

            {/* Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9 }}
              className="mt-3.5 flex flex-wrap gap-3 pointer-events-auto"
            >
              <button
                onClick={() =>
                  window.scrollTo({
                    top: (1.5 / N) * (document.body.scrollHeight - window.innerHeight),
                    behavior: "smooth",
                  })
                }
                className="bg-[#0284C7] hover:bg-[#0369A1] text-xs font-bold py-2.5 px-5 rounded-full inline-flex items-center gap-2 shadow-lg shadow-sky-500/10 transition-all duration-300 hover:scale-[1.03]"
              >
                Start a conversation
                <ArrowUpRight className="size-3.5" />
              </button>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: (6.5 / N) * (document.body.scrollHeight - window.innerHeight),
                    behavior: "smooth",
                  })
                }
                className="border border-[#E0F2FE] bg-white hover:bg-slate-50 text-[#0284C7] text-xs font-bold py-2.5 px-5 rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                Explore AI Voice
              </button>
            </motion.div>
          </div>

          {/* Bottom elements (Stats & scroll indicator) */}
          <div className="flex flex-col gap-3 mt-auto">
            {/* Statistics Row - Premium Mini KPI Cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-200/40 w-full"
            >
              {/* KPI Card 1 */}
              <div className="bg-white/80 hover:bg-white border border-[#E2E8F0] rounded-[16px] p-2.5 flex flex-col justify-between text-left shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-default">
                <div className="size-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center mb-1.5 shadow-sm shadow-sky-500/10">
                  <CloudCog className="size-3.5" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-[800] text-[#0F172A] font-display leading-none">
                    <CountUp value={6} suffix="+" delay={2.3} />
                  </span>
                  <span className="block text-[9px] font-bold text-[#475569] mt-0.5 leading-tight">
                    Salesforce Clouds
                  </span>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 bg-[#F0F9FF] text-[#0284C7] rounded-full px-1.5 py-0.5 text-[7px] font-bold tracking-wide w-fit">
                  <Check className="size-2 text-[#0284C7] stroke-[3]" />
                  <span>Enterprise Ready</span>
                </div>
              </div>

              {/* KPI Card 2 */}
              <div className="bg-white/80 hover:bg-white border border-[#E2E8F0] rounded-[16px] p-2.5 flex flex-col justify-between text-left shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-default">
                <div className="size-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center mb-1.5 shadow-sm shadow-sky-500/10">
                  <BarChart3 className="size-3.5" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-[800] text-[#0F172A] font-display leading-none">
                    70-90%
                  </span>
                  <span className="block text-[9px] font-bold text-[#475569] mt-0.5 leading-tight">
                    Cost Savings
                  </span>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 bg-[#F0F9FF] text-[#0284C7] rounded-full px-1.5 py-0.5 text-[7px] font-bold tracking-wide w-fit">
                  <Check className="size-2 text-[#0284C7] stroke-[3]" />
                  <span>Proven ROI</span>
                </div>
              </div>

              {/* KPI Card 3 */}
              <div className="bg-white/80 hover:bg-white border border-[#E2E8F0] rounded-[16px] p-2.5 flex flex-col justify-between text-left shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-default">
                <div className="size-7 rounded-full bg-[#0284C7] text-white flex items-center justify-center mb-1.5 shadow-sm shadow-sky-500/10">
                  <Headset className="size-3.5" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-[800] text-[#0F172A] font-display leading-none">
                    24/7
                  </span>
                  <span className="block text-[9px] font-bold text-[#475569] mt-0.5 leading-tight">
                    AI Voice Agents
                  </span>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 bg-[#F0F9FF] text-[#0284C7] rounded-full px-1.5 py-0.5 text-[7px] font-bold tracking-wide w-fit">
                  <Check className="size-2 text-[#0284C7] stroke-[3]" />
                  <span>Always On</span>
                </div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.6 }}
              className="pt-1.5 flex items-center gap-2 text-[#0284C7] font-bold tracking-wider text-[10px]"
            >
              <span>Scroll to explore</span>
              <ChevronDown className="size-4 animate-bounce text-[#0284C7]" />
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE (50%) - LIVE CONSOLE REDESIGNED */}
        <div className="hidden md:flex md:w-1/2 flex-col h-full rounded-2xl border border-white/60 bg-[#F8FAFC]/90 shadow-inner p-6 md:p-7 relative overflow-visible">
          {/* Floating Claude AI badge (top-left edge, overlapping Card 1) */}
          <div className="absolute -left-6 top-[20%] bg-white/95 border border-slate-100 rounded-[16px] py-2 px-3 shadow-lg flex items-center gap-3 z-15 animate-float-slow hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-default">
            <div className="size-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-md shadow-sky-500/10">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-black text-slate-800 leading-none">Claude AI</span>
              <span className="block text-[8px] text-slate-400 font-bold mt-1 leading-none">
                Real-time NLU
              </span>
            </div>
          </div>

          {/* Floating +44% Conversion badge (bottom-right edge) */}
          <div className="absolute -right-4 bottom-[6%] bg-white/95 border border-slate-100 rounded-2xl p-2.5 shadow-xl flex items-center gap-2 max-w-[190px] text-left z-15 animate-float-slow hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
            <div className="size-7 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100">
              <TrendingUp className="size-4 text-[#10B981]" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-[#10B981] leading-none">+44% Conversion</p>
              <p className="text-[8px] font-bold text-slate-400 mt-1 leading-none">AI-assisted leads</p>
            </div>
          </div>

          {/* Console Header */}
          <div className="flex items-center justify-between border-b border-slate-200/40 pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5 rounded-full bg-[#EF4444]/90" />
              <div className="size-2.5 rounded-full bg-[#F59E0B]/90" />
              <div className="size-2.5 rounded-full bg-[#10B981]/90" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono">
              cascade.cloud / dashboard
            </span>
          </div>

          {/* Grid Layout of Status Cards - Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            {/* Card 1: Claude AI */}
            <div className="relative bg-white border border-slate-100 rounded-2xl p-4 pt-7 shadow-sm hover:shadow-md hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left cursor-default">
              <div className="flex items-start justify-between">
                <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100">
                  <BarChart3 className="size-4 text-[#0284C7]" />
                </div>
                <span className="absolute top-3 right-3 text-[8px] font-extrabold text-[#10B981] bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  +18%
                </span>
              </div>

              <div className="mt-3">
                <p className="text-base md:text-lg font-black text-slate-800 font-display leading-none">$4.2M</p>
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-wider mt-1.5">Pipeline</p>
              </div>
            </div>

            {/* Card 2: Closed */}
            <div className="relative bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left cursor-default">
              <div className="flex items-start justify-between">
                <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100">
                  <Clock className="size-4 text-[#0284C7]" />
                </div>
                <span className="absolute top-3 right-3 text-[8px] font-extrabold text-[#10B981] bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  +9%
                </span>
              </div>
              <div className="mt-3">
                <p className="text-base md:text-lg font-black text-slate-800 font-display leading-none">312</p>
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-wider mt-1.5">Closed</p>
              </div>
            </div>

            {/* Card 3: AI Calls */}
            <div className="relative bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left cursor-default">
              <div className="flex items-start justify-between">
                <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100">
                  <Phone className="size-4 text-[#0284C7]" />
                </div>
                <span className="absolute top-3 right-3 text-[8px] font-extrabold text-[#10B981] bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  +44%
                </span>
              </div>
              <div className="mt-3">
                <p className="text-base md:text-lg font-black text-slate-800 font-display leading-none">8,914</p>
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-wider mt-1.5">AI Calls</p>
              </div>
            </div>
          </div>

          {/* Lead Conversion Rounded Column Chart - Row 2 */}
          <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between text-left cursor-default">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold text-slate-700 tracking-wider">Lead &rarr; Conversion</span>
              <span className="text-[8px] font-bold text-slate-400">Last 30 days</span>
            </div>
            
            <div className="flex items-end justify-between h-28 w-full mt-2 pt-2 px-1">
              {[
                { h: "20%" },
                { h: "35%" },
                { h: "28%" },
                { h: "45%" },
                { h: "55%" },
                { h: "35%" },
                { h: "70%" },
                { h: "60%" },
                { h: "85%" },
                { h: "75%" },
                { h: "95%" },
              ].map((bar, idx) => (
                <div
                  key={idx}
                  style={{ height: bar.h }}
                  className="w-[7%] bg-[#0EA5E9] rounded-t-full transition-all duration-500 hover:bg-[#38BDF8]"
                />
              ))}
            </div>
          </div>

          {/* Grid Layout - Row 3 */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Live AI Voice */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between cursor-default">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Mic className="size-3.5 text-[#0EA5E9]" />
                <span className="text-[9px] md:text-[10px] font-extrabold text-slate-800 tracking-wider">Live AI Voice</span>
              </div>
              
              {/* Waveform visual */}
              <div className="flex items-end justify-between h-8 mt-2 px-1">
                {[3, 6, 4, 7, 5, 8, 4, 6, 5, 7, 3, 5].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#0EA5E9] rounded-full animate-pulse"
                    style={{
                      height: `${h * 10}%`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Salesforce Sync checklist */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between cursor-default">
              <div className="flex items-center gap-1.5 mb-1.5">
                <CloudCog className="size-3.5 text-[#0EA5E9]" />
                <span className="text-[9px] md:text-[10px] font-extrabold text-slate-800 tracking-wider">Salesforce Sync</span>
              </div>
              
              <div className="flex flex-col gap-1.5 mt-1">
                {[
                  "Contact updated",
                  "Opportunity created",
                  "Case logged",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2 text-[9px] font-bold text-slate-600">
                    <div className="size-3.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                      <Check className="size-2" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Glow reflection element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-gradient-to-r from-transparent via-[#74CBF4] to-transparent shadow-[0_-4px_30px_rgba(116,203,244,0.95),0_0_15px_rgba(116,203,244,1)] opacity-95 rounded-full pointer-events-none" />
      </motion.div>
    );
  }

  if (scene.variant === "final") {
    return (
      <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-6 sm:p-8 lg:p-10 w-full max-w-5xl flex flex-col items-center text-center">
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
      <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-6 sm:p-8 lg:p-10 w-full max-w-5xl">
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
      <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-6 sm:p-8 lg:p-10 w-full max-w-5xl">
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

  if (scene.id === 2) {
    return (
      <div className="pointer-events-auto who-we-are-glass-panel rounded-[40px] w-[92vw] md:w-[90vw] h-[86vh] md:h-[80vh] max-w-7xl relative overflow-hidden flex flex-col p-8 md:p-12 justify-between">
        {/* TOP ROW: Content (55%) + Dashboard (45%) */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-between h-[48%] md:h-[50%] w-full">
          {/* LEFT SIDE: Content (55% width) */}
          <div className="w-full md:w-[55%] flex flex-col justify-center text-left max-w-[600px]">
            <div className="inline-flex items-center gap-2 bg-[#F0F9FF] border border-[#E0F2FE] rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-[#0369A1] w-fit mb-4">
              <span className="size-2 rounded-full bg-[#0284C7] animate-pulse" />
              {scene.kicker}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[42px] xl:text-[48px] font-[800] leading-[1.08] tracking-tight text-[#0F172A] font-display max-w-[600px] mb-3">
              Built for the Modern Enterprise
            </h2>
            <div className="w-16 h-[3px] bg-[#0284C7] rounded mb-4" />

            <p className="text-sm md:text-base text-[#475569] font-medium leading-relaxed max-w-[550px]">
              Cascade Tech Ventures combines deep Salesforce craftsmanship with cutting-edge AI to help organizations grow, scale, and operate with precision.
            </p>
          </div>

          {/* RIGHT SIDE: Floating Dashboard Panel (45% width, reduced height and width) */}
          <div className="w-full md:w-[43%] flex flex-col h-full rounded-2xl border border-white/60 bg-[#F8FAFC]/90 shadow-inner p-4 relative overflow-visible max-h-[90%] justify-between">
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-slate-200/40 pb-2 mb-2">
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-[#EF4444]/90" />
                <div className="size-2 rounded-full bg-[#F59E0B]/90" />
                <div className="size-2 rounded-full bg-[#10B981]/90" />
              </div>
              <span className="text-[9px] font-bold text-slate-400 tracking-wider font-mono">
                cascade.cloud / performance
              </span>
            </div>

            {/* Dashboard Widgets Grid - Compact sizing */}
            <div className="grid grid-cols-2 gap-2.5 h-[calc(100%-25px)] content-center">
              {/* CRM Performance Card */}
              <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">CRM Performance</span>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded-full">+24%</span>
                </div>
                <p className="text-base md:text-lg lg:text-xl font-black text-slate-800 mt-0.5 font-display leading-none">99.8% Sync</p>
                <p className="text-[8px] text-slate-400 mt-0.5 font-medium">Real-time Health Check</p>
              </div>

              {/* Workflow Automation Metrics */}
              <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Workflows Active</span>
                  <span className="text-[8px] font-bold text-sky-600 bg-sky-50 px-1 rounded-full">Active</span>
                </div>
                <p className="text-base md:text-lg lg:text-xl font-black text-slate-800 mt-0.5 font-display leading-none">1,420 / hr</p>
                <p className="text-[8px] text-slate-400 mt-0.5 font-medium">Auto-routing tasks</p>
              </div>

              {/* Customer Growth Analytics */}
              <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Customer Growth</span>
                  <span className="text-[8px] font-bold text-[#10B981] bg-emerald-50 px-1.5 rounded-full">+120%</span>
                </div>
                <div className="flex items-end justify-between h-6 mt-1.5 px-0.5">
                  {[20, 45, 30, 55, 60, 40, 80].map((h, i) => (
                    <div key={i} className="w-[8%] bg-[#0EA5E9] rounded-t-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* Salesforce Ecosystem Overview */}
              <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Ecosystem Link</span>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded-full">Secure</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-2 h-6">
                  <div className="size-5 rounded bg-sky-50 border border-sky-100 flex items-center justify-center">
                    <Cloud className="size-3 text-[#0284C7]" />
                  </div>
                  <div className="h-[1px] bg-slate-200 flex-grow relative">
                    <div className="absolute top-1/2 -translate-y-1/2 left-[40%] size-1 bg-[#0284C7] rounded-full animate-ping" />
                  </div>
                  <div className="size-5 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <Sparkles className="size-3 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* AI Process Optimization Chart (Col span 2) */}
              <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 text-left col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">AI Process Optimization</span>
                  <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 rounded-full">-35% Latency</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0284C7] h-full rounded-full w-[85%]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: 3 Enterprise Feature Cards (height: ~42%) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[42%] w-full items-stretch mt-12 md:mt-16">
          {scene.items?.map((it, idx) => {
            const titleText = idx === 0 
              ? "Tailored Digital Transformation" 
              : idx === 1 
              ? "Enhanced Operational Efficiency" 
              : "CRM Expertise for Success";

            const descText = idx === 0
              ? "Custom Salesforce strategies designed around your operating model, your customers, and your growth targets — never templated."
              : idx === 1
              ? "Automate manual workflows, eliminate data silos, and free your teams to focus on revenue-generating activity."
              : "Deep multi-cloud Salesforce expertise — from architecture and implementation to managed support and optimization.";

            return (
              <div
                key={it.title}
                className="bg-white/80 hover:bg-white border border-[#E2E8F0] rounded-2xl p-5 md:p-6 flex flex-col justify-between text-left shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex-1 h-full"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 flex-shrink-0">
                      <it.icon className="size-5 text-[#0284C7]" />
                    </div>
                    <h3 className="text-sm md:text-base lg:text-lg font-[800] text-[#0F172A] leading-tight">
                      {titleText}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs md:text-sm leading-relaxed text-[#475569] font-medium">
                    {descText}
                  </p>
                </div>

                {/* Mini visual component anchored to card bottom */}
                <div className="mt-auto pt-4">
                  {idx === 0 && (
                    <div className="flex items-center justify-between w-full bg-slate-50/50 px-2.5 py-3 rounded-xl border border-slate-100 text-[10px] md:text-xs font-bold text-[#475569]">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100 shadow-sm">
                          <Search className="size-3.5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 mt-1">Discovery</span>
                      </div>
                      <ChevronRight className="size-3 text-slate-400" />
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100 shadow-sm">
                          <Layers className="size-3.5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 mt-1">Architecture</span>
                      </div>
                      <ChevronRight className="size-3 text-slate-400" />
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-100 shadow-sm">
                          <Code className="size-3.5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-600 mt-1">Build</span>
                      </div>
                      <ChevronRight className="size-3 text-slate-400" />
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="size-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm animate-pulse">
                          <Check className="size-3.5" />
                        </div>
                        <span className="text-[9px] font-bold text-emerald-600 mt-1">Adopt</span>
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    <div className="flex flex-col gap-1 w-full bg-slate-50/50 px-2.5 py-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-[10px] md:text-xs font-extrabold text-[#475569]">
                        <span>Automation Gains</span>
                        <span className="text-[#10B981] font-black text-xs">↓ 65% Operations</span>
                      </div>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-slate-400 font-bold w-20">Manual Hours</span>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-slate-300 h-full rounded-full w-[30%]" />
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold w-6 text-right">30%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-[#0284C7] font-bold w-20">Automated</span>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#0284C7] h-full rounded-full w-[85%]" />
                          </div>
                          <span className="text-[9px] text-[#0284C7] font-bold w-6 text-right">85%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    <div className="flex items-center justify-around w-full bg-slate-50/50 px-2.5 py-3 rounded-xl border border-slate-100 text-[10px] font-bold uppercase text-[#475569] tracking-wider">
                      <div className="flex flex-col items-center gap-1">
                        <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <Target className="size-3.5 text-[#0284C7]" />
                        </div>
                        <span className="text-[8px] md:text-[9px] font-bold text-slate-500 mt-1">Sales Cloud</span>
                      </div>
                      <div className="h-[1px] bg-slate-200 flex-grow max-w-[30px] mx-1 border-dashed border-sky-300 border-t" />
                      <div className="flex flex-col items-center gap-1">
                        <div className="size-8.5 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center border border-sky-200 shadow-md animate-pulse">
                          <Headset className="size-4 text-[#0284C7]" />
                        </div>
                        <span className="text-[8px] md:text-[9px] font-black text-[#0284C7] mt-1">Service Cloud</span>
                      </div>
                      <div className="h-[1px] bg-slate-200 flex-grow max-w-[30px] mx-1 border-dashed border-sky-300 border-t" />
                      <div className="flex flex-col items-center gap-1">
                        <div className="size-7 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <Megaphone className="size-3.5 text-[#0284C7]" />
                        </div>
                        <span className="text-[8px] md:text-[9px] font-bold text-slate-500 mt-1">Marketing Cloud</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Glow reflection element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-gradient-to-r from-transparent via-[#74CBF4] to-transparent shadow-[0_-4px_30px_rgba(116,203,244,0.95),0_0_15px_rgba(116,203,244,1)] opacity-95 rounded-full pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="pointer-events-auto glass-panel shadow-[0_30px_90px_rgba(15,23,42,0.06)] rounded-[32px] p-6 sm:p-8 lg:p-10 w-full max-w-5xl">
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

function ProgressDots({ progress, active }: { progress: MotionValue<number>; active: number }) {
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
            className={`h-1.5 rounded-full bg-primary transition-all ${i === active ? "w-7 opacity-100" : "w-1.5 opacity-30 group-hover:opacity-60"
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
  const [initStage, setInitStage] = useState(0);
  const [active, setActive] = useState(0);

  // Stage 1: mounted
  useLayoutEffect(() => {
    if (initStage === 0) {
      console.log("mounted")
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      try {
        sessionStorage.removeItem("tsr-scroll-restoration-v1_3");
      } catch (e) { }

      // Scroll immediately
      window.scrollTo(0, 0);

      // Scroll after a small timeout to let browser layout/restoration register
      const t = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 60);

      setInitStage(1);
      return () => clearTimeout(t);
    }
  }, [initStage]);

  // Stage 2: layout ready
  useLayoutEffect(() => {
    if (initStage === 1) {
      console.log("layout ready")
      setInitStage(2);
    }
  }, [initStage]);

  // Stage 3: gsap initialized
  useLayoutEffect(() => {
    if (initStage === 2) {
      console.log("gsap initialized")
      setInitStage(3);
    }
  }, [initStage]);

  // Stage 4: scrolltrigger initialized
  useLayoutEffect(() => {
    if (initStage === 3) {
      ScrollTrigger.refresh();
      console.log("scrolltrigger initialized")
      setInitStage(4);
    }
  }, [initStage]);

  // Stage 5: camera initialized
  useLayoutEffect(() => {
    if (initStage === 4) {
      console.log("camera initialized")
      setInitStage(5);
    }
  }, [initStage]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
    setActive(Math.min(N - 1, Math.round(v * (N - 1))));
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
            <CityScene progress={progressRef} isCameraReady={initStage >= 5} />
          </Canvas>
        )}
      </div>

      {/* Top brand bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 md:px-12 max-w-7xl mx-auto w-full left-1/2 -translate-x-1/2">
        {/* Logo */}
        <div className="glass-chip pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2 shadow-sm">
          <div className="size-6 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white">
            <Sparkles className="size-3.5 text-white" />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-[#0F172A]">
            Cascade Tech
          </span>
        </div>

        {/* Center Links */}
        <div className="glass-chip pointer-events-auto hidden md:flex items-center gap-6 rounded-full px-6 py-2 shadow-sm text-xs font-bold text-[#475569]">
          <button className="hover:text-[#0F172A] transition-colors cursor-pointer bg-transparent border-0 p-0">Who We Are</button>
          <button className="hover:text-[#0F172A] transition-colors cursor-pointer bg-transparent border-0 p-0">Specializations</button>
          <button className="hover:text-[#0F172A] transition-colors cursor-pointer bg-transparent border-0 p-0">AI Voice</button>
          <button className="hover:text-[#0F172A] transition-colors cursor-pointer bg-transparent border-0 p-0">Pricing</button>
          <button className="hover:text-[#0F172A] transition-colors cursor-pointer bg-transparent border-0 p-0">Roadmap</button>
        </div>

        {/* Get in touch Button */}
        <button className="pointer-events-auto bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-bold py-2.5 px-5 rounded-full shadow-md shadow-sky-500/10 transition-all duration-300 hover:scale-[1.03]">
          Get in touch
        </button>
      </div>

      {/* Scene overlays */}
      {SCENES.map((scene, i) => (
        <SceneOverlay key={scene.id} scene={scene} index={i} progress={scrollYProgress} active={active} />
      ))}

      <ProgressDots progress={scrollYProgress} active={active} />

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

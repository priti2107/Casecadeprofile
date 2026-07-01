import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { INDUSTRIES_SHOWCASE_DATA, IndustryData } from "./industryData";
import WorkflowVisualizer3D from "./WorkflowVisualizer3D";
import {
  Home,
  Building2,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Landmark,
  Check,
  ArrowRight,
  TrendingUp
} from "lucide-react";

// Map iconName to Lucide components
const IconMap = {
  Home,
  Building2,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Landmark,
};

export default function IndustriesShowcase() {
  const [selectedId, setSelectedId] = useState<string>("real-estate");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

  // Auto-highlight loop on first mount
  useEffect(() => {
    if (hasInteracted) return;

    const sequence = INDUSTRIES_SHOWCASE_DATA.map((d) => d.id);
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % sequence.length;
      setSelectedId(sequence[index]);

      // Stop once we wrap back around to the first item (after demonstrating all)
      if (index === 0) {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [hasInteracted]);

  // Arrow timer
  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const currentIndustry = INDUSTRIES_SHOWCASE_DATA.find((ind) => ind.id === selectedId) || INDUSTRIES_SHOWCASE_DATA[0];
  const IconComponent = IconMap[currentIndustry.iconName];

  return (
    <div
      className="pointer-events-auto rounded-[32px] w-[92vw] md:w-[90vw] h-[88vh] md:h-[82vh] max-w-7xl relative overflow-hidden flex flex-col pt-3 pb-3 px-4 md:px-7 justify-between gap-2.5 border border-slate-100/80 shadow-[0_30px_90px_rgba(15,23,42,0.04)] bg-white/95"
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)",
      }}
    >
      {/* Soft ambient glows */}
      <div
        className="absolute right-[-10%] top-[5%] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-[-5%] bottom-[-5%] w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

       <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        @keyframes activePillPulse {
          0%, 100% {
            box-shadow: 0 0 16px rgba(14, 165, 233, 0.25);
            transform: scale(1.03);
          }
          50% {
            box-shadow: 0 0 26px rgba(14, 165, 233, 0.55), 0 0 8px rgba(14, 165, 233, 0.3);
            transform: scale(1.05);
          }
        }
        .active-pill-pulse {
          animation: activePillPulse 4s ease-in-out infinite;
        }
      `}} />

      {/* TOP: Header Row */}
      <div className="w-full flex flex-col justify-start text-left max-w-full relative z-10 shrink-0">
        <div className="text-[10px] font-bold tracking-widest text-[#0ea5e9] uppercase mb-0.5">
          INDUSTRIES WE SERVE
        </div>
        <h2 className="text-[30px] sm:text-[38px] md:text-[44px] font-[900] leading-tight tracking-tight text-[#0F172A] font-display">
          Enterprise Salesforce Showcase. <span className="text-[#0ea5e9]">Built for Scale.</span>
        </h2>
        <p className="text-[14px] text-slate-500 font-semibold leading-relaxed max-w-3xl mt-1">
          Select any sector below to inspect its dedicated Salesforce implementation path, core capabilities, and verified business outcomes.
        </p>
      </div>

      {/* MID: Two Column Showcase Container */}
      <div className="flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 items-stretch relative z-10 py-1">

        {/* LEFT COLUMN: Glassmorphism Info Card */}
        <div className="min-h-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-sky-100/40 via-blue-50/25 to-sky-100/30 backdrop-blur-2xl border border-sky-200/50 shadow-[0_8px_32px_0_rgba(14,165,233,0.08),inset_0_0_12px_rgba(56,189,248,0.12)] p-4 md:p-5 relative overflow-y-auto hide-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndustry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-3.5 h-full justify-start"
            >
              {/* Header with Title and Icon */}
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-xl bg-sky-100 flex items-center justify-center border border-sky-200 text-[#0ea5e9] shadow-sm">
                    <IconComponent className="size-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-sky-600 uppercase block leading-none">
                      {currentIndustry.subtitle}
                    </span>
                    <h3 className="text-[18px] font-extrabold text-[#03045E] mt-0.5 leading-tight">
                      {currentIndustry.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[16px] leading-relaxed text-slate-600 font-semibold mt-3">
                  {currentIndustry.desc}
                </p>
              </div>

              {/* Key Capabilities */}
              <div className="border-t border-slate-100/80 pt-4 flex-1 flex flex-col justify-start">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">
                  Capabilities
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentIndustry.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="text-[10.5px] font-extrabold text-sky-800 bg-sky-50/60 border border-sky-100/40 px-3 py-1.5 rounded-xl hover:bg-sky-100/80 hover:border-sky-200 hover:shadow-sm transition-all duration-300 cursor-default"
                    >
                      {cap}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: 3D Animated Workflow Showstopper */}
        <div className="rounded-2xl border border-sky-200/50 bg-gradient-to-br from-sky-100/40 via-blue-50/25 to-sky-100/30 backdrop-blur-2xl overflow-hidden relative shadow-[0_8px_32px_0_rgba(14,165,233,0.08),inset_0_0_12px_rgba(56,189,248,0.12)] flex flex-col justify-between">
          <WorkflowVisualizer3D
            architecture={currentIndustry.architecture}
            industryId={currentIndustry.id}
          />
        </div>
      </div>

      {/* BOTTOM: Horizontal Industry Tab Selector */}
      <div className="w-full relative z-10 shrink-0 border-t border-slate-100/80 pt-2 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2 text-slate-400 select-none">
          <span className="text-[10px] font-black uppercase tracking-widest">
            Select an industry to explore its Salesforce implementation
          </span>
          {showArrow && (
            <span className="text-[#0ea5e9] font-black text-[12px] animate-bounce block">
              ↓
            </span>
          )}
        </div>
        <div className="flex gap-3 items-center overflow-x-auto py-3 scrollbar-thin select-none justify-between md:justify-center w-full">
          {INDUSTRIES_SHOWCASE_DATA.map((ind) => {
            const IndIcon = IconMap[ind.iconName];
            const isSelected = ind.id === selectedId;

            return (
              <button
                key={ind.id}
                onClick={() => { setSelectedId(ind.id); setHasInteracted(true); }}
                className={`relative flex items-center gap-2.5 px-4.5 py-3 rounded-2xl transition-all duration-300 border cursor-pointer shrink-0 ${isSelected
                    ? "bg-sky-50 border-sky-300 text-sky-700 active-pill-pulse"
                    : "bg-white/40 border-slate-200/50 hover:bg-slate-50/60 hover:border-slate-300 hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(14,165,233,0.08)] hover:-translate-y-[1px] text-slate-600 active:scale-95"
                  }`}
              >
                {/* Tooltip Badge */}
                {isSelected && !hasInteracted && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0ea5e9] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-md shadow-md animate-bounce whitespace-nowrap z-50">
                    Click to Explore
                  </span>
                )}
                <div
                  className={`size-7 rounded-xl flex items-center justify-center transition-colors ${isSelected ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400"
                    }`}
                >
                  <IndIcon className="size-4" />
                </div>
                <span className="text-[13px] md:text-[14px] font-black tracking-tight">
                  {ind.title.split(" & ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

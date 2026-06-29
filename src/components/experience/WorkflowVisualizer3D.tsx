import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cloud, Zap, Award } from "lucide-react";

interface ArchitectureData {
  challenges: string[];
  solutions: string[];
  outcomes: string[];
}

interface WorkflowDiagramProps {
  architecture: ArchitectureData;
  industryId: string;
}

export default function WorkflowVisualizer3D({ architecture, industryId }: WorkflowDiagramProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle active workflow step (challenges, solutions, and outcomes cycle together)
  useEffect(() => {
    setActiveIdx(0);
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [industryId]);

  const challenges = architecture.challenges || [];
  const solutions = architecture.solutions || [];
  const outcomes = architecture.outcomes || [];

  return (
    <div 
      className="relative w-full h-full min-h-0 p-6 md:p-8 flex flex-col justify-between select-none overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50/30 via-white/40 to-blue-50/20 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(14, 165, 233, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(14, 165, 233, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px"
      }}
    >
      {/* Soft background blue ambient glows */}
      <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none -z-10 bg-sky-200/10" />
      <div className="absolute bottom-[10%] right-[10%] w-[200px] h-[200px] rounded-full blur-3xl pointer-events-none -z-10 bg-indigo-200/10" />

      {/* Floating Salesforce Cloud badges */}
      <div className="absolute top-8 left-8 pointer-events-none opacity-20 select-none animate-[float_8s_ease-in-out_infinite]">
        <div className="flex items-center gap-1 text-[8.5px] font-bold text-sky-600 bg-white/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-sky-100/50 shadow-sm">
          <Cloud className="size-2" />
          <span>Sales Cloud</span>
        </div>
      </div>
      <div className="absolute top-16 right-8 pointer-events-none opacity-20 select-none animate-[float_10s_ease-in-out_infinite_1.5s]">
        <div className="flex items-center gap-1 text-[8.5px] font-bold text-[#e2a857] bg-white/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-100/50 shadow-sm">
          <Award className="size-2" />
          <span>Einstein AI</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}} />

      {/* Dynamic Animated Flow Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="gradient-left-center-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gradient-center-right-active" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Faint static blueprint background lines for all items */}
        {challenges.map((_, i) => {
          const startY = 20 + i * 15;
          const endY = 36 + (i % solutions.length) * 12.5;
          return (
            <path
              key={`line-bg-l-${i}`}
              d={`M 25% ${startY}% C 37% ${startY}%, 37% ${endY}%, 49% ${endY}%`}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="opacity-20"
            />
          );
        })}

        {solutions.map((_, i) => {
          const startY = 36 + i * 12.5;
          const endY = 20 + (i % outcomes.length) * 15;
          return (
            <path
              key={`line-bg-r-${i}`}
              d={`M 51% ${startY}% C 63% ${startY}%, 63% ${endY}%, 75% ${endY}%`}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="opacity-20"
            />
          );
        })}

        {/* ACTIVE glowing flowing line: Challenge -> Solution -> Outcome */}
        {(() => {
          const lStartY = 20 + activeIdx * 15;
          const lEndY = 36 + (activeIdx % solutions.length) * 12.5;
          const rStartY = 36 + (activeIdx % solutions.length) * 12.5;
          const rEndY = 20 + activeIdx * 15;

          return (
            <g>
              {/* Left flowing line */}
              <path
                d={`M 25% ${lStartY}% C 37% ${lStartY}%, 37% ${lEndY}%, 49% ${lEndY}%`}
                fill="none"
                stroke="url(#gradient-left-center-active)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                style={{
                  animation: "dash-flow 1.5s linear infinite"
                }}
              />
              {/* Right flowing line */}
              <path
                d={`M 51% ${rStartY}% C 63% ${rStartY}%, 63% ${rEndY}%, 75% ${rEndY}%`}
                fill="none"
                stroke="url(#gradient-center-right-active)"
                strokeWidth="2.5"
                strokeDasharray="8 4"
                style={{
                  animation: "dash-flow 1.5s linear infinite"
                }}
              />
            </g>
          );
        })()}
      </svg>

      {/* TOP: Header Row */}
      <div className="flex items-center justify-between border-b border-sky-100/60 pb-3 mb-4 shrink-0 relative z-10">
        <div>
          <span className="text-[9px] font-black text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded border border-sky-100/80">
            Salesforce Implementation Journey
          </span>
          <h3 className="text-xs font-bold text-slate-500 mt-1">Interactive Architecture Workflow</h3>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
          <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Journey Tracking</span>
        </div>
      </div>

      {/* Main 3 Column Architecture Grid */}
      <div className="grid grid-cols-3 gap-6 relative z-10 items-stretch flex-1 my-auto">
        
        {/* LEFT COLUMN: Challenges */}
        <div className="flex flex-col gap-2.5 justify-center">
          <div className="text-center mb-1">
            <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded border border-rose-100/80">
              Industry Challenges
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {challenges.map((challenge, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <motion.div
                    key={challenge + industryId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className={`group relative backdrop-blur-md transition-all duration-300 rounded-xl py-1.5 px-3 text-center cursor-help shadow-sm border ${
                      isActive 
                        ? "scale-[1.03] bg-rose-50/70 border-rose-400 shadow-md shadow-rose-500/10" 
                        : "bg-white/70 border-rose-200/40 hover:border-rose-300"
                    }`}
                  >
                    <span className={`text-[10px] font-bold transition-colors ${
                      isActive ? "text-rose-700 font-extrabold" : "text-slate-700 group-hover:text-rose-700"
                    }`}>
                      {challenge}
                    </span>
                    {/* Active pulse dot indicator */}
                    <span className={`absolute left-2 top-1/2 -translate-y-1/2 size-1 rounded-full ${
                      isActive ? "bg-rose-500 animate-pulse" : "bg-rose-400"
                    }`} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* CENTER COLUMN: Solution Core */}
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="text-center mb-1">
            <span className="text-[9px] font-black text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded border border-sky-100/80">
              Cascade Tech Solution
            </span>
          </div>

          {/* Salesforce Core Logo Center Hub */}
          <div className="relative size-14 rounded-full bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20 border border-sky-400/80 z-20 hover:scale-105 transition-transform duration-300">
            <Cloud className="size-7 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-60" />
          </div>

          {/* Vertical Solutions List */}
          <div className="flex flex-col gap-1.5 w-full">
            <AnimatePresence mode="popLayout">
              {solutions.map((solution, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <motion.div
                    key={solution + industryId}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className={`group relative backdrop-blur-md transition-all duration-300 rounded-xl py-1 px-2.5 text-center cursor-help shadow-sm border ${
                      isActive 
                        ? "scale-[1.03]"
                        : "bg-sky-100/40 border-sky-200/50 hover:border-sky-300/80 hover:shadow-md hover:scale-[1.01]"
                    }`}
                    style={isActive ? {
                      backgroundColor: "rgba(37, 99, 235, .08)",
                      border: "1px solid #3B82F6",
                      boxShadow: "0 0 20px rgba(59, 130, 246, .25)"
                    } : {}}
                  >
                    <span className={`text-[10px] font-extrabold transition-colors ${
                      isActive ? "text-blue-600" : "text-sky-900 group-hover:text-sky-600"
                    }`}>
                      {solution}
                    </span>
                    {/* Active pulse dot */}
                    <span className={`absolute right-2 top-1/2 -translate-y-1/2 size-1 rounded-full animate-pulse ${
                      isActive ? "bg-blue-500" : "bg-sky-400"
                    }`} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Business Outcomes */}
        <div className="flex flex-col gap-2.5 justify-center">
          <div className="text-center mb-1">
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/80">
              Business Outcomes
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {outcomes.map((outcome, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <motion.div
                    key={outcome + industryId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className={`group relative backdrop-blur-md transition-all duration-300 rounded-xl py-1.5 px-3 text-center cursor-help shadow-sm border ${
                      isActive 
                        ? "scale-[1.03] bg-emerald-50/70 border-emerald-400 shadow-md shadow-emerald-500/10" 
                        : "bg-white/70 border-emerald-200/50 hover:border-emerald-300"
                    }`}
                  >
                    <span className={`text-[10px] font-bold transition-colors ${
                      isActive ? "text-emerald-700 font-extrabold" : "text-slate-700 group-hover:text-emerald-700"
                    }`}>
                      {outcome}
                    </span>
                    {/* Active checkmark dot indicator */}
                    <span className={`absolute right-2 top-1/2 -translate-y-1/2 size-1 rounded-full ${
                      isActive ? "bg-emerald-500 animate-pulse" : "bg-emerald-400"
                    }`} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* FOOTER Info */}
      <div className="mt-4 border-t border-sky-100/60 pt-3 flex items-center justify-between text-[9.5px] text-slate-400 font-semibold shrink-0 relative z-10">
        <span>Continuous flow lines map the digital transform sequence from challenge to value.</span>
        <span className="text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Live Architecture Map</span>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const Experience = lazy(() => import("@/components/experience/Experience"));
const MobilePresentation = lazy(
  () => import("@/components/experience/MobilePresentation")
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cascade Tech Ventures — Salesforce & AI Voice Innovation" },
      {
        name: "description",
        content:
          "Travel through a futuristic Salesforce-powered business city. Strategic CRM solutions and AI voice technology by Cascade Tech Ventures.",
      },
      {
        property: "og:title",
        content: "Cascade Tech Ventures — Salesforce & AI Voice Innovation",
      },
      {
        property: "og:description",
        content:
          "A cinematic 3D presentation experience: Salesforce expertise meets next-generation AI voice technology.",
      },
    ],
  }),
  component: Index,
});

function Loader() {
  return (
    <div className="ambient-glow flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground animate-float-soft">
        C
      </div>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Initializing…
      </p>
    </div>
  );
}

function Index() {
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setReady(true), []);

  if (!ready) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      {isMobile ? <MobilePresentation /> : <Experience />}
    </Suspense>
  );
}

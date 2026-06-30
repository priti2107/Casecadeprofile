import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface FrameProps {
  children: ReactNode;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function DesktopFrame({
  children,
  title = "Desktop Preview",
  width = 1280,
  height = 800,
  className = "",
}: FrameProps) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  useEffect(() => {
    if (!contentRef) return;
    const doc = contentRef.contentWindow?.document;
    if (!doc) return;

    // 1. Copy all stylesheets and style tags from the parent document
    const head = doc.head;
    const parentStyles = document.querySelectorAll("style, link[rel='stylesheet']");
    parentStyles.forEach((style) => {
      head.appendChild(style.cloneNode(true));
    });

    // 2. Set background transparent and hide scrollbars inside the iframe
    if (doc.body) {
      doc.body.style.margin = "0";
      doc.body.style.padding = "0";
      doc.body.style.background = "transparent";
      doc.body.style.overflow = "hidden";
      doc.body.style.width = `${width}px`;
      doc.body.style.height = `${height}px`;
    }
  }, [contentRef, width, height]);

  return (
    <iframe
      ref={setContentRef}
      title={title}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: "none",
        background: "transparent",
        overflow: "hidden",
        pointerEvents: "none", // Prevent iframe from capturing touch/drag gestures
      }}
      className={className}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}

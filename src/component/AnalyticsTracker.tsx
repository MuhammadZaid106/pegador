"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  const key = "pegador_vid";
  let vid = localStorage.getItem(key);
  if (!vid) {
    vid = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    localStorage.setItem(key, vid);
  }
  return vid;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double logging the exact same path in the same render
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Do not log internal admin activity if desired, or log everything
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;

    // Fire non-blocking analytics beacon
    try {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          path: pathname,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking
    }
  }, [pathname]);

  return null;
}

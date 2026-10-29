
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 30 seconds for testing // 15 minutes

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "click",
];

export default function SessionTimeout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("pennywise-access-token");
    const loggedIn = localStorage.getItem("pennywise-logged-in");

    if (!token || loggedIn !== "true") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    function signOut() {
      localStorage.removeItem("pennywise-logged-in");
      localStorage.removeItem("pennywise-user-email");
      localStorage.removeItem("pennywise-user-name");
      localStorage.removeItem("pennywise-user-id");
      localStorage.removeItem("pennywise-access-token");

      router.replace("/login?reason=inactive");
    }

    function resetTimer() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(signOut, INACTIVITY_LIMIT_MS);
    }

    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [pathname, router]);

  return null;
}

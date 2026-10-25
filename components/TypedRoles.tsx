"use client";

import { useEffect, useState } from "react";

const roles = [
  "Full-Stack Software Engineer",
  "MERN Stack Developer",
  "Next.js & TypeScript Developer",
  "Cloud & DevOps Enthusiast",
];

// Types and erases a list of roles in a loop.
export default function TypedRoles() {
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      let i = 0;
      await sleep(2600);
      while (!cancelled) {
        const current = roles[i];
        for (let k = current.length; k >= 0 && !cancelled; k--) {
          setText(current.slice(0, k));
          await sleep(32);
        }
        i = (i + 1) % roles.length;
        const next = roles[i];
        for (let k = 1; k <= next.length && !cancelled; k++) {
          setText(next.slice(0, k));
          await sleep(65);
        }
        await sleep(2200);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span>
      <span className="text-shimmer">{text}</span>
      <span className="cursor" aria-hidden="true" />
    </span>
  );
}

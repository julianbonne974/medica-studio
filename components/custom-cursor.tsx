"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast spring for inner dot (main cursor)
  const innerSpringConfig = { damping: 28, stiffness: 500 };
  const cursorXSpringInner = useSpring(cursorX, innerSpringConfig);
  const cursorYSpringInner = useSpring(cursorY, innerSpringConfig);

  // Slightly slower spring for outer circle (subtle trailing effect)
  const outerSpringConfig = { damping: 20, stiffness: 300 };
  const cursorXSpringOuter = useSpring(cursorX, outerSpringConfig);
  const cursorYSpringOuter = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Hide on mobile/tablet
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.matchMedia("(pointer: coarse)").matches;
      if (isMobile) {
        setIsVisible(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer circle */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
        style={{
          x: cursorXSpringOuter,
          y: cursorYSpringOuter,
        }}
      >
        <motion.div
          className="relative -left-4 -top-4 h-8 w-8 rounded-full border border-zinc-200"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{
          x: cursorXSpringInner,
          y: cursorYSpringInner,
        }}
      >
        <motion.div
          className="relative -left-1 -top-1 h-2 w-2 rounded-full bg-zinc-900"
          animate={{
            scale: isHovering ? 0 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
      </motion.div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

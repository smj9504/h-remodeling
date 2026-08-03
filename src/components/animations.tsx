'use client';

import { useRef, useEffect, useState, ReactNode, CSSProperties } from 'react';
import { motion, useInView, AnimatePresence, Variant } from 'framer-motion';

// ─── Reduced Motion Hook ─────────────────────────────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ─── Hero Reveal ─────────────────────────────────────────────────
// The focal moment: a horizontal clip-path wipe reveals the hero image,
// then content lifts through a backdrop-blur clearing.
interface HeroRevealProps {
  children: ReactNode;
  className?: string;
}

export function HeroReveal({ children, className = '' }: HeroRevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

interface HeroContentProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function HeroContent({ children, delay = 0.6, className = '' }: HeroContentProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── FadeIn on Scroll ───────────────────────────────────────────
interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const directionOffset = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
  none: {},
};

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  amount = 0.2,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionOffset[direction] }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Children ───────────────────────────────────────────
interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className = '',
  once = true,
  amount = 0.2,
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger Item (child of StaggerChildren) ────────────────────
interface StaggerItemProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function StaggerItem({
  children,
  direction = 'up',
  className = '',
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directionOffset[direction] },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Count Up ───────────────────────────────────────────────────
interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function CountUp({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  once = true,
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * end;
      setCount(Number.isInteger(end) ? Math.floor(value) : parseFloat(value.toFixed(1)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ─── Scale In ───────────────────────────────────────────────────
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
}: ScaleInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Filter Grid (for project gallery) ──────────────────────────
interface FilterGridProps {
  children: ReactNode;
  className?: string;
}

export function FilterGrid({ children, className = '' }: FilterGridProps) {
  return (
    <motion.div layout className={className}>
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </motion.div>
  );
}

interface FilterItemProps {
  children: ReactNode;
  layoutId: string;
  className?: string;
}

export function FilterItem({ children, layoutId, className = '' }: FilterItemProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: reduced ? 0 : 0.25 },
        scale: { duration: reduced ? 0 : 0.25 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

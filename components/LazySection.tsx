
import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  placeholder?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  placeholder,
  className = "", 
  threshold = 0.05,
  rootMargin = "200px"
}) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className={className}>
      {isIntersecting ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          {children}
        </div>
      ) : (
        placeholder || <div className="h-32 w-full bg-slate-100 dark:bg-slate-900/50 rounded-3xl animate-pulse" />
      )}
    </div>
  );
};

export default LazySection;

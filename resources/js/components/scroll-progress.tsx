import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
   className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      let ticking = false;

      const updateScrollProgress = () => {
         const currentScrollY = window.scrollY;
         const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
         if (totalHeight > 0) {
            setProgress((currentScrollY / totalHeight) * 100);
         }
         ticking = false;
      };

      const onScroll = () => {
         if (!ticking) {
            window.requestAnimationFrame(updateScrollProgress);
            ticking = true;
         }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
   }, []);

   return (
      <div className={cn("fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none", className)}>
         <div
            className="h-full bg-linear-to-r from-emerald-500 via-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-500 ease-in-out italic rounded-r-full"
            style={{ width: `${progress}%` }}
         >
            {/* Glossy shine effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
         </div>
      </div>
   );
}

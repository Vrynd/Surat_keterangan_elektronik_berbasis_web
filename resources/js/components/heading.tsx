import { cn } from "@/lib/utils";
import React from "react";

interface HeadingProps {
   title: string;
   description?: string;
   variant?: 'default' | 'small' | 'sub-header';
   children?: React.ReactNode;
   className?: string;
}

export default function Heading({
   title,
   description,
   variant = 'default',
   children,
   className,
}: HeadingProps) {
   if (variant === 'sub-header' || children) {
      return (
         <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col gap-1">
               <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {title}
               </h2>
               {description && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                     {description}
                  </p>
               )}
            </div>

            {children && (
               <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
                  {children}
               </div>
            )}
         </div>
      );
   }

   return (
      <header className={cn(variant === 'small' ? '' : 'mb-8 space-y-0.5', className)}>
         <h2
            className={
               variant === 'small'
                  ? 'mb-0.5 text-base font-medium'
                  : 'text-xl font-semibold tracking-tight'
            }
         >
            {title}
         </h2>
         {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
         )}
      </header>
   );
}

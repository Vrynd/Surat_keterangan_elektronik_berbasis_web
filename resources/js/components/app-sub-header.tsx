import { cn } from "@/lib/utils";
import React from "react";

interface SubHeaderProps {
   title: string;
   description?: string;
   children?: React.ReactNode;
   className?: string;
}

export function SubHeader({
   title,
   description,
   children,
   className
}: SubHeaderProps) {
   return (
      <div className={cn("flex flex-col gap-6", className)}>
         <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
               {title}
            </h2>
            {description && (
               <p className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
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

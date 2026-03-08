import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const actionBarVariants = cva(
   "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-4 shadow-sm",
   {
      variants: {
         position: {
            sticky: "sticky bottom-4 z-10 shadow-lg shadow-neutral-900/5 dark:shadow-neutral-900/30 backdrop-blur-md bg-white/95 dark:bg-neutral-950/95",
            static: "relative",
         },
      },
      defaultVariants: {
         position: "static",
      },
   }
);

export interface ActionBarProps
   extends React.HTMLAttributes<HTMLDivElement>,
   VariantProps<typeof actionBarVariants> {
   message?: React.ReactNode;
}

export function ActionBar({
   children,
   message,
   position,
   className,
   ...props
}: ActionBarProps) {
   return (
      <div
         className={cn(actionBarVariants({ position, className }))}
         {...props}
      >
         <div className="flex items-center justify-between">
            {message && (
               <div className="text-sm text-neutral-500 hidden sm:block">
                  {message}
               </div>
            )}
            <div className={cn("flex items-center gap-3", !message ? "w-full justify-end" : "ml-auto")}>
               {children}
            </div>
         </div>
      </div>
   );
}

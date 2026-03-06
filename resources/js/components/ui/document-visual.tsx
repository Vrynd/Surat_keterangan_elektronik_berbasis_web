import * as React from "react";
import { ChevronRight, Fingerprint, Briefcase, BadgeCheck } from "lucide-react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import { cn } from "@/lib/utils";

const CategoryDocument = {
   kependudukan: {
      color: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      border: 'border-emerald-300/50 dark:border-emerald-800/50',
      icon: Fingerprint
   },
   ekonomi: {
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      border: 'border-amber-200/50 dark:border-amber-800/50',
      icon: Briefcase
   },
   sosial: {
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50/50 dark:bg-blue-950/20',
      border: 'border-blue-200/50 dark:border-blue-800/50',
      icon: BadgeCheck
   },
   '': {
      color: 'text-neutral-500 dark:text-neutral-400',
      bg: 'bg-neutral-50/50 dark:bg-neutral-900/20',
      border: 'border-neutral-200 dark:border-neutral-800',
      icon: Fingerprint // Keep generic icon or use another one
   }
} as const;

type DocumentStyle = typeof CategoryDocument[keyof typeof CategoryDocument];

interface DocumentVisualContextProps {
   style: DocumentStyle;
   id: string;
   mockup: string[];
}

const DocumentVisualContext = React.createContext<DocumentVisualContextProps | null>(null);

function useDocumentVisual() {
   const context = React.useContext(DocumentVisualContext);
   if (!context) {
      throw new Error("DocumentVisual components must be used within DocumentVisual");
   }
   return context;
}

interface DocumentVisualProps extends React.ComponentProps<"div"> {
   id: string;
   item: keyof typeof CategoryDocument;
   mockup?: string[];
}

function DocumentVisual({
   id,
   item,
   mockup = [],
   className,
   children,
   ...props
}: DocumentVisualProps) {
   const style = CategoryDocument[item];

   return (
      <DocumentVisualContext.Provider value={{ style, id, mockup }}>
         <div
            data-slot="document-visual"
            className={cn(
               "relative aspect-16/10 p-5 rounded-xl flex items-center justify-center overflow-hidden border",
               style.bg,
               style.border,
               className
            )}
            {...props}
         >
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/5 dark:stroke-neutral-100/5" />

            <div className="relative z-10 w-full h-full bg-[#fdfdfd] dark:bg-neutral-950 rounded-[4px] border border-neutral-200/60 dark:border-neutral-800/60 flex flex-col overflow-hidden -rotate-1 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)]
            transition-all duration-500 group-hover:rotate-0 group-hover:shadow-[0_20px_35px_-10_rgba(0,0,0,0.2)]">
               <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

               {children || (
                  <>
                     <DocumentVisualHeader />
                     <DocumentVisualContent />
                  </>
               )}

               <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
            </div>
         </div>
      </DocumentVisualContext.Provider>
   );
}

function DocumentVisualHeader({ className, ...props }: React.ComponentProps<"div">) {
   const { style, id } = useDocumentVisual();

   return (
      <div
         data-slot="document-visual-header"
         className={cn("relative flex items-center justify-between border-b-2 bg-white dark:bg-neutral-900 px-3 h-8 shrink-0", style.border, className)}
         {...props}
      >
         <div className="flex items-center gap-1.5 z-10">
            <div className={cn("size-1.5 rounded-full shadow-sm", style.color.replace('text-', 'bg-'))} />
            <div className="size-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800" />
         </div>

         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className={cn("text-[5.5px] font-black uppercase tracking-[0.4em] opacity-40", style.color)}>
               AUTHENTIC DIGITAL RECORD • SN-00{id}29
            </p>
         </div>

         <div className="flex items-center gap-1.5 opacity-0 pointer-events-none">
            <div className="size-1.5 rounded-full bg-neutral-100" />
            <div className="size-1.5 rounded-full bg-neutral-100" />
         </div>
      </div>
   );
}

function DocumentVisualContent({ className, children, ...props }: React.ComponentProps<"div">) {
   const { style, mockup } = useDocumentVisual();
   const WatermarkIcon = style.icon;

   return (
      <div
         data-slot="document-visual-content"
         className={cn("p-3 flex-1 flex flex-col items-center overflow-hidden relative", className)}
         {...props}
      >
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div className="opacity-[0.03] dark:opacity-[0.05] scale-[1.6] -rotate-12 transition-transform duration-700 group-hover:-rotate-6 mt-4">
               <WatermarkIcon className={cn("size-32", style.color)} />
            </div>

            <div className="absolute -bottom-6 -left-6 opacity-[0.02] dark:opacity-[0.04] rotate-45">
               <WatermarkIcon className={cn("size-24", style.color)} />
            </div>
         </div>

         {children || (
            <>
               <div className="text-center mb-3 z-10">
                  <p className="text-[8px] font-black tracking-[0.25em] text-neutral-900 dark:text-white uppercase leading-none mb-1">REPUBLIK INDONESIA</p>
                  <p className="text-[7px] font-bold text-neutral-500 dark:text-neutral-400 tracking-[0.15em] uppercase opacity-70">SURAT KETERANGAN ELEKTRONIK</p>
                  <div className={cn("h-px w-12 mx-auto my-1.5 opacity-30", style.color.replace('text-', 'bg-'))} />
               </div>

               <div className="w-full grid grid-cols-2 gap-x-5 gap-y-1.5 z-10 px-2 mt-0.5">
                  {mockup.map((line, i) => (
                     <div key={i} className="flex flex-col gap-0.5">
                        <p className="text-[5px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest leading-none mb-0.5">{line}</p>
                        <div className="h-[1.5px] w-full bg-neutral-100/50 dark:bg-neutral-900/50 rounded-full overflow-hidden">
                           <div className={cn("h-full w-[40%] opacity-20", style.color.replace('text-', 'bg-'))} />
                        </div>
                     </div>
                  ))}
               </div>

               <DocumentVisualFooter />
            </>
         )}
      </div>
   );
}

function DocumentVisualFooter({ className, ...props }: React.ComponentProps<"div">) {
   const { style } = useDocumentVisual();
   const WatermarkIcon = style.icon;

   return (
      <div
         data-slot="document-visual-footer"
         className={cn("mt-auto w-full flex items-end justify-between z-10 opacity-90", className)}
         {...props}
      >
         <div className="flex flex-col gap-1 mb-0.5">
            <div className="h-0.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            <div className="h-0.5 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            <div className="h-0.5 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
         </div>

         <div className="relative group/seal scale-110">
            <div className={cn("size-9 rounded-full border-2 border-double flex items-center justify-center bg-white dark:bg-neutral-900 shadow-inner rotate-12 transition-transform duration-500 group-hover/seal:rotate-0", style.border)}>
               <div className={cn("absolute inset-0.5 rounded-full border border-dashed opacity-30", style.border)} />
               <WatermarkIcon className={cn("size-4.5 opacity-40", style.color)} />
            </div>
            <div className="absolute -top-1 -right-1">
               <div className={cn("size-4 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-neutral-950", style.color.replace('text-', 'bg-'))}>
                  <ChevronRight className="size-2.5 text-white stroke-3" />
               </div>
            </div>
         </div>
      </div>
   );
}

export { DocumentVisual, DocumentVisualHeader, DocumentVisualContent, DocumentVisualFooter, CategoryDocument };

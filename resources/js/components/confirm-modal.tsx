import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, HelpCircle, X } from "lucide-react";
import { PlaceholderPattern } from "./ui/placeholder-pattern";

interface ConfirmModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   title: string;
   description: string;
   confirmText?: string;
   cancelText?: string;
   variant?: "default" | "destructive" | "emerald";
   loading?: boolean;
}

export function ConfirmModal({
   isOpen,
   onClose,
   onConfirm,
   title,
   description,
   confirmText = "Konfirmasi",
   cancelText = "Batal",
   variant = "default",
   loading = false,
}: ConfirmModalProps) {

   const getVariantStyles = () => {
      switch (variant) {
         case "destructive":
            return {
               icon: <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />,
               color: "red",
               bg: "bg-red-50 dark:bg-red-950/30",
               border: "border-red-100 dark:border-red-900/50",
               ring: "ring-red-500/20",
               glow: "shadow-red-500/10",
               gradient: "from-red-50 to-white dark:from-red-950/20 dark:to-neutral-950"
            };
         case "emerald":
            return {
               icon: <CheckCircle2 className="size-6 text-emerald-600 dark:text-emerald-400" />,
               color: "emerald",
               bg: "bg-emerald-50 dark:bg-emerald-950/30",
               border: "border-emerald-100 dark:border-emerald-900/50",
               ring: "ring-emerald-500/20",
               glow: "shadow-emerald-500/10",
               gradient: "from-emerald-50 to-white dark:from-emerald-950/20 dark:to-neutral-950"
            };
         default:
            return {
               icon: <HelpCircle className="size-6 text-blue-600 dark:text-blue-400" />,
               color: "blue",
               bg: "bg-blue-50 dark:bg-blue-950/30",
               border: "border-blue-100 dark:border-blue-900/50",
               ring: "ring-blue-500/20",
               glow: "shadow-blue-500/10",
               gradient: "from-blue-50 to-white dark:from-blue-950/20 dark:to-neutral-950"
            };
      }
   };

   const styles = getVariantStyles();

   return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
         <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl bg-white dark:bg-neutral-950">
            <div className={cn(
               "relative h-32 w-full flex items-center justify-center overflow-hidden border-b border-neutral-100 dark:border-neutral-900 bg-linear-to-b",
               styles.gradient
            )}>
               <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/5 dark:stroke-white/5 opacity-50" />
               <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
               <div className={cn("absolute size-24 rounded-full border border-dashed animate-[spin_20s_linear_infinite] opacity-20", styles.border)} />
               <div className={cn("absolute size-20 rounded-full border border-dashed animate-[spin_15s_linear_infinite_reverse] opacity-10", styles.border)} />
               <div className={cn(
                  "relative z-10 size-16 rounded-2xl flex items-center justify-center border-2 shadow-2xl transition-transform duration-500 rotate-3 group-hover:rotate-0",
                  styles.bg,
                  styles.border,
                  styles.glow
               )}>
                  <div className="absolute inset-0 rounded-2xl bg-white/40 dark:bg-black/20 blur-[1px]" />
                  <div className="relative z-10">
                     {styles.icon}
                  </div>
               </div>

               <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-100/50 dark:bg-neutral-800/50 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors z-20"
               >
                  <X className="size-4" />
               </button>
            </div>

            <div className="px-8 pt-6 pb-2 text-center">
               <DialogTitle className="text-xl font-black tracking-tight text-neutral-900 dark:text-white mb-2">
                  {title}
               </DialogTitle>
               <DialogDescription className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                  {description}
               </DialogDescription>
            </div>

            <DialogFooter className="p-6 pt-4 flex flex-col sm:flex-row gap-3">
               <Button
                  variant="ghost"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 h-11 font-bold text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-all"
               >
                  {cancelText}
               </Button>
               <Button
                  variant={variant === "emerald" ? "emerald" : variant === "destructive" ? "destructive" : "default"}
                  onClick={onConfirm}
                  disabled={loading}
                  className={cn(
                     "flex-1 h-11 font-black uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all duration-300 active:scale-95",
                     variant === "emerald" ? "shadow-emerald-500/20" :
                        variant === "destructive" ? "shadow-red-500/20" : "shadow-blue-500/20"
                  )}
               >
                  {loading ? (
                     <div className="flex items-center gap-2">
                        <div className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Memproses
                     </div>
                  ) : confirmText}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

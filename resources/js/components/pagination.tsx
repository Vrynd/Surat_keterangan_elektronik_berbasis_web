import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { router } from "@inertiajs/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface PaginationMeta {
   current_page: number
   last_page: number
   per_page: number
   total: number
   from: number | null
   to: number | null
   links: Array<{
      url: string | null
      label: string
      active: boolean
   }>
}

interface PaginationProps {
   pagination: PaginationMeta
   className?: string
}

export function Pagination({ pagination, className }: PaginationProps) {
   if (!pagination || pagination.last_page <= 1) return null

   const goToPage = (url: string | null) => {
      if (!url) return
      router.get(
         url,
         {},
         {
            preserveState: true,
            preserveScroll: true,
         }
      )
   }

   return (
      <div
         className={cn(
            "flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-900/20",
            className
         )}
      >
         <div className="flex-1 text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            Menampilkan <span className="text-neutral-900 dark:text-neutral-100 font-bold">{pagination.from ?? 0}</span>
            {" - "}
            <span className="text-neutral-900 dark:text-neutral-100 font-bold">{pagination.to ?? 0}</span> dari{" "}
            <span className="text-neutral-900 dark:text-neutral-100 font-bold">{pagination.total}</span> data
         </div>
         <div className="flex items-center gap-2">
            <Button
               variant="outline"
               size="icon"
               className={cn(
                  "size-9 rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors shadow-none",
                  !pagination.links[0]?.url && "opacity-50 cursor-not-allowed"
               )}
               disabled={!pagination.links[0]?.url}
               onClick={() => goToPage(pagination.links[0]?.url)}
            >
               <ChevronLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-1.5 mx-1">
               {pagination.links.slice(1, -1).map((link, i) => {

                  const isNumber = !isNaN(Number(link.label))

                  if (!isNumber && link.label !== "...") return null

                  return (
                     <Button
                        key={i}
                        variant={link.active ? "default" : "outline"}
                        className={cn(
                           "size-9 p-0 rounded-lg transition-all duration-200 font-semibold shadow-none",
                           link.active
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600"
                              : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-emerald-600 dark:hover:text-emerald-400"
                        )}
                        disabled={!link.url}
                        onClick={() => goToPage(link.url)}
                     >
                        {link.label}
                     </Button>
                  )
               })}
            </div>

            <Button
               variant="outline"
               size="icon"
               className={cn(
                  "size-9 rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors shadow-none",
                  !pagination.links[pagination.links.length - 1]?.url && "opacity-50 cursor-not-allowed"
               )}
               disabled={!pagination.links[pagination.links.length - 1]?.url}
               onClick={() => goToPage(pagination.links[pagination.links.length - 1]?.url)}
            >
               <ChevronRight className="size-4" />
            </Button>
         </div>
      </div>
   )
}

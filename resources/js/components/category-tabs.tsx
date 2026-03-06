import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface CategoryItem {
   value: string;
   label: string;
}

interface CategoryTabsProps {
   value: string;
   onValueChange: (value: string) => void;
   counts: Record<string, number>;
   items?: readonly CategoryItem[] | CategoryItem[];
   className?: string;
}

const defaultCategories = [
   { value: 'all', label: 'Semua' },
   { value: 'kependudukan', label: 'Kependudukan' },
   { value: 'ekonomi', label: 'Ekonomi' },
   { value: 'sosial', label: 'Sosial' },
] as const;

export function CategoryTabs({
   value,
   onValueChange,
   counts,
   items = defaultCategories,
   className
}: CategoryTabsProps) {
   return (
      <ToggleGroup
         type="single"
         value={value}
         onValueChange={(val) => val && onValueChange(val)}
         className={cn("bg-neutral-100 dark:bg-neutral-900 p-1 border border-input rounded-lg h-11", className)}
      >
         {items.map((item) => (
            <ToggleGroupItem
               key={item.value}
               value={item.value}
               className="cursor-pointer px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2"
            >
               {item.label}
               <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                  {counts[item.value] || 0}
               </span>
            </ToggleGroupItem>
         ))}
      </ToggleGroup>
   );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentVisual, CategoryDocument } from "@/components/ui/document-visual";
import { Link, router } from "@inertiajs/react";
import { slugify, cn } from "@/lib/utils";
import { FilePlus, MoreVertical } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface CertificateCardProps {
   userRole?: string;
   id: string;
   name: string;
   description: string;
   category: keyof typeof CategoryDocument;
   previewDocument?: string[];
   searchQuery?: string;
}

const HighlightText = ({ text, highlight }: { text: string; highlight?: string }) => {
   if (!highlight?.trim()) return <>{text}</>;

   const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
   return (
      <>
         {parts.map((part, i) => (
            part.toLowerCase() === highlight.toLowerCase() ? (
               <mark key={i} className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-sm px-0.5">
                  {part}
               </mark>
            ) : (
               <span key={i}>{part}</span>
            )
         ))}
      </>
   );
};

export function CertificateCard({ userRole, id, name, description, category, previewDocument = [], searchQuery = '' }: CertificateCardProps) {
   const isAdmin = userRole === 'admin';

   const isNamePlaceholder = !name;
   const isDescriptionPlaceholder = !description;

   const displayName = name || "Nama Jenis Surat";
   const displayDescription = description || "Deskripsi layanan surat.";

   const createForm = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      router.get(`/admin/manage-forms?id=${id}&name=${slugify(name)}`);
   };

   const CardInner = (
      <Card className="group p-5 flex flex-col h-full gap-4 border-neutral-200 dark:border-neutral-800 shadow-none overflow-hidden hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300 relative">
         <CardHeader className="p-0 space-y-0 pr-8">
            <CardTitle className={cn(
               "text-base font-bold line-clamp-1 group-hover:text-emerald-500 transition-colors duration-300",
               isNamePlaceholder ? "text-neutral-400 font-medium italic dark:text-neutral-500" : "text-neutral-900 dark:text-white"
            )}>
               <HighlightText text={displayName} highlight={searchQuery} />
            </CardTitle>
            {isAdmin && (
               <div className="absolute right-3 top-3 z-10">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
                           <MoreVertical className="size-4 text-neutral-500" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={createForm} className="cursor-pointer">
                           <FilePlus className="size-4 mr-2" />
                           Kelola Formulir
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            )}
         </CardHeader>
         <DocumentVisual
            id={id}
            item={category}
            mockup={previewDocument}
         />
         <CardContent className="p-0 flex-1">
            <CardDescription className={cn(
               "line-clamp-2 leading-relaxed transition-colors",
               isDescriptionPlaceholder ? "text-neutral-300 dark:text-neutral-700 italic" : "text-neutral-500 dark:text-neutral-400"
            )}>
               <HighlightText text={displayDescription} highlight={searchQuery} />
            </CardDescription>
         </CardContent>
      </Card>
   );

   const href = isAdmin
      ? `/admin/manage-forms?id=${id}&name=${encodeURIComponent(name)}`
      : `/client/submission-letter?type=${slugify(name)}`;

   return (
      <Link href={href}>
         {CardInner}
      </Link>
   );
}

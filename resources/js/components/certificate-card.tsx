import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentVisual, CategoryDocument } from "@/components/ui/document-visual";

interface CertificateCardProps {
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

export function CertificateCard({ id, name, description, category, previewDocument = [], searchQuery = '' }: CertificateCardProps) {
   return (
      <Card className="p-5 cursor-pointer flex flex-col h-full gap-4 border-neutral-200 dark:border-neutral-800 shadow-none transition-none group overflow-hidden">
         <CardHeader className="p-0 space-y-0">
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1">
               <HighlightText text={name} highlight={searchQuery} />
            </CardTitle>
         </CardHeader>
         <DocumentVisual
            id={id}
            item={category}
            mockup={previewDocument}
         />
         <CardContent className="p-0 flex-1">
            <CardDescription className="text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
               <HighlightText text={description} highlight={searchQuery} />
            </CardDescription>
         </CardContent>
      </Card>
   );
}

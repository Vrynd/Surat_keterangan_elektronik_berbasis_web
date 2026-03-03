import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentVisual, CategoryDocument } from "@/components/ui/document-visual";

interface CertificateCardProps {
   id: string;
   name: string;
   description: string;
   category: keyof typeof CategoryDocument;
   previewDocument?: string[];
}

export function CertificateCard({ id, name, description, category, previewDocument = [] }: CertificateCardProps) {
   return (
      <Card className="p-5 cursor-pointer flex flex-col h-full gap-4 border-neutral-200 dark:border-neutral-800 shadow-none transition-none group overflow-hidden">
         <CardHeader className="p-0 space-y-0">
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1">
               {name}
            </CardTitle>
         </CardHeader>
         <DocumentVisual
            id={id}
            item={category}
            mockup={previewDocument}
         />
         <CardContent className="p-0 flex-1">
            <CardDescription className="text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
               {description}
            </CardDescription>
         </CardContent>
      </Card>
   );
}

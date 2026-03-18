import { 
   DropdownMenu, 
   DropdownMenuContent, 
   DropdownMenuItem, 
   DropdownMenuLabel, 
   DropdownMenuSeparator, 
   DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import { router } from '@inertiajs/react';

interface LetterRequest {
   id: number;
   status: 'pending' | 'approved' | 'rejected';
}

interface LetterRequestActionsProps {
   request: LetterRequest;
}

export function LetterRequestActions({ request }: LetterRequestActionsProps) {
   const updateStatus = (id: number, status: string) => {
      router.patch(`/admin/letter-requests/${id}/status`, { status }, {
         preserveScroll: true,
      });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 rounded-lg cursor-pointer">
               <MoreHorizontal className="size-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Aksi Pengajuan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
               <Eye className="size-4 mr-2" />
               Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-[10px] uppercase text-neutral-400 py-1">Ubah Status</DropdownMenuLabel>
            <DropdownMenuItem 
               className="cursor-pointer text-amber-600 focus:text-amber-600"
               onClick={() => updateStatus(request.id, 'pending')}
               disabled={request.status === 'pending'}>
               <Clock className="size-4 mr-2" />
               Set Menunggu
            </DropdownMenuItem>
            <DropdownMenuItem 
               className="cursor-pointer text-emerald-600 focus:text-emerald-600"
               onClick={() => updateStatus(request.id, 'approved')}
               disabled={request.status === 'approved'}>
               <CheckCircle2 className="size-4 mr-2" />
               Setujui
            </DropdownMenuItem>
            <DropdownMenuItem 
               className="cursor-pointer text-rose-600 focus:text-rose-600"
               onClick={() => updateStatus(request.id, 'rejected')}
               disabled={request.status === 'rejected'}>
               <XCircle className="size-4 mr-2" />
               Tolak
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React from 'react';

interface LetterTypeFormProps {
   data: any;
   setData: any;
   errors: any;
   onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onCategoryChange?: (val: any) => void;
}

export function LetterTypeForm({ data, setData, errors, onNameChange, onCategoryChange }: LetterTypeFormProps) {
   return (
      <div className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="name">Jenis Surat <span className="text-red-500">*</span></Label>
               <Input
                  id="name"
                  value={data.name}
                  required
                  onChange={onNameChange || ((e) => setData('name', e.target.value))}
                  placeholder="Masukkan nama surat keterangan"
                  className={errors.name ? 'border-red-500' : 'h-11'}
               />
               {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="code">Kode Surat <span className="text-red-500">*</span></Label>
               <Input
                  id="code"
                  value={data.code}
                  required
                  onChange={(e) => setData('code', e.target.value)}
                  placeholder="Masukkan kode unik surat"
                  className={errors.code ? 'border-red-500' : 'h-11'}
               />
               {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
            </div>

            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="category">Kategori <span className="text-red-500">*</span></Label>
               <Select
                  value={data.category}
                  onValueChange={onCategoryChange || ((val: any) => setData('category', val))}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : 'h-11 w-full'}>
                     <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="kependudukan">Kependudukan</SelectItem>
                     <SelectItem value="ekonomi">Ekonomi</SelectItem>
                     <SelectItem value="sosial">Sosial</SelectItem>
                  </SelectContent>
               </Select>
               {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>

            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="processing_time">Estimasi Waktu Proses <span className="text-red-500">*</span></Label>
               <div className="relative">
                  <Input
                     id="processing_time"
                     type="number"
                     min="1"
                     value={data.processing_time.replace(' Hari Kerja', '')}
                     required
                     onChange={(e) => setData('processing_time', e.target.value ? `${e.target.value} Hari Kerja` : '')}
                     placeholder="1"
                     className={cn("pr-24 h-11", errors.processing_time ? 'border-red-500' : '')}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-medium text-neutral-400">
                     Hari Kerja
                  </div>
               </div>
               {errors.processing_time && <p className="text-xs text-red-500">{errors.processing_time}</p>}
            </div>
         </div>

         <div className="flex flex-col gap-2 items-stretch">
            <Label htmlFor="description">Deskripsi Layanan <span className="text-red-500">*</span></Label>
            <Textarea
               id="description"
               value={data.description}
               required
               onChange={(e) => setData('description', e.target.value)}
               placeholder="Berikan deskripsi singkat tentang layanan surat ini"
               className={cn("min-h-[105px]", errors.description ? 'border-red-500' : '')}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
         </div>
      </div>
   );
}

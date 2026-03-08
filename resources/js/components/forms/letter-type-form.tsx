import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AlignLeft, FileText, Tag } from 'lucide-react';
import React from 'react';

interface LetterTypeFormProps {
   data: any;
   setData: any;
   errors: any;
   onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onCategoryChange?: (val: any) => void;
}

const categoryColors: Record<string, string> = {
   kependudukan: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800',
   ekonomi: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
   sosial: 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800',
};

export function LetterTypeForm({ data, setData, errors, onNameChange, onCategoryChange }: LetterTypeFormProps) {
   return (
      <div className="space-y-6">
         <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
               <div className="flex items-center justify-center size-8 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <FileText className="size-4 text-blue-600 dark:text-blue-400" />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Identitas Surat</h3>
                  <p className="text-xs text-neutral-500">Nama dan kode unik jenis surat</p>
               </div>
            </div>
            <div className="p-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                     <Label htmlFor="name">Jenis Surat <span className="text-red-500">*</span></Label>
                     <Input
                        id="name"
                        value={data.name}
                        required
                        onChange={onNameChange || ((e) => setData('name', e.target.value))}
                        placeholder="Masukkan nama surat keterangan"
                        className={cn("h-11", errors.name && 'border-red-500')}
                     />
                     {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                     <Label htmlFor="code">
                        <span className="flex items-center gap-1.5">
                           Kode Surat <span className="text-red-500">*</span>
                           {data.name && data.category && (
                              <span className="text-[10px] font-normal text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                                 Auto-generated
                              </span>
                           )}
                        </span>
                     </Label>
                     <Input
                        id="code"
                        value={data.code}
                        required
                        onChange={(e) => setData('code', e.target.value)}
                        placeholder="Masukkan kode unik surat"
                        className={cn("h-11 font-mono text-sm", errors.code && 'border-red-500')}
                     />
                     {errors.code && <p className="text-xs text-red-500">{errors.code}</p>}
                  </div>
               </div>
            </div>
         </div>

         <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
               <div className="flex items-center justify-center size-8 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <Tag className="size-4 text-violet-600 dark:text-violet-400" />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Klasifikasi & Waktu</h3>
                  <p className="text-xs text-neutral-500">Kategori, durasi proses, dan status layanan</p>
               </div>
            </div>
            <div className="p-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="flex flex-col gap-2">
                     <Label htmlFor="category">Kategori <span className="text-red-500">*</span></Label>
                     <Select
                        value={data.category}
                        onValueChange={onCategoryChange || ((val: any) => setData('category', val))}>
                        <SelectTrigger className={cn("h-11 w-full", errors.category && 'border-red-500')}>
                           <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="kependudukan">Kependudukan</SelectItem>
                           <SelectItem value="ekonomi">Ekonomi</SelectItem>
                           <SelectItem value="sosial">Sosial</SelectItem>
                        </SelectContent>
                     </Select>
                     {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                     {data.category && (
                        <span className={cn(
                           "inline-flex self-start items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border",
                           categoryColors[data.category] || ''
                        )}>
                           <span className="size-1.5 rounded-full bg-current" />
                           {data.category === 'kependudukan' ? 'Kependudukan' : data.category === 'ekonomi' ? 'Ekonomi' : 'Sosial'}
                        </span>
                     )}
                  </div>

                  <div className="flex flex-col gap-2">
                     <Label htmlFor="processing_time">Estimasi Waktu Proses <span className="text-red-500">*</span></Label>
                     <div className="relative">
                        <Input
                           id="processing_time"
                           type="text"
                           inputMode="numeric"
                           value={data.processing_time.replace(' Hari Kerja', '')}
                           required
                           onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val && parseInt(val) > 31) return;
                              setData('processing_time', val ? `${val} Hari Kerja` : '');
                           }}
                           placeholder="1"
                           className={cn("pr-24 h-11", errors.processing_time && 'border-red-500')}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-medium text-neutral-400">
                           Hari Kerja
                        </div>
                     </div>
                     {errors.processing_time && <p className="text-xs text-red-500">{errors.processing_time}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                     <Label htmlFor="validity_period">Masa Berlaku <span className="text-red-500">*</span></Label>
                     <div className="relative">
                        <Input
                           id="validity_period"
                           type="text"
                           inputMode="numeric"
                           value={data.validity_period.replace(' Bulan', '')}
                           required
                           onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              if (val && parseInt(val) > 120) return;
                              setData('validity_period', val ? `${val} Bulan` : '');
                           }}
                           placeholder="12"
                           className={cn("pr-20 h-11", errors.validity_period && 'border-red-500')}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-medium text-neutral-400">
                           Bulan
                        </div>
                     </div>
                     {errors.validity_period && <p className="text-xs text-red-500">{errors.validity_period}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                     <Label htmlFor="is_active">Status Layanan <span className="text-red-500">*</span></Label>
                     <Select
                        value={data.is_active ? "1" : "0"}
                        onValueChange={(val) => setData('is_active', val === "1")}>
                        <SelectTrigger className={cn("h-11 w-full", errors.is_active && 'border-red-500')}>
                           <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="1">Aktif</SelectItem>
                           <SelectItem value="0">Nonaktif</SelectItem>
                        </SelectContent>
                     </Select>
                     {errors.is_active && <p className="text-xs text-red-500">{errors.is_active}</p>}
                     <div className="flex items-center gap-1.5">
                        <span className={cn(
                           "size-2 rounded-full",
                           data.is_active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-neutral-300 dark:bg-neutral-700"
                        )} />
                        <span className="text-[11px] font-medium text-neutral-500">
                           Layanan saat ini: <span className={cn(data.is_active ? "text-emerald-600 dark:text-emerald-400" : "text-neutral-600 dark:text-neutral-400")}>
                              {data.is_active ? 'Tersedia untuk warga' : 'Ditangguhkan'}
                           </span>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
               <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <AlignLeft className="size-4 text-emerald-600 dark:text-emerald-400" />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Deskripsi Layanan</h3>
                  <p className="text-xs text-neutral-500">Penjelasan tentang jenis surat ini</p>
               </div>
            </div>
            <div className="p-6">
               <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Deskripsi <span className="text-red-500">*</span></Label>
                  <Textarea
                     id="description"
                     value={data.description}
                     required
                     onChange={(e) => setData('description', e.target.value)}
                     placeholder="Berikan deskripsi singkat tentang layanan surat ini, termasuk kegunaan dan persyaratan umum..."
                     className={cn("min-h-[120px] leading-relaxed", errors.description && 'border-red-500')}
                  />
                  {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                  <p className="text-xs text-neutral-400">
                     {data.description.length > 0 ? `${data.description.length} karakter` : 'Minimal 10 karakter'}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

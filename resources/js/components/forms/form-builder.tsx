import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, ArrowUp, ArrowDown, Settings2, Hash, Type, Info, ListFilter, Database } from 'lucide-react';

export interface FormFieldData {
   label: string;
   name: string;
   type: string;
   placeholder: string;
   data_type: string;
   options: string[] | null;
   validation_rules: any;
   order_position: number;
   is_required: boolean;
   is_full_width: boolean;
   readOnly?: boolean;
}

interface FormBuilderProps {
   fields: FormFieldData[];
   onUpdateField: (index: number, data: Partial<FormFieldData>) => void;
   onRemoveField: (index: number) => void;
   onMoveField: (index: number, direction: 'up' | 'down') => void;
   readOnly?: boolean;
}

export default function FormBuilder({
   fields,
   onUpdateField,
   onRemoveField,
   onMoveField,
   readOnly = false,
}: FormBuilderProps) {
   return (
      <div className="space-y-6">
         {fields.map((field, index) => (
            <div key={index} className="relative rounded-xl border bg-card text-card-foreground overflow-hidden transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
               <div className="absolute top-4 right-8 text-7xl font-black text-muted/10 select-none italic pointer-events-none">
                  {(index + 1).toString().padStart(2, '0')}
               </div>

               <div className="flex items-center gap-3 px-6 py-4 border-b bg-muted/30">
                  {!readOnly && (
                     <div className="flex items-center bg-background rounded-lg border p-0.5 mr-2">
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => onMoveField(index, 'up')} disabled={index === 0}>
                           <ArrowUp className="size-4" />
                        </Button>
                        <div className="w-px h-4 bg-border mx-0.5" />
                        <Button variant="ghost" size="icon" className="size-8" onClick={() => onMoveField(index, 'down')} disabled={index === fields.length - 1}>
                           <ArrowDown className="size-4" />
                        </Button>
                     </div>
                  )}

                  <div className="flex items-center justify-center size-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                     <Settings2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className="text-sm font-semibold truncate pr-16 leading-tight">
                        {field.label || 'Field Baru'}
                     </h3>
                     <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider">
                        {field.name || 'id_otomatis'}
                     </p>
                  </div>

                  {!readOnly && (
                     <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive size-9"
                        onClick={() => onRemoveField(index)}>
                        <Trash2 className="size-4" />
                     </Button>
                  )}
               </div>

               <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                     <div className="flex flex-col gap-2">
                        <Label className={cn(
                           "text-sm font-semibold flex items-center gap-2 transition-colors",
                           readOnly && "text-muted-foreground/70"
                        )}>
                           <Type className={cn("size-4 text-muted-foreground", readOnly && "text-muted-foreground/50")} />
                           Nama Label / Pertanyaan <span className="text-destructive">*</span>
                        </Label>
                        <Input
                           value={field.label}
                           onChange={(e) => {
                              const newLabel = e.target.value;
                              const autoSlug = newLabel
                                 .toLowerCase()
                                 .replace(/\s+/g, '_')
                                 .replace(/[^\w]/g, '')
                                 .replace(/__+/g, '_');

                              onUpdateField(index, {
                                 label: newLabel,
                                 name: autoSlug
                              });
                           }}
                           className={cn(
                              "h-11 transition-all",
                              readOnly && "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 border-neutral-200 dark:border-neutral-800"
                           )}
                           placeholder="Contoh: Nama Lengkap"
                           disabled={readOnly}
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className={cn(
                           "text-sm font-semibold flex items-center gap-2 transition-colors",
                           readOnly && "text-muted-foreground/70"
                        )}>
                           <Hash className={cn("size-4 text-muted-foreground", readOnly && "text-muted-foreground/50")} />
                           ID Sistem (Otomatis) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                           value={field.name}
                           onChange={(e) => onUpdateField(index, { name: e.target.value.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '') })}
                           className={cn(
                              "h-11 font-mono text-sm bg-muted/50",
                              readOnly && "bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-500 border-neutral-200 dark:border-neutral-800"
                           )}
                           placeholder="id_otomatis"
                           disabled={readOnly}
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className={cn(
                           "text-sm font-semibold flex items-center gap-2 transition-colors",
                           readOnly && "text-muted-foreground/70"
                        )}>
                           <ListFilter className={cn("size-4 text-muted-foreground", readOnly && "text-muted-foreground/50")} />
                           Tipe Input <span className="text-destructive">*</span>
                        </Label>
                        <Select disabled={readOnly} value={field.type} onValueChange={(value) => onUpdateField(index, { type: value })}>
                           <SelectTrigger className={cn(
                              "w-full h-11 transition-all",
                              readOnly && "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 border-neutral-200 dark:border-neutral-800"
                           )}>
                              <SelectValue placeholder="Pilih tipe input" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="input">Teks Biasa (Singkat)</SelectItem>
                              <SelectItem value="textarea">Teks Panjang (Alamat, dll)</SelectItem>
                              <SelectItem value="select">Pilihan Dropdown</SelectItem>
                              <SelectItem value="date">Pemilih Tanggal</SelectItem>
                              <SelectItem value="number">Hanya Angka</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className={cn(
                           "text-sm font-semibold flex items-center gap-2 transition-colors",
                           readOnly && "text-muted-foreground/70"
                        )}>
                           <Database className={cn("size-4 text-muted-foreground", readOnly && "text-muted-foreground/50")} />
                           Format Jawaban <span className="text-destructive">*</span>
                        </Label>
                        <Select disabled={readOnly} value={field.data_type} onValueChange={(value) => onUpdateField(index, { data_type: value })}>
                           <SelectTrigger className={cn(
                              "w-full h-11 transition-all",
                              readOnly && "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 border-neutral-200 dark:border-neutral-800"
                           )}>
                              <SelectValue placeholder="Pilih format data" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="string">Teks / Tulisan</SelectItem>
                              <SelectItem value="number">Numeric (Angka)</SelectItem>
                              <SelectItem value="date">Format Tanggal</SelectItem>
                              <SelectItem value="email">Alamat Email</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className={cn(
                           "text-sm font-semibold flex items-center gap-2 transition-colors",
                           readOnly && "text-muted-foreground/70"
                        )}>
                           <Info className={cn("size-4 text-muted-foreground", readOnly && "text-muted-foreground/50")} />
                           Instruksi (Placeholder)
                        </Label>
                        <Input
                           value={field.placeholder}
                           onChange={(e) => onUpdateField(index, { placeholder: e.target.value })}
                           className={cn(
                              "h-11 transition-all",
                              readOnly && "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 border-neutral-200 dark:border-neutral-800"
                           )}
                           placeholder="Contoh: Masukkan nama lengkap sesuai KTP..."
                           disabled={readOnly}
                        />
                     </div>

                     <div className="flex flex-col gap-2">
                        <Label className={cn(
                           "text-sm font-semibold flex items-center gap-2 transition-colors",
                           readOnly && "text-muted-foreground/70"
                        )}>
                           <Settings2 className={cn("size-4 text-muted-foreground", readOnly && "text-muted-foreground/50")} />
                           Pengaturan Tambahan
                        </Label>
                        <div className={cn(
                           "flex items-center gap-8 h-11 px-4 border rounded-lg transition-all",
                           readOnly ? "bg-neutral-50/50 dark:bg-neutral-900/30 border-neutral-200/60 dark:border-neutral-800" : "bg-muted/30"
                        )}>
                           <div className={cn(
                              "flex items-center space-x-2 transition-colors group",
                              !readOnly && "cursor-pointer"
                           )} onClick={() => !readOnly && onUpdateField(index, { is_required: !field.is_required })}>
                              <Checkbox
                                 id={`required-${index}`}
                                 checked={field.is_required}
                                 onCheckedChange={(checked) => onUpdateField(index, { is_required: !!checked })}
                                 className={cn(
                                    "data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600",
                                    readOnly && "opacity-50"
                                 )}
                                 disabled={readOnly}
                              />
                              <Label htmlFor={`required-${index}`} className={cn(
                                 "text-[13px] font-medium transition-colors",
                                 readOnly ? "text-neutral-400 cursor-default" : "cursor-pointer group-hover:text-emerald-600"
                              )}>Wajib Diisi</Label>
                           </div>

                           <div className={cn(
                              "flex items-center space-x-2 transition-colors group",
                              !readOnly && "cursor-pointer"
                           )} onClick={() => !readOnly && onUpdateField(index, { is_full_width: !field.is_full_width })}>
                              <Checkbox
                                 id={`full-width-${index}`}
                                 checked={field.is_full_width}
                                 onCheckedChange={(checked) => onUpdateField(index, { is_full_width: !!checked })}
                                 className={cn(
                                    "data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600",
                                    readOnly && "opacity-50"
                                 )}
                                 disabled={readOnly}
                              />
                              <Label htmlFor={`full-width-${index}`} className={cn(
                                 "text-[13px] font-medium transition-colors",
                                 readOnly ? "text-neutral-400 cursor-default" : "cursor-pointer group-hover:text-emerald-600"
                              )}>Lebar Penuh</Label>
                           </div>
                        </div>
                     </div>

                     {field.type === 'select' && (
                        <div className="flex flex-col md:col-span-2 gap-2 mt-2 p-5 bg-muted/50 rounded-xl border border-dashed animate-in fade-in zoom-in-95 duration-200">
                           <Label className={cn(
                              "text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 uppercase tracking-wide transition-colors",
                              readOnly && "opacity-70"
                           )}>
                              <ListFilter className="size-4" />
                              Daftar Opsi
                           </Label>
                           <Input
                              value={field.options?.join(', ') || ''}
                              onChange={(e) => onUpdateField(index, { options: e.target.value.split(',').map(s => s.trim()) })}
                              className={cn(
                                 "h-11 transition-all bg-background",
                                 readOnly && "bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 border-neutral-200 dark:border-neutral-800"
                              )}
                              placeholder="Pisahkan dengan koma (Contoh: Pria, Wanita, Lainnya)"
                              disabled={readOnly}
                           />
                           <p className={cn(
                              "text-[10px] italic mt-1 transition-colors",
                              readOnly ? "text-neutral-400" : "text-muted-foreground"
                           )}>Gunakan koma (,) untuk memisahkan setiap pilihan yang tersedia.</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

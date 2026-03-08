import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select, SelectContent, SelectItem,
   SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
   Trash2, ArrowUp, ArrowDown, Settings2,
   Type, Info, ListFilter, Database, ShieldCheck,
   AlertCircle
} from 'lucide-react';

export interface FormFieldData {
   label: string;
   name: string;
   type: string;
   placeholder: string;
   data_type: string;
   options: string[] | null;
   validation_rules: string | null;
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
   // Helper to parse Laravel rules
   const parseRules = (rulesStr: string | null) => {
      const rules = (rulesStr || '').split('|');
      const result: Record<string, any> = {
         required: rules.includes('required'),
         email: rules.includes('email'),
         numeric: rules.includes('numeric') ||
            rules.some(r => r.startsWith('digits') || r.startsWith('min_digits') || r.startsWith('max_digits')),
         min: null,
         max: null,
      };

      rules.forEach(r => {
         // Standard min/max
         if (r.startsWith('min:')) result.min = r.split(':')[1];
         if (r.startsWith('max:')) result.max = r.split(':')[1];

         // Digits rules
         if (r.startsWith('digits:')) {
            const val = r.split(':')[1];
            result.min = val;
            result.max = val;
         }
         if (r.startsWith('digits_between:')) {
            const [min, max] = r.split(':')[1].split(',');
            result.min = min;
            result.max = max;
         }
         if (r.startsWith('min_digits:')) result.min = r.split(':')[1];
         if (r.startsWith('max_digits:')) result.max = r.split(':')[1];
      });

      return result;
   };

   // Helper to build Laravel rules string
   const buildRulesStr = (data: Record<string, any>) => {
      const rules = [];
      if (data.required) rules.push('required');
      if (data.email) rules.push('email');

      if (data.numeric) {
         if (data.min && data.max && data.min === data.max) {
            rules.push(`digits:${data.min}`);
         } else if (data.min && data.max) {
            rules.push(`digits_between:${data.min},${data.max}`);
         } else if (data.min) {
            rules.push(`min_digits:${data.min}`);
         } else if (data.max) {
            rules.push(`max_digits:${data.max}`);
         } else {
            rules.push('numeric');
         }
      } else {
         if (data.min) rules.push(`min:${data.min}`);
         if (data.max) rules.push(`max:${data.max}`);
      }

      return rules.join('|') || null;
   };

   const toggleRule = (index: number, ruleName: string) => {
      const currentRules = parseRules(fields[index].validation_rules);
      currentRules[ruleName] = !currentRules[ruleName];

      const newRulesStr = buildRulesStr(currentRules);
      onUpdateField(index, {
         validation_rules: newRulesStr,
         is_required: currentRules.required
      });
   };

   const updateRuleValue = (index: number, ruleName: string, value: string) => {
      const currentRules = parseRules(fields[index].validation_rules);
      currentRules[ruleName] = value || null;

      const newRulesStr = buildRulesStr(currentRules);
      onUpdateField(index, { validation_rules: newRulesStr });
   };

   return (
      <div className="space-y-6">
         {fields.map((field, index) => {
            const rules = parseRules(field.validation_rules);

            return (
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
                              Label Pertanyaan <span className="text-destructive">*</span>
                           </Label>
                           <Input
                              value={field.label}
                              onChange={(e) => {
                                 const newLabel = e.target.value;
                                 const autoSlug = newLabel
                                    .toLowerCase()
                                    .trim()
                                    .replace(/\s+/g, '_')
                                    .replace(/[^\w]/g, '')
                                    .replace(/__+/g, '_')
                                    .replace(/^_|_$/g, '');

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
                              Placeholder
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

                        <div className="flex flex-col md:col-span-2 gap-3 mt-4 pt-4 border-t border-dashed">
                           <Label className={cn(
                              "text-sm font-semibold tracking-wider flex items-center gap-2",
                              readOnly && "opacity-50"
                           )}>
                              <ShieldCheck className="size-3.5 text-muted-foreground" />
                              Opsi Validasi & Batasan Isian
                           </Label>

                           <div className="flex flex-wrap items-center gap-3">
                              <Button
                                 type="button"
                                 variant={rules.required ? "default" : "outline"}
                                 size="sm"
                                 disabled={readOnly}
                                 onClick={() => toggleRule(index, 'required')}
                                 className={cn(
                                    "h-9 px-3 gap-2 rounded-lg transition-all text-xs",
                                    rules.required && "bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100"
                                 )}
                              >
                                 <Checkbox
                                    checked={rules.required}
                                    className="border-white/50 data-[state=checked]:bg-transparent data-[state=checked]:border-white"
                                    disabled={readOnly}
                                 />
                                 Wajib Diisi
                              </Button>

                              <Button
                                 type="button"
                                 variant={rules.email ? "default" : "outline"}
                                 size="sm"
                                 disabled={readOnly}
                                 onClick={() => toggleRule(index, 'email')}
                                 className={cn(
                                    "h-9 px-3 gap-2 rounded-lg transition-all text-xs",
                                    rules.email && "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100"
                                 )}>
                                 Format Email
                              </Button>

                              <Button
                                 type="button"
                                 variant={rules.numeric ? "default" : "outline"}
                                 size="sm"
                                 disabled={readOnly}
                                 onClick={() => toggleRule(index, 'numeric')}
                                 className={cn(
                                    "h-9 px-3 gap-2 rounded-lg transition-all text-xs",
                                    rules.numeric && "bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-100"
                                 )}
                              >
                                 Hanya Angka
                              </Button>
                              <div className="flex items-center gap-2 ml-auto">
                                 <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                                    <span className="text-[10px] font-bold text-neutral-500 px-2 uppercase">Karakter:</span>
                                    <Input
                                       type="text"
                                       inputMode="numeric"
                                       placeholder="Min"
                                       value={rules.min || ''}
                                       disabled={readOnly}
                                       onChange={(e) => updateRuleValue(index, 'min', e.target.value.replace(/\D/g, ''))}
                                       className="h-7 w-16 text-xs bg-background border-none shadow-none focus-visible:ring-1 text-center"
                                    />
                                    <div className="w-px h-3 bg-neutral-300" />
                                    <Input
                                       type="text"
                                       inputMode="numeric"
                                       placeholder="Max"
                                       value={rules.max || ''}
                                       disabled={readOnly}
                                       onChange={(e) => updateRuleValue(index, 'max', e.target.value.replace(/\D/g, ''))}
                                       className="h-7 w-16 text-xs bg-background border-none shadow-none focus-visible:ring-1 text-center"
                                    />
                                 </div>
                              </div>
                           </div>

                           {!readOnly && (
                              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/80 bg-neutral-50 dark:bg-neutral-900/30 p-2 rounded-md italic">
                                 <AlertCircle className="size-3" />
                                 <span>Default sistem: Wajib diisi. Pastikan aturan yang dipilih sesuai dengan tipe input dan format jawaban.</span>
                              </div>
                           )}
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
            );
         })}
      </div>
   );
}

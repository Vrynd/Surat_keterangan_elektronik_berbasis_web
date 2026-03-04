import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Send } from 'lucide-react';
import { digitOnly, validateForm, isFormValid } from '@/lib/validation';
import { domisiliSchema } from './validation.schema';

export interface DomisiliFormData {
   namaLengkap: string;
   nik: string;
   tempatLahir: string;
   tanggalLahir: string;
   jenisKelamin: string;
   pekerjaan: string;
   alamat: string;
   rt: string;
   rw: string;
   keperluan: string;
}

const initialFormData: DomisiliFormData = {
   namaLengkap: '',
   nik: '',
   tempatLahir: '',
   tanggalLahir: '',
   jenisKelamin: '',
   pekerjaan: '',
   alamat: '',
   rt: '',
   rw: '',
   keperluan: '',
};

interface FormDomisiliProps {
   onChange?: (data: DomisiliFormData) => void;
   onSubmit?: (data: DomisiliFormData) => void;
}

export function FormDomisili({ onChange, onSubmit }: FormDomisiliProps) {
   const [formData, setFormData] = useState<DomisiliFormData>(initialFormData);
   const [errors, setErrors] = useState<Partial<Record<keyof DomisiliFormData, string>>>({});

   const updateField = useCallback(
      (field: keyof DomisiliFormData, value: string) => {
         const updated = { ...formData, [field]: value };
         setFormData(updated);
         onChange?.(updated);

         if (errors[field]) {
            setErrors((prev) => {
               const next = { ...prev };
               delete next[field];
               return next;
            });
         }
      },
      [formData, onChange, errors],
   );

   const inputDigit = useCallback(
      (field: keyof DomisiliFormData, value: string, maxLength?: number) => {
         const cleaned = digitOnly(value);
         const limited = maxLength ? cleaned.slice(0, maxLength) : cleaned;
         updateField(field, limited);
      },
      [updateField],
   );

   const validate = useCallback((): boolean => {
      const newErrors = validateForm(formData, domisiliSchema);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   }, [formData]);

   const submitForm = useCallback(
      (e: React.FormEvent) => {
         e.preventDefault();
         if (validate()) {
            onSubmit?.(formData);
         }
      },
      [formData, validate, onSubmit],
   );

   const isFormComplete = isFormValid(formData, domisiliSchema);

   return (
      <form onSubmit={submitForm} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="namaLengkap">
                  Nama Lengkap <span className="text-red-500">*</span>
               </Label>
               <Input
                  id="namaLengkap"
                  autoComplete='on'
                  required
                  autoFocus
                  placeholder="Masukkan nama sesuai KTP"
                  className='w-full h-11'
                  value={formData.namaLengkap}
                  onChange={(e) => updateField('namaLengkap', e.target.value)}
                  aria-invalid={!!errors.namaLengkap}
               />
               {errors.namaLengkap && (
                  <p className="text-xs text-red-500">{errors.namaLengkap}</p>
               )}
            </div>

            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="nik">
                  Nomor Induk Kependudukan <span className="text-red-500">*</span>
               </Label>
               <div className="relative">
                  <Input
                     id="nik"
                     placeholder="Masukkan 16 digit NIK"
                     value={formData.nik}
                     onChange={(e) => inputDigit('nik', e.target.value, 16)}
                     inputMode="numeric"
                     autoFocus
                     required
                     className="w-full h-11 pr-16"
                     maxLength={16}
                     aria-invalid={!!errors.nik}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 pointer-events-none">
                     {formData.nik.length}/16
                  </span>
               </div>
               {errors.nik && (
                  <p className="text-xs text-red-500">{errors.nik}</p>
               )}
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="tempatLahir">
                  Tempat Lahir <span className="text-red-500">*</span>
               </Label>
               <Input
                  id="tempatLahir"
                  placeholder="Kota / Kabupaten"
                  value={formData.tempatLahir}
                  autoFocus
                  required
                  autoComplete='on'
                  className='w-full h-11'
                  onChange={(e) => updateField('tempatLahir', e.target.value)}
                  aria-invalid={!!errors.tempatLahir}
               />
               {errors.tempatLahir && (
                  <p className="text-xs text-red-500">{errors.tempatLahir}</p>
               )}
            </div>
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="tanggalLahir">
                  Tanggal Lahir <span className="text-red-500">*</span>
               </Label>
               <Input
                  id="tanggalLahir"
                  type="date"
                  value={formData.tanggalLahir}
                  autoFocus
                  required
                  className='w-full h-11'
                  onChange={(e) => updateField('tanggalLahir', e.target.value)}
                  aria-invalid={!!errors.tanggalLahir}
               />
               {errors.tanggalLahir && (
                  <p className="text-xs text-red-500">{errors.tanggalLahir}</p>
               )}
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="jenisKelamin">
                  Jenis Kelamin <span className="text-red-500">*</span>
               </Label>
               <Select
                  value={formData.jenisKelamin}
                  onValueChange={(value) => updateField('jenisKelamin', value)}>
                  <SelectTrigger
                     id="jenisKelamin"
                     className="w-full h-12 rounded-lg px-4 focus-visible:border-emerald-500 focus-visible:ring-emerald-200/40 focus-visible:ring-[3px]"
                     aria-invalid={!!errors.jenisKelamin}>
                     <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                     <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
               </Select>
               {errors.jenisKelamin && (
                  <p className="text-xs text-red-500">{errors.jenisKelamin}</p>
               )}
            </div>
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="pekerjaan">
                  Pekerjaan <span className="text-red-500">*</span>
               </Label>
               <Input
                  id="pekerjaan"
                  placeholder="Masukkan pekerjaan saat ini"
                  value={formData.pekerjaan}
                  autoFocus
                  required
                  autoComplete='on'
                  className='w-full h-11'
                  onChange={(e) => updateField('pekerjaan', e.target.value)}
                  aria-invalid={!!errors.pekerjaan}
               />
               {errors.pekerjaan && (
                  <p className="text-xs text-red-500">{errors.pekerjaan}</p>
               )}
            </div>
         </div>



         <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="rt">
                  RT <span className="text-red-500">*</span>
               </Label>
               <Input
                  id="rt"
                  placeholder="001"
                  value={formData.rt}
                  autoFocus
                  required
                  className='h-11'
                  onChange={(e) => inputDigit('rt', e.target.value, 3)}
                  inputMode="numeric"
                  maxLength={3}
                  aria-invalid={!!errors.rt}
               />
               {errors.rt && (
                  <p className="text-xs text-red-500">{errors.rt}</p>
               )}
            </div>
            <div className="flex flex-col gap-2 items-stretch">
               <Label htmlFor="rw">
                  RW <span className="text-red-500">*</span>
               </Label>
               <Input
                  id="rw"
                  placeholder="001"
                  value={formData.rw}
                  onChange={(e) => inputDigit('rw', e.target.value, 3)}
                  inputMode="numeric"
                  autoFocus
                  required
                  className='h-11'
                  maxLength={3}
                  aria-invalid={!!errors.rw}
               />
               {errors.rw && (
                  <p className="text-xs text-red-500">{errors.rw}</p>
               )}
            </div>
         </div>

         <div className="flex flex-col gap-2 items-stretch">
            <Label htmlFor="alamatLengkap">
               Alamat Lengkap <span className="text-red-500">*</span>
            </Label>
            <Textarea
               id="alamatLengkap"
               placeholder="Masukkan alamat tempat tinggal saat ini"
               value={formData.alamat}
               autoFocus
               required
               rows={2}
               autoComplete='on'
               className='w-full '
               onChange={(e) => updateField('alamat', e.target.value)}
               aria-invalid={!!errors.alamat}
            />
            {errors.alamat && (
               <p className="text-xs text-red-500">{errors.alamat}</p>
            )}
         </div>

         <div className="flex flex-col gap-2 items-stretch">
            <Label htmlFor="keperluan">
               Keperluan <span className="text-red-500">*</span>
            </Label>
            <Textarea
               id="keperluan"
               placeholder="Tuliskan tujuan pembuatan surat keterangan domisili"
               value={formData.keperluan}
               onChange={(e) => updateField('keperluan', e.target.value)}
               rows={2}
               autoFocus
               required
               aria-invalid={!!errors.keperluan}
            />
            {errors.keperluan && (
               <p className="text-xs text-red-500">{errors.keperluan}</p>
            )}
         </div>

         <Button
            type="submit"
            disabled={!isFormComplete}
            variant="emerald"
            size="lg">
            <Send className="size-4" />
            Ajukan Surat
         </Button>
      </form>
   );
}

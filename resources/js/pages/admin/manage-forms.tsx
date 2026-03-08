import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import type { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { unslugify } from '@/lib/utils';
import FormBuilder, { type FormFieldData } from '@/components/forms/form-builder';
import { CirclePlusIcon, Plus, Save, Trash2, Edit2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/empty-state';
import { ActionBar } from '@/components/action-bar';
import { useState, useEffect } from 'react';

interface Props {
   letterType: any;
   fields: FormFieldData[];
}

export default function ManageForms() {
   const { letterType, fields: initialFields } = usePage<any>().props;
   const [fields, setFields] = useState<FormFieldData[]>([]);
   const [saving, setSaving] = useState(false);
   const [isEditable, setIsEditable] = useState(false);

   useEffect(() => {
      const initial = initialFields || [];
      setFields(initial);
      // Auto-unlock if empty, otherwise start as read-only
      if (initial.length === 0) {
         setIsEditable(true);
      } else {
         setIsEditable(false);
      }
   }, [initialFields]);

   const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
   const letterName = letterType?.name || unslugify(urlParams.get('type') || 'Surat Keterangan');

   const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Dashboard', href: '/admin/dashboard' },
      {
         title: letterName,
         href: `/admin/edit-letter?id=${letterType?.id || urlParams.get('id')}&type=${letterType?.code || urlParams.get('type')}`,
      },
      { title: 'Kelola Formulir', href: '#' },
   ];

   const addField = () => {
      const newField: FormFieldData = {
         label: '',
         name: '',
         type: '',
         placeholder: '',
         data_type: '',
         options: null,
         validation_rules: null,
         order_position: fields.length,
         is_required: false,
         is_full_width: false,
      };
      setFields([...fields, newField]);
   };

   const updateField = (index: number, data: Partial<FormFieldData>) => {
      const newFields = [...fields];
      newFields[index] = { ...newFields[index], ...data };
      setFields(newFields);
   };

   const removeField = (index: number) => {
      setFields(fields.filter((_, i) => i !== index));
   };

   const moveField = (index: number, direction: 'up' | 'down') => {
      if (direction === 'up' && index === 0) return;
      if (direction === 'down' && index === fields.length - 1) return;

      const newFields = [...fields];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = newFields[index];
      newFields[index] = newFields[targetIndex];
      newFields[targetIndex] = temp;

      const updatedFields = newFields.map((f, i) => ({ ...f, order_position: i }));
      setFields(updatedFields);
   };

   const clearAll = () => {
      setFields([]);
   };

   const cancelEdit = () => {
      setFields(initialFields || []);
      setIsEditable(false);
   };

   const saveForm = () => {
      setSaving(true);
      router.post(route('admin.manage.forms.store', letterType.id), {
         fields: fields.map((f, i) => ({ ...f, order_position: i }))
      }, {
         onFinish: () => {
            setSaving(false);
            setIsEditable(false);
         },
      });
   };

   const handleHeaderAction = () => {
      if (!isEditable) {
         setIsEditable(true);
      } else {
         addField();
      }
   };

   return (
      <FeatureLayout
         title={letterName}
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Buat & Kelola Formulir
            </h1>
         }
      >
         <div className="space-y-8">
            <Heading
               title={letterName}
               description="Tentukan field input dan persyaratan dokumen yang harus dipenuhi oleh pemohon"
               action={
                  <Button
                     variant={isEditable ? "default" : "secondary"}
                     size="sm"
                     onClick={handleHeaderAction}
                     className='cursor-pointer'>
                     {isEditable ? (
                        <>
                           <Plus className="size-5" />
                           Tambah Field
                        </>
                     ) : (
                        <>
                           <Edit2 className="size-4" />
                           Edit Formulir
                        </>
                     )}
                  </Button>
               }
            />

            {fields.length === 0 ? (
               <EmptyState
                  variant="base"
                  icon={CirclePlusIcon}
                  title="Belum Ada Field"
                  description="Sistem belum memiliki daftar field. Mulai dengan membuat field pertama Anda."
               />
            ) : (
               <>
                  <FormBuilder
                     fields={fields}
                     onUpdateField={updateField}
                     onRemoveField={removeField}
                     onMoveField={moveField}
                     readOnly={!isEditable}
                  />

                  {isEditable && (
                     <ActionBar
                        position="sticky"
                        message={
                           <p className="font-medium text-neutral-600 dark:text-neutral-400">
                              Terdapat <span className="text-neutral-900 dark:text-neutral-100">{fields.length} field</span> pada formulir ini
                           </p>
                        }>
                        <div className='flex items-center gap-3'>
                           {initialFields && initialFields.length > 0 && (
                              <Button
                                 variant="secondary"
                                 size="sm"
                                 onClick={cancelEdit}
                                 className="cursor-pointer">
                                 <RotateCcw className="size-4" />
                                 Batal
                              </Button>
                           )}
                           <Button
                              variant="destructive"
                              size="sm"
                              onClick={clearAll}
                              className="cursor-pointer">
                              <Trash2 className="size-4" />
                              Hapus Semua
                           </Button>
                        </div>
                        <Button
                           variant="default"
                           size="sm"
                           onClick={saveForm}
                           disabled={saving}
                           className="cursor-pointer"
                        >
                           <Save className="size-4" />
                           {saving ? 'Menyimpan...' : (initialFields && initialFields.length > 0 ? 'Simpan Perubahan' : 'Simpan')}
                        </Button>
                     </ActionBar>
                  )}
               </>
            )}
         </div>
      </FeatureLayout>
   );
}

declare function route(name: string, params?: any): string;

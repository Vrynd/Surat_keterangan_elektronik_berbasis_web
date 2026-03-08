import {
    required,
    requiredSelect,
    exactLength,
    minLength,
    range,
    type ValidationSchema,
} from '@/lib/validation';
export interface LetterTypeFormData {
    name: string;
    code: string;
    category: string;
    description: string;
    processing_time: string;
    validity_period: string;
    is_active: boolean;
}

export const letterTypeSchema: ValidationSchema<LetterTypeFormData> = {
    name: [(v) => required(v, 'Nama surat')],
    code: [
        (v) => required(v, 'Kode surat'),
        (v) => minLength(v, 3, 'Kode surat'),
    ],
    category: [(v) => requiredSelect(v, 'Kategori')],
    description: [
        (v) => required(v, 'Deskripsi layanan'),
        (v) => minLength(v, 10, 'Deskripsi layanan'),
    ],
    processing_time: [
        (v) => required(v, 'Estimasi waktu proses'),
        (v) => range(v, 1, 31, 'Estimasi waktu proses'),
    ],
    validity_period: [
        (v) => required(v, 'Masa berlaku'),
        (v) => range(v, 1, 120, 'Masa berlaku'),
    ],
    is_active: [],
};

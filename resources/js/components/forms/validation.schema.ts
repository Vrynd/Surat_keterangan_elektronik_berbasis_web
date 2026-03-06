import {
    required,
    requiredSelect,
    exactLength,
    minLength,
    range,
    type ValidationSchema,
} from '@/lib/validation';
import type { DomisiliFormData } from './form-domisili';

export const domisiliSchema: ValidationSchema<DomisiliFormData> = {
    namaLengkap: [(v) => required(v, 'Nama lengkap')],
    nik: [(v) => required(v, 'NIK'), (v) => exactLength(v, 16, 'NIK')],
    tempatLahir: [(v) => required(v, 'Tempat lahir')],
    tanggalLahir: [(v) => required(v, 'Tanggal lahir')],
    jenisKelamin: [(v) => requiredSelect(v, 'Jenis kelamin')],
    pekerjaan: [(v) => required(v, 'Pekerjaan')],
    alamat: [(v) => required(v, 'Alamat')],
    rt: [(v) => required(v, 'RT')],
    rw: [(v) => required(v, 'RW')],
    keperluan: [(v) => required(v, 'Keperluan')],
};

export interface LetterTypeFormData {
    name: string;
    code: string;
    category: string;
    description: string;
    processing_time: string;
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
};

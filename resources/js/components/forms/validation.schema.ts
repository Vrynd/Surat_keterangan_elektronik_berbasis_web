import {
    required,
    requiredSelect,
    exactLength,
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

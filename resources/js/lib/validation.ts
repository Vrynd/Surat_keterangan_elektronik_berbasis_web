export type ValidationResult = string | null;
export type FieldValidator<T> = (value: T) => ValidationResult;

export function required(value: string, label: string): ValidationResult {
    return !value.trim() ? `${label} wajib diisi` : null;
}

export function requiredSelect(value: string, label: string): ValidationResult {
    return !value ? `${label} wajib dipilih` : null;
}

export function exactLength(
    value: string,
    length: number,
    label: string,
): ValidationResult {
    return value.length !== length ? `${label} harus ${length} digit` : null;
}

export function minLength(
    value: string,
    min: number,
    label: string,
): ValidationResult {
    return value.trim().length < min
        ? `${label} minimal ${min} karakter`
        : null;
}

export function digitOnly(value: string): string {
    return value.replace(/\D/g, '');
}

export type ValidationSchema<T> = {
    [K in keyof T]?: ((value: T[K]) => ValidationResult)[];
};

export function validateForm<T extends object>(
    data: T,
    schema: ValidationSchema<T>,
): Partial<Record<keyof T, string>> {
    const errors: Partial<Record<keyof T, string>> = {};

    for (const key of Object.keys(schema) as (keyof T)[]) {
        const validators = schema[key];
        if (!validators) continue;

        for (const validator of validators) {
            const error = validator(data[key]);
            if (error) {
                errors[key] = error;
                break; // stop at first error per field
            }
        }
    }

    return errors;
}

export function isFormValid<T extends object>(
    data: T,
    schema: ValidationSchema<T>,
): boolean {
    return Object.keys(validateForm(data, schema)).length === 0;
}

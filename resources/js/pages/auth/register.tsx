import { Form, Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

function IconEye(props: React.SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function IconEyeOff(props: React.SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
            <path d="m2 2 20 20" />
        </svg>
    );
}


type PasswordStrength = {
    score: number;
    label: string;
    color: string;
    bgColor: string;
};

function getPasswordStrength(password: string): PasswordStrength {
    let score = 0;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: 'Sangat lemah', color: 'text-red-500', bgColor: 'bg-red-500' };
    if (score === 2) return { score, label: 'Lemah', color: 'text-orange-500', bgColor: 'bg-orange-500' };
    if (score === 3) return { score, label: 'Cukup', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (score === 4) return { score, label: 'Kuat', color: 'text-emerald-500', bgColor: 'bg-emerald-500' };
    return { score, label: 'Sangat kuat', color: 'text-emerald-600', bgColor: 'bg-emerald-600' };
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');

    const strength = useMemo(() => getPasswordStrength(password), [password]);


    return (
        <AuthLayout
            title="Buat akun baru"
            description="Masukkan data diri Anda untuk membuat akun"
        >
            <Head title="Daftar Akun" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama lengkap"
                                    className="h-11"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="h-11"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Kata sandi</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Kata sandi"
                                        className="pr-10 h-11"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <IconEyeOff className="size-4" />
                                        ) : (
                                            <IconEye className="size-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-1 gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < strength.score
                                                        ? strength.bgColor
                                                        : 'bg-gray-200 dark:bg-gray-700'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className={`text-xs font-medium ${strength.color}`}>
                                            {strength.label}
                                        </span>
                                    </div>
                                )}

                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Konfirmasi kata sandi
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Konfirmasi kata sandi"
                                        className="pr-10 h-11"
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <IconEyeOff className="size-4" />
                                        ) : (
                                            <IconEye className="size-4" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full text-base font-semibold cursor-pointer bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25
                         transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Daftar
                            </Button>
                        </div>

                        <div className="text-center cursor-pointer text-sm text-muted-foreground">
                            Sudah punya akun?{' '}
                            <TextLink href={login().url} tabIndex={6}>
                                Masuk
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import type { SVGAttributes } from 'react';

function IconUserPlus(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M6.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM3.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM19.75 7.5a.75.75 0 0 0-1.5 0v2.25H16a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H22a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>
    );
}

function IconClipboard(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
        </svg>
    );
}

function IconShieldCheck(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
    );
}

function IconArrowDown(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
    );
}

function IconWhatsApp(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
    );
}

function IconEnvelope(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
        </svg>
    );
}

function IconLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM3.372 17.15L12 22.182V13.18l-9-5.25v8.622a.75.75 0 0 0 .372.648Z" />
        </svg>
    );
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    const steps = [
        {
            title: 'Daftar Akun',
            description: 'Buat akun dengan email dan data diri',
            icon: IconUserPlus,
        },
        {
            title: 'Isi Formulir',
            description: 'Lengkapi formulir pengajuan surat',
            icon: IconClipboard,
        },
        {
            title: 'Verifikasi',
            description: 'Ditinjau dan disetujui oleh administrasi',
            icon: IconShieldCheck,
        },
        {
            title: 'Unduh Surat',
            description: 'Surat siap diunduh kapan saja',
            icon: IconArrowDown,
        },
    ];

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 p-10 text-white lg:flex">
                <div className="pointer-events-none absolute inset-0">
                    {/* Gradient blurs */}
                    <div className="absolute -top-24 -left-24 h-[450px] w-[450px] rounded-full bg-cyan-400/20 blur-3xl" />
                    <div className="absolute -right-20 -bottom-10 h-[400px] w-[400px] rounded-full bg-teal-300/15 blur-3xl" />
                    <div className="absolute top-1/4 right-10 h-[250px] w-[250px] rounded-full bg-white/8 blur-3xl" />
                    <div className="absolute bottom-1/3 left-1/4 h-[200px] w-[200px] rounded-full bg-emerald-200/10 blur-2xl" />

                    {/* Dot grid pattern */}
                    <div className="absolute top-8 right-8 grid grid-cols-5 gap-3 opacity-20">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className="size-1.5 rounded-full bg-white" />
                        ))}
                    </div>

                    {/* Floating rings */}
                    <div className="absolute top-[45%] right-16 size-20 rounded-full border-2 border-white/10" />
                    <div className="absolute top-[52%] right-10 size-12 rounded-full border border-white/8" />
                    <div className="absolute bottom-32 left-12 size-16 rounded-full border-2 border-white/6" />
                </div>

                <div className="relative z-10">
                    <Link
                        href={home()}
                        className="group flex items-center gap-3"
                    >
                        <div className="flex size-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform group-hover:scale-105">
                            <IconLogo className="size-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            Sureka<span className="text-emerald-200">.</span>
                        </span>
                    </Link>
                </div>

                <div className="relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-white/20 bg-white/8 p-4 backdrop-blur-sm"
                            >
                                <div className="mb-3 flex items-center gap-3 justify-between">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                                        <step.icon className="size-4.5 text-white" />
                                    </div>
                                    <span className="flex size-6 items-center justify-center rounded-full bg-emerald-400/60 text-xs font-bold text-emerald-00">
                                        {index + 1}
                                    </span>
                                </div>
                                <p className="text-base font-bold text-white">
                                    {step.title}
                                </p>
                                <p className="mt-1 text-sm leading-relaxed text-emerald-100/80">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-6">
                    <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-emerald-100/70 transition-colors hover:text-white"
                    >
                        <IconWhatsApp className="size-4 shrink-0" />
                        <span>+62 812-3456-7890</span>
                    </a>
                    <div className="h-4 w-px bg-white/20" />
                    <a
                        href="mailto:support@sureka.id"
                        className="flex items-center gap-2 text-sm text-emerald-100/70 transition-colors hover:text-white"
                    >
                        <IconEnvelope className="size-4 shrink-0" />
                        <span>support@sureka.id</span>
                    </a>
                </div>
            </div>

            <div className="flex h-full w-full items-center justify-center p-6 lg:p-10">
                <div className="w-full max-w-[420px] space-y-6">
                    <Link
                        href={home()}
                        className="flex items-center justify-center gap-3 lg:hidden"
                    >
                        <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-teal-500 shadow-lg shadow-emerald-500/25">
                            <IconLogo className="size-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight">
                            Sureka<span className="text-emerald-500">.</span>
                        </span>
                    </Link>

                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}

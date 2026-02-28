import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { useEffect, useRef, useState, type SVGAttributes } from 'react';

function IconBolt(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function IconShield(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function IconQrCode(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5ZM14.625 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5ZM4.875 14.25a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM13.5 13.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm3 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-1.5 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-1.5 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm4.5-3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-1.5 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function IconDownload(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function IconDocument(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                clipRule="evenodd"
            />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
        </svg>
    );
}

function IconClipboardCheck(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                clipRule="evenodd"
            />
            <path
                fillRule="evenodd"
                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function IconCheckBadge(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function IconArrowRight(props: SVGAttributes<SVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function useCountUp(target: number, duration = 2000, startOnView = true) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        if (!startOnView) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const step = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        setCount(Math.floor(progress * target));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [target, duration, startOnView]);

    return { count, ref };
}

function useFadeIn() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.15 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}

function Section({
    children,
    className = '',
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    const { ref, visible } = useFadeIn();
    return (
        <section
            id={id}
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
        >
            {children}
        </section>
    );
}

function StatCard({
    target,
    label,
    prefix = '',
    suffix = '',
    icon,
}: {
    target: number;
    label: string;
    prefix?: string;
    suffix?: string;
    icon: React.ReactNode;
}) {
    const { count, ref } = useCountUp(target, 2200);
    return (
        <div ref={ref} className="flex items-center gap-5 rounded-2xl border border-white/20 bg-white/10 px-6 py-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/15">
                {icon}
            </div>
            <div>
                <p className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    {prefix}
                    {count}
                    {suffix}
                </p>
                <p className="mt-1 text-sm font-medium text-emerald-100/80">{label}</p>
            </div>
        </div>
    );
}


const STEPS = [
    {
        icon: IconClipboardCheck,
        number: '01',
        title: 'Ajukan Permohonan',
        desc: 'Isi formulir pengajuan surat keterangan secara online melalui platform kami.',
    },
    {
        icon: IconShield,
        number: '02',
        title: 'Proses Verifikasi',
        desc: 'Permohonan Anda akan diverifikasi oleh petugas berwenang secara real-time.',
    },
    {
        icon: IconCheckBadge,
        number: '03',
        title: 'Surat Terbit',
        desc: 'Surat keterangan elektronik siap diunduh dan digunakan kapan saja.',
    },
] as const;


export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Sureka — Surat Keterangan Elektronik">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=quicksand:300,400,500,600,700&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Sureka — Platform layanan surat keterangan elektronik yang mempermudah proses pengajuan dan penerbitan surat secara digital. Cepat, aman, dan terpercaya."
                />
            </Head>

            <div
                className="flex min-h-screen flex-col gap-0 bg-linear-to-b from-gray-50 via-white to-gray-50 text-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100"
                style={{ fontFamily: "'Quicksand', system-ui, sans-serif" }}
            >
                <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg dark:border-gray-800/60 dark:bg-gray-950/80">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2.5">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-600 to-teal-500 shadow-md shadow-emerald-500/20">
                                <IconDocument className="size-5 text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                Sureka
                            </span>
                        </a>

                        {/* Navigation Links */}
                        <div className="hidden items-center gap-8 text-sm font-semibold text-gray-600 md:flex dark:text-gray-400">
                            <a href="#fitur" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                                Fitur
                            </a>
                            <a href="#cara-kerja" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                                Cara Kerja
                            </a>
                            <a href="#statistik" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                                Statistik
                            </a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-2 text-sm font-bold text-white shadow-md shadow-emerald-500/25 transition-all hover:shadow-lg hover:shadow-emerald-500/30 hover:brightness-110"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-lg px-4 py-2 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-2 text-sm font-bold text-white shadow-md shadow-emerald-500/25 transition-all hover:shadow-lg hover:shadow-emerald-500/30 hover:brightness-110"
                                        >
                                            Daftar
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>
                <header className="relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-linear-to-br from-emerald-200/50 to-teal-200/40 blur-3xl dark:from-emerald-900/20 dark:to-teal-900/15" />
                        <div className="absolute top-1/2 -left-60 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-teal-100/40 to-cyan-100/30 blur-3xl dark:from-teal-950/20 dark:to-cyan-950/15" />
                    </div>

                    <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-16 pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-24 lg:pb-28">
                        {/* Left — Text content */}
                        <div className="order-2 lg:order-1">
                            {/* Badge */}
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700 backdrop-blur-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                                </span>
                                Platform Surat Keterangan Digital
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15] dark:text-white">
                                Surat Keterangan{' '}
                                <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                                    Elektronik
                                </span>
                                <br />
                                Cepat, Aman & Terpercaya
                            </h1>

                            {/* Sub-headline */}
                            <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-600 lg:text-lg dark:text-gray-400">
                                Platform layanan surat keterangan elektronik yang mempermudah proses pengajuan dan penerbitan surat secara digital. Tidak perlu antre, cukup beberapa langkah mudah.
                            </p>

                            {/* CTAs */}
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                                    >
                                        Masuk ke Dashboard
                                        <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={register()}
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                                        >
                                            Daftar Sekarang
                                            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                        </Link>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-base font-bold text-gray-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-emerald-500/40 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                                        >
                                            Masuk
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right — Visual / Mock Document Cards */}
                        <div className="relative order-1 flex items-center justify-center lg:order-2">
                            <div className="absolute h-72 w-72 rounded-full bg-linear-to-br from-emerald-200/60 to-teal-200/50 blur-3xl dark:from-emerald-800/20 dark:to-teal-800/15" />

                            {/* Stacked cards */}
                            <div className="relative w-full max-w-sm">
                                {/* Back card */}
                                <div className="absolute top-6 right-4 left-4 rounded-2xl border border-gray-200/50 bg-white/60 p-5 shadow-lg backdrop-blur-sm dark:border-gray-700/40 dark:bg-gray-800/40">
                                    <div className="flex items-center gap-3">
                                        <div className="size-9 rounded-lg bg-gray-200/60 dark:bg-gray-700/40" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-3/4 rounded-full bg-gray-200/80 dark:bg-gray-700/50" />
                                            <div className="h-2.5 w-1/2 rounded-full bg-gray-200/60 dark:bg-gray-700/30" />
                                        </div>
                                    </div>
                                </div>

                                {/* Front card */}
                                <div className="relative z-10 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xl shadow-emerald-900/8 dark:border-gray-700/60 dark:bg-gray-800/90">
                                    {/* Card header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/40 dark:to-teal-800/30">
                                                <IconCheckBadge className="size-6 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                                    Surat Keterangan Domisili
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    No. SKD/2026/02/001
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Separator */}
                                    <div className="my-4 border-t border-dashed border-gray-200 dark:border-gray-700" />

                                    {/* Mock content lines */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-gray-500 dark:text-gray-400">Nama</span>
                                            <span className="font-bold text-gray-800 dark:text-gray-200">Ahmad Surya</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-gray-500 dark:text-gray-400">Tanggal Terbit</span>
                                            <span className="font-bold text-gray-800 dark:text-gray-200">28 Feb 2026</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-gray-500 dark:text-gray-400">Status</span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                Terverifikasi
                                            </span>
                                        </div>
                                    </div>

                                    {/* QR Code placeholder */}
                                    <div className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900/50">
                                        <div className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <IconQrCode className="size-6 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300">QR Verifikasi</p>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">Scan untuk validasi keaslian</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <Section id="fitur" className="scroll-mt-20 py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-5">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                                Fitur Unggulan
                            </p>
                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Kenapa Memilih Sureka?
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                Platform kami dirancang untuk memberikan pengalaman terbaik dalam pengelolaan surat keterangan secara digital.
                            </p>
                        </div>

                        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Card 1 — Proses Cepat */}
                            <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-all duration-300 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80">
                                <div className="flex-1 p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
                                            <IconBolt className="size-6 text-amber-500 dark:text-amber-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Proses Cepat</h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        Pengajuan surat dapat diproses dalam hitungan menit tanpa perlu antre. Sistem otomatis memverifikasi data secara instan.
                                    </p>
                                </div>
                                <div className="flex items-center justify-center border-t border-gray-100 bg-gray-50/50 p-5 dark:border-gray-700/60 dark:bg-gray-900/30">
                                    <div className="w-full max-w-[240px]">
                                        <div className="rounded-xl bg-white p-3.5 shadow-sm dark:bg-gray-800">
                                            <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 dark:text-gray-400">
                                                <span>Memproses…</span>
                                                <span className="text-amber-600 dark:text-amber-400">95%</span>
                                            </div>
                                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div className="h-full animate-pulse rounded-full bg-linear-to-r from-amber-400 to-orange-500" style={{ width: '95%' }} />
                                            </div>
                                        </div>
                                        <div className="mt-2.5 flex justify-center gap-2">
                                            {['Dikirim', 'Diproses', 'Selesai'].map((s, i) => (
                                                <span key={s} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${i < 2 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'}`}>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 — Keamanan Terjamin */}
                            <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-all duration-300 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80">
                                <div className="flex-1 p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                                            <IconShield className="size-6 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Keamanan Terjamin</h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        Dokumen dienkripsi dan disimpan dengan aman di server yang terlindungi. Dilengkapi tanda tangan digital untuk keaslian.
                                    </p>
                                </div>
                                <div className="flex items-center justify-center border-t border-gray-100 bg-gray-50/50 p-5 dark:border-gray-700/60 dark:bg-gray-900/30">
                                    <div className="w-full max-w-[240px]">
                                        <div className="relative rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                                            <div className="space-y-2">
                                                <div className="h-2 w-full rounded bg-gray-200 dark:bg-gray-700" style={{ filter: 'blur(2px)' }} />
                                                <div className="h-2 w-4/5 rounded bg-gray-200 dark:bg-gray-700" style={{ filter: 'blur(2px)' }} />
                                                <div className="h-2 w-3/5 rounded bg-gray-200 dark:bg-gray-700" style={{ filter: 'blur(2px)' }} />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-[1px] dark:bg-gray-900/60">
                                                <div className="flex flex-col items-center gap-1.5">
                                                    <IconShield className="size-8 text-blue-500/80 dark:text-blue-400/80" />
                                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Terenkripsi</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                            <svg className="size-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" /></svg>
                                            SSL 256-bit
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 — Verifikasi QR Code */}
                            <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-all duration-300 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80">
                                <div className="flex-1 p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-500/10">
                                            <IconQrCode className="size-6 text-violet-500 dark:text-violet-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Verifikasi QR Code</h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        Setiap surat dilengkapi QR code untuk memvalidasi keaslian dokumen. Cukup scan untuk memastikan dokumen valid.
                                    </p>
                                </div>
                                <div className="flex items-center justify-center border-t border-gray-100 bg-gray-50/50 p-5 dark:border-gray-700/60 dark:bg-gray-900/30">
                                    <div className="flex flex-col items-center gap-2.5">
                                        <div className="relative flex size-24 items-center justify-center rounded-2xl border-2 border-dashed border-violet-300/60 bg-violet-50/30 dark:border-violet-600/30 dark:bg-violet-500/5">
                                            <IconQrCode className="size-14 text-violet-400/70 dark:text-violet-500/50" />
                                            <div className="absolute inset-x-2 h-0.5 animate-bounce rounded-full bg-linear-to-r from-transparent via-violet-500 to-transparent" />
                                        </div>
                                        <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">Scan untuk verifikasi</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4 — Unduh Kapan Saja */}
                            <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-all duration-300 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80">
                                <div className="flex-1 p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                                            <IconDownload className="size-6 text-emerald-500 dark:text-emerald-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Unduh Kapan Saja</h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        Surat yang sudah terbit dapat diunduh dalam format PDF kapan saja. Akses dokumen dari mana saja tanpa batas waktu.
                                    </p>
                                </div>
                                <div className="flex items-center justify-center border-t border-gray-100 bg-gray-50/50 p-5 dark:border-gray-700/60 dark:bg-gray-900/30">
                                    <div className="w-full max-w-[240px] space-y-2">
                                        {['SK_Domisili.pdf', 'SK_Usaha.pdf'].map((file) => (
                                            <div key={file} className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white p-2.5 dark:border-gray-700 dark:bg-gray-800">
                                                <div className="flex size-7 shrink-0 items-center justify-center rounded bg-red-50 dark:bg-red-500/10">
                                                    <svg className="size-4 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18H17V16H7V18M7 14H17V12H7V14M7 10H11V8H7V10M15.5 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V6.5L15.5 1M19 21H5V3H14V7H19V21Z" /></svg>
                                                </div>
                                                <span className="flex-1 truncate text-[11px] font-bold text-gray-700 dark:text-gray-300">{file}</span>
                                                <IconDownload className="size-3.5 shrink-0 text-emerald-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section id="cara-kerja" className="relative scroll-mt-20 overflow-hidden bg-gray-50/80 py-20 lg:py-28 dark:bg-gray-900/40">
                    <div className="mx-auto max-w-7xl px-5">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                                Cara Kerja
                            </p>
                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Tiga Langkah Mudah
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                                Proses pengajuan surat keterangan menjadi lebih sederhana dan efisien.
                            </p>
                        </div>

                        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-4">
                            {/* Step 1 — Fill out form */}
                            <div className="group relative">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-emerald-600 to-teal-500 text-xs font-extrabold text-white shadow-md">1</span>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Ajukan Permohonan</h3>
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80">
                                    {/* Mini app header */}
                                    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-2.5 dark:border-gray-700/60 dark:bg-gray-900/50">
                                        <div className="flex gap-1.5">
                                            <span className="size-2 rounded-full bg-red-400/60" />
                                            <span className="size-2 rounded-full bg-amber-400/60" />
                                            <span className="size-2 rounded-full bg-emerald-400/60" />
                                        </div>
                                        <div className="ml-2 h-4 flex-1 rounded-md bg-gray-200/60 dark:bg-gray-700/50" />
                                    </div>
                                    {/* Form mockup */}
                                    <div className="space-y-3 p-5">
                                        <div>
                                            <div className="mb-1.5 h-2 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                                            <div className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" />
                                        </div>
                                        <div>
                                            <div className="mb-1.5 h-2 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                                            <div className="h-8 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" />
                                        </div>
                                        <div>
                                            <div className="mb-1.5 h-2 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                                            <div className="h-16 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" />
                                        </div>
                                        <div className="flex justify-end pt-1">
                                            <div className="h-7 w-20 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500" />
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    Isi formulir pengajuan surat keterangan secara online melalui platform kami.
                                </p>

                                {/* Arrow (mobile) */}
                                <div className="mt-4 flex items-center justify-center text-emerald-400 lg:hidden dark:text-emerald-600">
                                    <svg className="size-6 rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                                {/* Arrow (desktop) */}
                                <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-emerald-400 lg:block dark:text-emerald-600">
                                    <svg className="size-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Step 2 — Verification */}
                            <div className="group relative">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-emerald-600 to-teal-500 text-xs font-extrabold text-white shadow-md">2</span>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Proses Verifikasi</h3>
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80">
                                    {/* Mini app header */}
                                    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-2.5 dark:border-gray-700/60 dark:bg-gray-900/50">
                                        <div className="flex gap-1.5">
                                            <span className="size-2 rounded-full bg-red-400/60" />
                                            <span className="size-2 rounded-full bg-amber-400/60" />
                                            <span className="size-2 rounded-full bg-emerald-400/60" />
                                        </div>
                                        <div className="ml-2 h-4 flex-1 rounded-md bg-gray-200/60 dark:bg-gray-700/50" />
                                    </div>
                                    {/* Verification mockup */}
                                    <div className="flex flex-col items-center gap-4 p-8">
                                        <div className="relative flex size-16 items-center justify-center">
                                            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-emerald-200 border-t-emerald-500 dark:border-emerald-800 dark:border-t-emerald-500" />
                                            <IconShield className="size-7 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Sedang Diverifikasi</p>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Petugas sedang memeriksa</p>
                                        </div>
                                        <div className="w-full space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500 dark:text-gray-400">Data Pemohon</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Valid</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500 dark:text-gray-400">Kelengkapan Berkas</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ Lengkap</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-500 dark:text-gray-400">Tanda Tangan Digital</span>
                                                <span className="font-bold text-amber-600 dark:text-amber-400">⏳ Proses</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    Permohonan diverifikasi oleh petugas berwenang secara real-time.
                                </p>

                                {/* Arrow (mobile) */}
                                <div className="mt-4 flex items-center justify-center text-emerald-400 lg:hidden dark:text-emerald-600">
                                    <svg className="size-6 rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                                {/* Arrow (desktop) */}
                                <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-emerald-400 lg:block dark:text-emerald-600">
                                    <svg className="size-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Step 3 — Document issued */}
                            <div className="group">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-emerald-600 to-teal-500 text-xs font-extrabold text-white shadow-md">3</span>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Surat Terbit</h3>
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80">
                                    {/* Mini app header */}
                                    <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-2.5 dark:border-gray-700/60 dark:bg-gray-900/50">
                                        <div className="flex gap-1.5">
                                            <span className="size-2 rounded-full bg-red-400/60" />
                                            <span className="size-2 rounded-full bg-amber-400/60" />
                                            <span className="size-2 rounded-full bg-emerald-400/60" />
                                        </div>
                                        <div className="ml-2 h-4 flex-1 rounded-md bg-gray-200/60 dark:bg-gray-700/50" />
                                    </div>
                                    {/* Completed document mockup */}
                                    <div className="relative p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Surat Keterangan Domisili</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400">No. SKD/2026/02/001</p>
                                            </div>
                                            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
                                                <IconCheckBadge className="size-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                        </div>
                                        <div className="my-3 border-t border-dashed border-gray-200 dark:border-gray-700" />
                                        <div className="space-y-2">
                                            <div className="h-2 w-full rounded bg-gray-100 dark:bg-gray-700/50" />
                                            <div className="h-2 w-5/6 rounded bg-gray-100 dark:bg-gray-700/50" />
                                            <div className="h-2 w-4/6 rounded bg-gray-100 dark:bg-gray-700/50" />
                                        </div>
                                        {/* Stamp */}
                                        <div className="absolute right-6 bottom-12 flex size-16 -rotate-12 items-center justify-center rounded-full border-3 border-emerald-500/60 dark:border-emerald-400/40">
                                            <p className="text-center text-[8px] font-extrabold leading-tight tracking-wider text-emerald-600/70 uppercase dark:text-emerald-400/60">SAH<br />✓</p>
                                        </div>
                                        <div className="mt-5 flex gap-2">
                                            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-linear-to-r from-emerald-500 to-teal-500 py-2 text-xs font-bold text-white">
                                                <IconDownload className="size-3.5" /> Unduh PDF
                                            </div>
                                            <div className="flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-700">
                                                <IconQrCode className="size-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    Surat keterangan elektronik siap diunduh dan digunakan kapan saja.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                <Section id="statistik" className="scroll-mt-20 py-20 lg:py-28">
                    <div className="mx-auto max-w-7xl px-5">
                        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-700 p-10 shadow-2xl shadow-emerald-900/20 lg:p-16 dark:from-emerald-800 dark:via-emerald-900 dark:to-teal-900">
                            {/* Subtle pattern overlay */}
                            <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                            <div className="relative">
                                <div className="mx-auto max-w-2xl text-center">
                                    <p className="text-sm font-bold tracking-widest text-emerald-200/80 uppercase">
                                        Statistik
                                    </p>
                                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        Dipercaya Oleh Banyak Pengguna
                                    </h2>
                                    <p className="mt-4 text-base leading-relaxed text-emerald-100/70">
                                        Angka-angka yang menunjukkan dedikasi kami dalam memberikan pelayanan terbaik.
                                    </p>
                                </div>

                                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                    <StatCard
                                        target={500}
                                        suffix="+"
                                        label="Surat Diterbitkan"
                                        icon={<IconDocument className="size-6 text-emerald-200" />}
                                    />
                                    <StatCard
                                        target={200}
                                        suffix="+"
                                        label="Pengguna Terdaftar"
                                        icon={
                                            <svg className="size-6 text-emerald-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                            </svg>
                                        }
                                    />
                                    <StatCard
                                        target={10}
                                        suffix="+"
                                        label="Jenis Surat Tersedia"
                                        icon={<IconClipboardCheck className="size-6 text-emerald-200" />}
                                    />
                                    <StatCard
                                        target={5}
                                        prefix="< "
                                        label="Menit Rata-rata Proses"
                                        icon={<IconBolt className="size-6 text-emerald-200" />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                <footer className="border-t border-gray-200/60 bg-gray-50 dark:border-gray-800/60 dark:bg-gray-950">
                    <div className="mx-auto max-w-7xl px-5 py-14 lg:py-16">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Brand */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-600 to-teal-500 shadow-md shadow-emerald-500/20">
                                        <IconDocument className="size-5 text-white" />
                                    </div>
                                    <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                        Sureka
                                    </span>
                                </div>
                                <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    Platform layanan surat keterangan elektronik yang mempermudah proses pengajuan dan penerbitan surat secara digital. Cepat, aman, dan terpercaya.
                                </p>
                            </div>

                            {/* Navigation */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Navigasi</h4>
                                <ul className="mt-4 space-y-3 text-sm">
                                    <li>
                                        <a href="#" className="font-medium text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                            Beranda
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#fitur" className="font-medium text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                            Fitur
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#cara-kerja" className="font-medium text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                            Cara Kerja
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#statistik" className="font-medium text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                            Statistik
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Kontak</h4>
                                <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <svg className="size-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>
                                        <span className="font-medium">admin@sureka.id</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="size-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>
                                        <span className="font-medium">(021) 1234-5678</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="mt-0.5 size-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <span className="font-medium">Jl. Contoh No. 123, Jakarta</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200/60 pt-8 sm:flex-row dark:border-gray-800/60">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-500">
                                &copy; {new Date().getFullYear()} Sureka. All rights reserved.
                            </p>
                            <div className="flex gap-6 text-sm font-medium text-gray-500 dark:text-gray-500">
                                <a href="#" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                                    Kebijakan Privasi
                                </a>
                                <a href="#" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                                    Syarat & Ketentuan
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { useState, type SVGAttributes } from 'react';

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

function IconStar(props: SVGAttributes<SVGElement>) {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-rose-500 dark:text-rose-400">
         <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
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

function GlowCard({
   children,
   glowColor,
}: {
   children: React.ReactNode;
   glowColor: string;
}) {
   const [pos, setPos] = useState({ x: 0, y: 0 });
   const [isHovering, setIsHovering] = useState(false);

   return (
      <div
         className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 transition-all 
         duration-300 hover:-translate-y-1 dark:border-gray-700/60 dark:bg-gray-800/80"
         onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
         }}
         onMouseEnter={() => setIsHovering(true)}
         onMouseLeave={() => setIsHovering(false)}
      >
         <div
            className="pointer-events-none absolute size-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300"
            style={{
               left: pos.x,
               top: pos.y,
               background: glowColor,
               opacity: isHovering ? 1 : 0,
            }}
         />
         <div className="relative">{children}</div>
      </div>
   );
}

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
   const { auth } = usePage().props;
   return (
      <>
         <Head title="Sureka — Surat Keterangan Elektronik">
            <meta
               name="description"
               content="Sureka — Platform layanan surat keterangan elektronik"
            />
         </Head>

         <div
            className="flex h-screen flex-col overflow-y-auto bg-linear-to-b from-white via-white to-gray-50 text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 dark:text-gray-100"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
         >
            <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg dark:border-gray-800/60 dark:bg-gray-950/80">
               <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
                  <a href="/" className="flex items-center gap-3 group">
                     <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-teal-500 shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-105">
                        <IconLogo className="size-6 text-white" />
                     </div>
                     <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                        Sureka<span className="text-emerald-500">.</span>
                     </span>
                  </a>

                  <div className="flex items-center gap-3">
                     {auth.user ? (
                        <Link
                           href={dashboard().url}
                           className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-2 text-sm font-bold text-white transition-all hover:brightness-110 dark:from-emerald-700 dark:to-teal-600"
                        >
                           Dashboard
                        </Link>
                     ) : (
                        <>
                           <Link
                              href={login().url}
                              className="rounded-lg px-5 py-2.5 text-sm font-bold text-gray-700 transition-colors bg-gray-100 
                              hover:text-emerald-700 dark:text-gray-300 dark:bg-gray-800 dark:hover:text-emerald-400"
                           >
                              Masuk
                           </Link>
                           {canRegister && (
                              <Link
                                 href={register().url}
                                 className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-sm font-bold text-white transition-all 
                                 hover:brightness-110 dark:from-emerald-700 dark:to-teal-600"
                              >
                                 Daftar
                              </Link>
                           )}
                        </>
                     )}
                  </div>
               </div>
            </nav>

            <main className="flex flex-1 items-center">
               <div className="relative w-full overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 -z-10">
                     <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-linear-to-br from-emerald-200/50 to-teal-200/40 blur-3xl dark:from-emerald-900/20 dark:to-teal-900/15" />
                     <div className="absolute top-1/2 -left-60 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-teal-100/40 to-cyan-100/30 blur-3xl dark:from-teal-950/20 dark:to-cyan-950/15" />
                  </div>

                  <div className="mx-auto max-w-7xl px-5 py-12">
                     <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div className="order-2 lg:order-1">
                           <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700 backdrop-blur-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                              <span className="relative flex h-2 w-2">
                                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                 <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                              </span>
                              Platform Surat Keterangan Digital
                           </div>

                           <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15] dark:text-white">
                              Urus Surat{' '}
                              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                                 Tanpa Ribet
                              </span>
                              ,<br />
                              Semua Serba Digital
                           </h1>

                           <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-500 lg:text-lg dark:text-gray-400">
                              Ajukan surat keterangan secara online, tanpa antre. Proses cepat dan dokumen siap diunduh kapan saja.
                           </p>

                           <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
                              {auth.user ? (
                                 <Link
                                    href={dashboard().url}
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                                 >
                                    Masuk ke Dashboard
                                    <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                 </Link>
                              ) : (
                                 <>
                                    <Link
                                       href={register().url}
                                       className="group inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 px-7 py-3.5 
                                       text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110">
                                       Daftar Sekarang
                                       <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>

                                    <div className="flex items-center gap-3">
                                       <div className="flex -space-x-2.5">
                                          <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[11px] font-bold text-white dark:border-gray-900">AS</div>
                                          <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[11px] font-bold text-white dark:border-gray-900">RK</div>
                                          <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-violet-500 text-[11px] font-bold text-white dark:border-gray-900">DN</div>
                                          <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-amber-500 text-[11px] font-bold text-white dark:border-gray-900">MF</div>
                                          <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[11px] font-bold text-gray-600 dark:border-gray-900 dark:bg-gray-700 dark:text-gray-300">+</div>
                                       </div>
                                       <div>
                                          <p className="text-sm font-bold text-gray-900 dark:text-white">200+</p>
                                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">pengguna terdaftar</p>
                                       </div>
                                    </div>
                                 </>
                              )}
                           </div>
                        </div>

                        <div className="relative order-1 flex items-center justify-end lg:order-2">
                           <div className="absolute h-72 w-72 rounded-full bg-linear-to-br from-emerald-200/60 to-teal-200/50 blur-3xl dark:from-emerald-800/20 dark:to-teal-800/15" />

                           <div className="relative w-full max-w-sm">
                              <div className="absolute top-6 right-4 left-4 rounded-2xl border border-gray-200/50 bg-white/60 p-5 shadow-lg backdrop-blur-sm dark:border-gray-700/40 dark:bg-gray-800/40">
                                 <div className="flex items-center gap-3">
                                    <div className="size-9 rounded-lg bg-gray-200/60 dark:bg-gray-700/40" />
                                    <div className="flex-1 space-y-2">
                                       <div className="h-3 w-3/4 rounded-full bg-gray-200/80 dark:bg-gray-700/50" />
                                       <div className="h-2.5 w-1/2 rounded-full bg-gray-200/60 dark:bg-gray-700/30" />
                                    </div>
                                 </div>
                              </div>

                              <div className="relative z-10 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-emerald-900/8 dark:border-gray-700/60 dark:bg-gray-800/90">
                                 <div className="flex items-center gap-3 border-b border-gray-200/80 bg-gray-50/80 px-4 py-3 dark:border-gray-700/60 dark:bg-gray-900/50">
                                    <div className="flex items-center gap-1.5">
                                       <div className="size-2.5 rounded-full bg-red-400" />
                                       <div className="size-2.5 rounded-full bg-amber-400" />
                                       <div className="size-2.5 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex flex-1 items-center justify-center rounded-md bg-gray-100 px-3 py-2.5
                                     dark:bg-gray-700/50">
                                       <span className="text-[11px] font-medium leading-none text-gray-300 dark:text-gray-500">sureka.id/surat/SKD-001</span>
                                    </div>
                                 </div>

                                 <div className="p-6">
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-3">
                                          <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-800/40 dark:to-teal-800/30">
                                             <IconCheckBadge className="size-6 text-emerald-600 dark:text-emerald-400" />
                                          </div>
                                          <div>
                                             <p className="text-sm font-bold text-gray-900 dark:text-white">Surat Keterangan Domisili</p>
                                             <p className="text-xs text-gray-500 dark:text-gray-400">No. SKD/2026/02/001</p>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="my-4 border-t border-dashed border-gray-200 dark:border-gray-700" />

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

                                    <div className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900/50">
                                       <div className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                          <IconQrCode className="size-6 text-gray-400 dark:text-gray-500" />
                                       </div>
                                       <div>
                                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">QR Verifikasi</p>
                                          <p className="text-[11px] text-gray-500 dark:text-gray-400">Scan untuk validasi keaslian</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <GlowCard glowColor="rgba(245, 158, 11, 0.15)">
                           <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
                              <IconBolt className="size-5 text-amber-500 dark:text-amber-400" />
                           </div>
                           <p className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white">500+</p>
                           <p className="mt-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Surat Diterbitkan</p>
                        </GlowCard>

                        <GlowCard glowColor="rgba(59, 130, 246, 0.15)">
                           <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                              <IconShield className="size-5 text-blue-500 dark:text-blue-400" />
                           </div>
                           <p className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white">200+</p>
                           <p className="mt-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Pengguna Aktif</p>
                        </GlowCard>

                        <GlowCard glowColor="rgba(139, 92, 246, 0.15)">
                           <div className="flex size-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-500/10">
                              <IconQrCode className="size-5 text-violet-500 dark:text-violet-400" />
                           </div>
                           <p className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white">100%</p>
                           <p className="mt-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">QR Terverifikasi</p>
                        </GlowCard>

                        <GlowCard glowColor="rgba(244, 63, 94, 0.15)">
                           <div className="flex size-10 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-500/10">
                              <IconStar className="size-5 text-rose-500 dark:text-rose-400" />
                           </div>
                           <p className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-white">4.9/5</p>
                           <p className="mt-0.5 text-xs font-semibold text-gray-500 dark:text-gray-400">Rating Kepuasan</p>
                        </GlowCard>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </>
   );
}
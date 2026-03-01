import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
   return (
      <>
         <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-teal-500 shadow-lg shadow-emerald-500/25 transition-transform group-hover:scale-105">
            <AppLogoIcon className="size-6 text-white" />
         </div>
         <div className="ml-1 grid flex-1 text-left text-sm">
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
               Sureka<span className="text-emerald-500">.</span>
            </span>
         </div>
      </>
   );
}

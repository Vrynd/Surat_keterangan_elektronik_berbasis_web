import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Activity, BarChart3, CheckCircle, ClipboardList, FileText, LayoutGrid, Menu, Star } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard, myLetters, reviews } from '@/routes';
import { ScrollerBar } from '@/components/scroller-bar';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
   breadcrumbs?: BreadcrumbItem[];
};

export function AppHeader({ breadcrumbs = [] }: Props) {
   const page = usePage();
   const { auth } = page.props;
   const user = auth.user;
   const userRole = user.role;

   const navItems: NavItem[] = userRole === 'admin' ? [
      {
         title: 'Dashboard',
         href: '/admin/dashboard',
         icon: LayoutGrid,
      },
      {
         title: 'Pengajuan Surat',
         href: '#',
         icon: FileText,
      },
      {
         title: 'Verifikasi Berkas',
         href: '#',
         icon: CheckCircle,
      },
      {
         title: 'Ulasan',
         href: '#',
         icon: Star,
      },
   ] : [
      {
         title: 'Dashboard',
         href: dashboard(),
         icon: LayoutGrid,
      },
      {
         title: 'Surat Saya',
         href: myLetters().url,
         icon: FileText,
      },
      {
         title: 'Ulasan',
         href: reviews().url,
         icon: Star,
      },
   ];
   const getInitials = useInitials();
   const { isCurrentUrl } = useCurrentUrl();
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <>
         <ScrollerBar />
         <div className={cn(
            "border-b border-sidebar-border/80 bg-white/80 backdrop-blur-lg dark:bg-gray-950/80 sticky top-0 z-40 transition-shadow duration-300",
            scrolled ? "shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]" : "shadow-none"
         )}>
            <div className="mx-auto flex h-20 items-center justify-between px-5 md:max-w-7xl">
               {/* Left: Logo */}
               <div className="flex items-center gap-3">
                  {/* Mobile Menu */}
                  <div className="lg:hidden">
                     <Sheet>
                        <SheetTrigger asChild>
                           <Button
                              variant="ghost"
                              size="icon"
                              className="mr-2 h-[34px] w-[34px]"
                           >
                              <Menu className="h-5 w-5" />
                           </Button>
                        </SheetTrigger>
                        <SheetContent
                           side="left"
                           className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                        >
                           <SheetTitle className="sr-only">
                              Navigation menu
                           </SheetTitle>
                           <SheetHeader className="flex justify-start text-left">
                              <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                           </SheetHeader>
                           <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                              <div className="flex h-full flex-col justify-between text-sm">
                                 <div className="flex flex-col space-y-4">
                                    {navItems.map((item) => (
                                       <Link
                                          key={item.title}
                                          href={item.href}
                                          className={cn(
                                             'flex items-center space-x-2 rounded-lg p-2 font-medium transition-colors',
                                             isCurrentUrl(item.href)
                                                ? 'bg-white shadow-sm dark:bg-neutral-800'
                                                : 'text-neutral-200 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
                                          )}
                                       >
                                          {item.icon && (
                                             <item.icon className="h-5 w-5" />
                                          )}
                                          <span>{item.title}</span>
                                       </Link>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </SheetContent>
                     </Sheet>
                  </div>

                  <Link
                     href={dashboard()}
                     prefetch
                     className="flex items-center space-x-2"
                  >
                     <AppLogo />
                  </Link>
               </div>

               <div className="hidden h-full items-center lg:flex">
                  <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white divide-x divide-gray-200 dark:border-gray-800 dark:bg-neutral-900 dark:divide-gray-800">
                     {navItems.map((item, index) => {
                        const active = isCurrentUrl(item.href);
                        return (
                           <Link
                              key={index}
                              href={item.href}
                              className={cn(
                                 'px-4 py-2.5 text-sm font-medium transition-colors duration-200 sm:px-6 flex items-center gap-2',
                                 active
                                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300',
                              )}
                           >
                              {item.icon && (
                                 <item.icon size={16} className={cn(active ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500')} />
                              )}
                              {item.title}
                           </Link>
                        );
                     })}
                  </div>
               </div>

               {/* Right: User Menu */}
               <div className="flex items-center gap-3 ">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="size-10 cursor-pointer rounded-full p-1"
                        >
                           <Avatar className="size-10 cursor-pointer overflow-hidden rounded-full">
                              <AvatarImage
                                 src={auth.user.avatar}
                                 alt={auth.user.name}
                              />
                              <AvatarFallback className="rounded-lg font-semibold bg-slate-800 uppercase text-white dark:bg-gray-200 dark:text-gray-800">
                                 {getInitials(auth.user.name)}
                              </AvatarFallback>
                           </Avatar>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-56" align="end">
                        <UserMenuContent user={auth.user} />
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
         </div>
         {breadcrumbs.length > 1 && (
            <div className="flex w-full border-b border-sidebar-border/70">
               <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                  <Breadcrumbs breadcrumbs={breadcrumbs} />
               </div>
            </div>
         )}
      </>
   );
}

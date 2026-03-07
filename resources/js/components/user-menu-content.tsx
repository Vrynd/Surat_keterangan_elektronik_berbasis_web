import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Settings, Users } from 'lucide-react';
import {
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
   user: User;
};

export function UserMenuContent({ user }: Props) {
   const cleanup = useMobileNavigation();
   const { auth } = usePage().props;
   const isAdmin = auth.user.role === 'admin';

   const handleLogout = () => {
      cleanup();
      router.flushAll();
   };

   return (
      <>
         <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 p-2.5 text-left text-sm">
               <UserInfo user={user} showEmail={true} />
            </div>
         </DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuGroup>
            <DropdownMenuItem asChild>
               <Link
                  className="flex w-full cursor-pointer items-center gap-2"
                  href={edit()}
                  prefetch
                  onClick={cleanup}
               >
                  <Settings size={16} />
                  Pengaturan
               </Link>
            </DropdownMenuItem>
            {isAdmin && (
               <DropdownMenuItem asChild>
                  <Link
                     className="flex w-full cursor-pointer items-center gap-2"
                     href="#"
                     onClick={cleanup}
                  >
                     <Users size={16} />
                     Kelola User
                  </Link>
               </DropdownMenuItem>
            )}
         </DropdownMenuGroup>
         <DropdownMenuSeparator />
         <DropdownMenuItem asChild>
            <Link
               className="flex w-full cursor-pointer items-center gap-2"
               href={logout()}
               as="button"
               onClick={handleLogout}
               data-test="logout-button"
            >
               <LogOut size={16} />
               Keluar
            </Link>
         </DropdownMenuItem>
      </>
   );
}

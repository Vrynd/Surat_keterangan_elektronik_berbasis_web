import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

function IconGoogle(props: React.SVGAttributes<SVGElement>) {
   return (
      <svg viewBox="0 0 24 24" {...props}>
         <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
         />
         <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
         />
         <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
         />
         <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
         />
      </svg>
   );
}

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

type Props = {
   status?: string;
   canResetPassword: boolean;
   canRegister: boolean;
};

export default function Login({
   status,
   canResetPassword,
   canRegister,
}: Props) {
   const [rememberMe, setRememberMe] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   return (
      <AuthLayout
         title="Masuk ke akun"
         description="Masukkan email dan kata sandi untuk masuk ke akun"
      >
         <Head title="Masuk Akun" />
         <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full cursor-pointer gap-3"
            tabIndex={6}
         >
            <IconGoogle className="size-5" />
            Masuk dengan Google
         </Button>

         {/* Divider */}
         <div className="relative flex items-center">
            <div className="grow border-t border-gray-200 dark:border-gray-700" />
            <span className="mx-4 shrink-0 text-xs text-muted-foreground">
               atau masuk dengan email
            </span>
            <div className="grow border-t border-gray-200 dark:border-gray-700" />
         </div>

         <Form
            {...store.form()}
            resetOnSuccess={['password']}
            className="flex flex-col gap-5"
         >
            {({ processing, errors }) => (
               <>
                  <div className="grid gap-5">
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           id="email"
                           type="email"
                           name="email"
                           required
                           autoFocus
                           tabIndex={1}
                           autoComplete="email"
                           placeholder="email@example.com"
                           className="h-11"
                        />
                        <InputError message={errors.email} />
                     </div>

                     <div className="grid gap-2">
                        <div className="flex items-center">
                           <Label htmlFor="password">Kata sandi</Label>
                           {canResetPassword && (
                              <TextLink
                                 href={request()}
                                 className="ml-auto text-xs cursor-pointer"
                                 tabIndex={5}
                              >
                                 Lupa kata sandi?
                              </TextLink>
                           )}
                        </div>
                        <div className="relative">
                           <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              required
                              tabIndex={2}
                              autoComplete="current-password"
                              placeholder="Kata sandi"
                              className="pr-10 h-11"
                           />
                           <button
                              type="button"
                              tabIndex={-1}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                           >
                              {showPassword ? (
                                 <IconEyeOff className="size-4 shrink-0" />
                              ) : (
                                 <IconEye className="size-4 shrink-0" />
                              )}
                           </button>
                        </div>
                        <InputError message={errors.password} />
                     </div>

                     <div className="flex items-center justify-between">
                        <Label htmlFor="remember-toggle" className="cursor-pointer text-sm text-muted-foreground">Ingat saya</Label>
                        <input type="hidden" name="remember" value={rememberMe ? '1' : ''} />
                        <button
                           type="button"
                           role="switch"
                           id="remember-toggle"
                           aria-checked={rememberMe}
                           tabIndex={3}
                           className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${rememberMe ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                           onClick={() => setRememberMe(!rememberMe)}
                        >
                           <span
                              className={`pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${rememberMe ? 'translate-x-[18px]' : 'translate-x-0.5'
                                 }`}
                           />
                        </button>
                     </div>

                     <Button
                        type="submit"
                        size="lg"
                        className="w-full text-base font-semibold cursor-pointer bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25
                         transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                        tabIndex={4}
                        disabled={processing}
                        data-test="login-button"
                     >
                        {processing && <Spinner />}
                        Masuk
                     </Button>
                  </div>

                  {canRegister && (
                     <div className="text-center cursor-pointer text-sm text-muted-foreground">
                        Belum punya akun?{' '}
                        <TextLink href={register().url} tabIndex={7}>
                           Daftar
                        </TextLink>
                     </div>
                  )}
               </>
            )}
         </Form>

         {status && (
            <div className="text-center text-sm font-medium text-green-600">
               {status}
            </div>
         )}
      </AuthLayout>
   );
}
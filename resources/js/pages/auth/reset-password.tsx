import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { update } from '@/routes/password';

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
   token: string;
   email: string;
};

export default function ResetPassword({ token, email }: Props) {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   return (
      <AuthLayout
         title="Reset kata sandi"
         description="Masukkan kata sandi baru Anda di bawah ini"
      >
         <Head title="Reset Kata Sandi" />

         <Form
            {...update.form()}
            transform={(data) => ({ ...data, token, email })}
            resetOnSuccess={['password', 'password_confirmation']}
         >
            {({ processing, errors }) => (
               <div className="grid gap-6">
                  <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        className="mt-1 block w-full"
                        readOnly
                     />
                     <InputError
                        message={errors.email}
                        className="mt-2"
                     />
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="password">Kata sandi baru</Label>
                     <div className="relative">
                        <Input
                           id="password"
                           type={showPassword ? 'text' : 'password'}
                           name="password"
                           autoComplete="new-password"
                           className="mt-1 block w-full pr-10"
                           autoFocus
                           placeholder="Kata sandi baru"
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

                  <div className="grid gap-2">
                     <Label htmlFor="password_confirmation">
                        Konfirmasi kata sandi
                     </Label>
                     <div className="relative">
                        <Input
                           id="password_confirmation"
                           type={showConfirmPassword ? 'text' : 'password'}
                           name="password_confirmation"
                           autoComplete="new-password"
                           className="mt-1 block w-full pr-10 h-11"
                           autoFocus
                           placeholder="Konfirmasi kata sandi"
                        />
                        <button
                           type="button"
                           tabIndex={-1}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                           {showConfirmPassword ? (
                              <IconEyeOff className="size-4 shrink-0" />
                           ) : (
                              <IconEye className="size-4 shrink-0" />
                           )}
                        </button>
                     </div>
                     <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                     />
                  </div>

                  <Button
                     type="submit"
                     size="lg"
                     className="mt-4 w-full text-base font-semibold cursor-pointer bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25
                             transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                     disabled={processing}
                     data-test="reset-password-button"
                  >
                     {processing && <Spinner />}
                     Reset kata sandi
                  </Button>
               </div>
            )}
         </Form>
      </AuthLayout>
   );
}

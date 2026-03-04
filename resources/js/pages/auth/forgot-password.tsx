// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
   return (
      <AuthLayout
         title="Lupa kata sandi"
         description="Masukkan email Anda untuk menerima tautan reset"
      >
         <Head title="Lupa Kata Sandi" />

         {status && (
            <div className="mb-4 text-center text-sm font-medium text-green-600">
               {status}
            </div>
         )}

         <div className="space-y-6">
            <Form {...email.form()}>
               {({ processing, errors }) => (
                  <>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           id="email"
                           type="email"
                           name="email"
                           autoComplete="off"
                           autoFocus
                           placeholder="email@example.com"
                           className="h-11"
                           required
                        />

                        <InputError message={errors.email} />
                     </div>

                     <div className="my-6 flex items-center justify-start">
                        <Button
                           size="lg"
                           className="w-full text-base font-semibold cursor-pointer bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/25
                                     transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:brightness-110"
                           disabled={processing}
                           data-test="email-password-reset-link-button"
                        >
                           {processing && (
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                           )}
                           Kirim tautan reset
                        </Button>
                     </div>
                  </>
               )}
            </Form>

            <div className="space-x-1 text-center text-sm text-muted-foreground">
               <span>Atau, kembali ke</span>
               <TextLink href={login()}>halaman masuk</TextLink>
            </div>
         </div>
      </AuthLayout>
   );
}

import { LoginForm } from '~/components/auth/LoginForm';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between font-sans bg-green-50 md:bg-[url('/bg.png')] bg-[url('/bg_mobile.png')] bg-cover bg-center bg-no-repeat">
      <Header />
      <main className="grow w-full flex justify-center items-center py-8">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
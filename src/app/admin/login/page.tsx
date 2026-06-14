import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Admin Login",
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full">
        <LoginForm />
        <div className="mt-6 text-center text-sm text-[var(--ink-subtle)]">
          <Link href="/" className="hover:text-[var(--ink)]">
            Return to Duxio site
          </Link>
        </div>
      </div>
    </main>
  );
}

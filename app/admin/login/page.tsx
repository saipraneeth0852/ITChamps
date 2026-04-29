import { redirect } from "next/navigation";
import { LoginForm } from "../../../components/admin/LoginForm";
import { isAdminAuthenticated } from "../../../lib/cms/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="admin-auth-page">
      <LoginForm />
    </main>
  );
}

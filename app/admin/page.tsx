import { redirect } from "next/navigation";
import { AdminDashboard } from "../../components/admin/AdminDashboard";
import { hasDefaultAdminCredentials, isAdminAuthenticated } from "../../lib/cms/auth";
import { getBlogs, getCaseStudies } from "../../lib/cms/store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!await isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const [caseStudies, blogs] = await Promise.all([
    getCaseStudies("admin"),
    getBlogs("admin"),
  ]);

  return (
    <AdminDashboard
      initialCaseStudies={caseStudies}
      initialBlogs={blogs}
      showSecurityNotice={hasDefaultAdminCredentials()}
    />
  );
}

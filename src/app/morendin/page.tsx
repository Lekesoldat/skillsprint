import { getSession, signIn, signOut } from "next-auth/react";
import AuthShowcase from "../../components/auth-showcase";

export default async function Page() {
  const session = await getSession();
  return (
    <div>
      <AuthShowcase />
    </div>
  );
}

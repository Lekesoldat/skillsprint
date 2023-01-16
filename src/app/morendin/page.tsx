import { getSession } from "next-auth/react";
import AuthShowcase from "../../components/auth-showcase";
import { Button } from "../../components/button";

export default async function Page() {
  const session = await getSession();
  console.log(session);
  return (
    <div>
      <AuthShowcase />
      <Button />
    </div>
  );
}

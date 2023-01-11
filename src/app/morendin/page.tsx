import { getSession } from "next-auth/react";
import AuthShowcase from "../../components/auth-showcase";
import { appRouter } from "../../server/trpc/api/root";
import { createInnerTRPCContext } from "../../server/trpc/api/trpc";

export default async function Page() {
  const session = await getSession();
  console.log(session);
  return (
    <div>
      <AuthShowcase />
    </div>
  );
}

import AuthContext from "../providers/auth-context";
import "../styles/globals.css";
import { ClientProvider } from "../providers/trpc-context";
export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <AuthContext>
        <html>
          <body>{children}</body>
        </html>
      </AuthContext>
    </ClientProvider>
  );
}

import AuthContext from "../providers/auth-context";
import "../styles/globals.css";
import { ClientProvider } from "../providers/trpc-context";
export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  console.log(props);
  return (
    <ClientProvider>
      <AuthContext>
        <html>
          <head></head>
          <body>{children}</body>
        </html>
      </AuthContext>
    </ClientProvider>
  );
}

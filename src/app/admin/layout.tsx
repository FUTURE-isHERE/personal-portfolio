import { AdminContextProvider } from "../../context/admin-context-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminContextProvider>
      <div>{children}</div>
    </AdminContextProvider>
  );
}

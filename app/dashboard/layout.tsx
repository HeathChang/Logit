import { HeaderContainer } from "@/features/global/ui/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderContainer />
      <main className="flex-1">{children}</main>
    </div>
  );
}

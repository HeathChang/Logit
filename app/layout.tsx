import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import { ThemeProvider } from "@/shared/config/theme/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Logit - Daily Log & Git Activity",
  description: "기록이 쌓이면 성장이 보입니다. 나의 학습과 작업을 기록하고, GitHub 활동을 한곳에서 관리하며 성장을 추적하는 개인 개발 로그 서비스.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} min-h-screen bg-bg-main font-sans text-text-main transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

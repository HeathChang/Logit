"use client";

import { LoginForm } from "@/features/login";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-bg-main">
      <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 py-10">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-text-main">
            {t("common.appName")}
          </h1>
          <p className="mt-1 text-xs text-text-sub">
            {t("login.welcomeMessage")}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

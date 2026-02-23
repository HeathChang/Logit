"use client";

import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
    const { t } = useTranslation();
    return (
        <section className="w-full max-w-sm rounded-2xl border border-border-main bg-bg-card px-6 py-8 shadow-sm">
            <header className="mb-6">
                <h1 className="text-lg font-semibold text-text-main">{t("login.title")}</h1>
                <p className="mt-1 text-xs text-text-sub">
                    {t("login.description")}
                </p>
            </header>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="login-email"
                        className="text-xs font-medium text-text-main"
                    >
                        {t("login.email")}
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="login-password"
                        className="text-xs font-medium text-text-main"
                    >
                        {t("login.password")}
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        placeholder={t("login.passwordPlaceholder")}
                        className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log"
                    />
                </div>

                <Button
                    type="submit"
                    className="mt-2 h-9 rounded-lg bg-logit-log text-xs font-semibold text-white shadow-sm transition-colors hover:opacity-90"
                >
                    {t("login.loginButton")}
                </Button>

                <Button
                    className="mt-1 h-9 rounded-lg border border-border-main bg-bg-main text-xs font-medium text-text-main transition-colors hover:border-logit-git hover:text-logit-git"
                >
                    {t("login.continueWithGitHub")}
                </Button>
            </form>
        </section>
    );
};


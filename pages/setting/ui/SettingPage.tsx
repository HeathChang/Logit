"use client";

import { useState } from "react";
import { SettingForm } from "@/features/setting/ui/SettingForm";
import { UserInfo } from "@/features/setting/ui/UserInfo";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";

const SettingPage = () => {
    const { t } = useTranslation();
    // TODO: 실제 로그인 상태와 유저 정보는 나중에 인증 로직과 연동
    const [isLoggedIn] = useState(false); // 임시로 false, 실제로는 인증 상태에서 가져옴
    const [userInfo] = useState<{
        email?: string;
        name?: string;
        avatarUrl?: string;
    } | null>(null); // 임시로 null, 실제로는 인증 상태에서 가져옴

    const [githubUsername, setGithubUsername] = useState("");
    const [language, setLanguage] = useState("ko");

    const handleSave = () => {
        // TODO: 저장 로직은 나중에 추가
        console.log("Settings saved:", { githubUsername, language });
    };

    return (
        <div className="min-h-screen bg-bg-main">
            <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 py-10">
                <div className="mb-6 text-center">
                    <h1 className="text-xl font-semibold text-text-main">
                        {t("settings.title")}
                    </h1>
                    <p className="mt-1 text-xs text-text-sub">
                        {t("settings.description")}
                    </p>
                </div>

                <div className="w-full max-w-2xl space-y-6">
                    {/* 유저 정보 섹션 - 로그인한 경우만 표시 */}
                    {isLoggedIn && userInfo && (
                        <section className="rounded-2xl border border-border-main bg-bg-card px-6 py-6 shadow-sm">
                            <header className="mb-4">
                                <h2 className="text-lg font-semibold text-text-main">
                                    {t("settings.accountInfo")}
                                </h2>
                                <p className="mt-1 text-xs text-text-sub">
                                    {t("settings.accountInfoDescription")}
                                </p>
                            </header>
                            <UserInfo
                                email={userInfo.email}
                                name={userInfo.name}
                                avatarUrl={userInfo.avatarUrl}
                            />
                        </section>
                    )}

                    {/* 일반 설정 섹션 */}
                    <section className="rounded-2xl border border-border-main bg-bg-card px-6 py-8 shadow-sm">
                        <header className="mb-6">
                            <h2 className="text-lg font-semibold text-text-main">
                                {t("settings.generalSettings")}
                            </h2>
                            <p className="mt-1 text-xs text-text-sub">
                                {t("settings.generalSettingsDescription")}
                            </p>
                        </header>

                        <SettingForm
                            githubUsername={githubUsername}
                            language={language}
                            onGithubUsernameChange={setGithubUsername}
                            onLanguageChange={setLanguage}
                        />
                    </section>

                    {/* 저장 버튼 */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSave}
                            className="h-9 rounded-lg bg-logit-log px-6 text-xs font-semibold text-white shadow-sm transition-colors hover:opacity-90"
                        >
                            {t("settings.saveButton")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
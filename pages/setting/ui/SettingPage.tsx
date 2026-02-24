"use client";

import { useEffect, useState } from "react";
import { SettingForm } from "@/features/setting/ui/SettingForm";
import { UserInfo } from "@/features/setting/ui/UserInfo";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import { IconUser } from "@tabler/icons-react";
import _ from 'lodash';

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
    const [isGithubUsernameValid, setIsGithubUsernameValid] = useState(false);

    useEffect(() => {
        // 입력 완료 후, 1초 후 GIT API 호출을 통해 유저 정보 조회
        const debounced = _.debounce(() => {
            console.log("Github username:", githubUsername);
        }, 3000);
        debounced();
        return () => debounced.cancel();
    }, [githubUsername]);

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

                    <section className="rounded-2xl border border-border-main bg-bg-card px-6 py-8 shadow-sm">
                        <header className="mb-6">
                            <h2 className="text-lg font-semibold text-text-main">
                                깃 계정 정보
                            </h2>
                            <p className="mt-1 text-xs text-text-sub">
                                입력한 깃의 계정을 통해 커밋 활동을 조회합니다.
                            </p>
                        </header>
                        {
                            githubUsername && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        {/* 깃허브 유저 프로필 이미지 */}
                                        <img src={`https://github.com/${githubUsername}.png`} alt={githubUsername} className="w-30 h-30 rounded-full" />

                                        <div className="flex flex-col gap-1 ml-4">
                                            {/* 깃 허브 유저 프로필 이름  */}
                                            <div className="text-lg font-semibold text-text-main">
                                                {githubUsername}
                                            </div>

                                            {/* 깃 허브 프로필 링크 */}
                                            <div className="text-xs text-text-sub">
                                                <a
                                                    href={`https://github.com/${githubUsername}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline underline-offset-2"
                                                >
                                                    github.com/{githubUsername}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </section>

                    {/* 저장 버튼 */}
                    <div className="flex justify-end">
                        <Button
                            disabled={isGithubUsernameValid}
                            onClick={handleSave}
                            className="h-9 rounded-lg bg-logit-log px-6 text-xs font-semibold text-white shadow-sm transition-colors hover:opacity-90 cursor-pointer"
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
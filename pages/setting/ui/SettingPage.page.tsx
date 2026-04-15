"use client";

import { useState } from "react";
import { SettingForm, UserInfo, useGithubUser } from "@/features/setting";
import { Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { IconUser } from "@tabler/icons-react";
import { useLanguage } from "@/shared/hooks";
import Swal from "sweetalert2";

const SettingPage = () => {
  const { t } = useTranslation();
  // TODO: 실제 로그인 상태와 유저 정보는 나중에 인증 로직과 연동
  const [isLoggedIn] = useState(false); // 임시로 false, 실제로는 인증 상태에서 가져옴
  const [userInfo] = useState<{
    email?: string;
    name?: string;
    avatarUrl?: string;
  } | null>(null); // 임시로 null, 실제로는 인증 상태에서 가져옴

  const {
    githubUsername,
    setGithubUsername,
    gitUserInfo,
    isGithubUsernameValid,
  } = useGithubUser();

  const { language } = useLanguage();

  const handleSave = () => {
    // TODO:: localStorage에 설정값 저장 (추후 API로 전환 예정)
    try {
      localStorage.setItem("settings.githubUsername", githubUsername || "");
      localStorage.setItem("settings.language", language);
      Swal.fire({
        title: "저장 완료!",
        text: "설정이 저장되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.error("Failed to save settings to localStorage:", error);
      Swal.fire({
        title: "저장 실패!",
        text: "설정이 저장되지 않았습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
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
              onGithubUsernameChange={setGithubUsername}
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

            {gitUserInfo ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  {/* 깃허브 유저 프로필 이미지 */}
                  {gitUserInfo.avatar_url ? (
                    <img
                      src={gitUserInfo.avatar_url}
                      alt={githubUsername}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-main text-text-sub">
                      <IconUser size={32} />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 items-center">
                      <div className="text-base font-semibold text-text-main">
                        {gitUserInfo.name}
                      </div>

                      {/* 깃허브 유저 아이디 */}
                      <div className="text-sm font-medium text-text-main">
                        @{gitUserInfo.login ?? githubUsername}
                      </div>
                    </div>

                    {/* 깃허브 프로필 링크 */}
                    <div className="text-xs text-text-sub">
                      <a
                        href={
                          gitUserInfo.html_url ??
                          `https://github.com/${githubUsername}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {gitUserInfo.html_url ??
                          `https://github.com/${githubUsername}`}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 레포지토리 / 팔로워 / 팔로잉 정보 */}
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-text-sub">
                  <span>
                    <span className="font-semibold text-text-main">
                      {gitUserInfo.public_repos}
                    </span>{" "}
                    공개 레포지토리
                  </span>
                  <span>
                    <span className="font-semibold text-text-main">
                      {gitUserInfo.followers}
                    </span>{" "}
                    팔로워
                  </span>
                  <span>
                    <span className="font-semibold text-text-main">
                      {gitUserInfo.following}
                    </span>{" "}
                    팔로잉
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-text-sub">
                조회된 깃 계정 정보가 없습니다. 올바른 깃허브 아이디를
                입력해주세요.
              </p>
            )}
          </section>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <Button
              disabled={!isGithubUsernameValid}
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

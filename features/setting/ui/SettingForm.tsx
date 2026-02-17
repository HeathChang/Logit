"use client";

interface SettingFormProps {
    githubUsername: string;
    language: string;
    onGithubUsernameChange: (value: string) => void;
    onLanguageChange: (value: string) => void;
}

export const SettingForm = ({
    githubUsername,
    language,
    onGithubUsernameChange,
    onLanguageChange,
}: SettingFormProps) => {
    return (
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="setting-github-username"
                    className="text-xs font-medium text-text-main"
                >
                    GitHub Username
                </label>
                <input
                    id="setting-github-username"
                    type="text"
                    value={githubUsername}
                    onChange={(e) => onGithubUsernameChange(e.target.value)}
                    placeholder="your-github-username"
                    className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="setting-language"
                    className="text-xs font-medium text-text-main"
                >
                    언어
                </label>
                <select
                    id="setting-language"
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="h-9 rounded-lg border border-border-main bg-bg-main px-3 text-sm text-text-main outline-none transition-colors focus:border-logit-log"
                >
                    <option value="ko">한국어</option>
                    <option value="en">English</option>
                </select>
            </div>
        </form>
    );
};

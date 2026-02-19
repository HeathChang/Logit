"use client";

interface UserInfoProps {
    email?: string;
    name?: string;
    avatarUrl?: string;
}

export const UserInfo = ({ email, name, avatarUrl }: UserInfoProps) => {
    if (!email) {
        return null;
    }

    return (
        <div className="flex items-center gap-3 rounded-lg border border-border-main bg-bg-main px-4 py-3">
            {avatarUrl && (
                <img
                    src={avatarUrl}
                    alt={name || "User"}
                    className="h-10 w-10 rounded-full"
                />
            )}
            <div className="flex flex-col gap-0.5">
                {name && (
                    <span className="text-sm font-medium text-text-main">
                        {name}
                    </span>
                )}
                <span className="text-xs text-text-sub">{email}</span>
            </div>
        </div>
    );
};

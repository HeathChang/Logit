'use client';

import { useState } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';

const Header = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.body.getAttribute('data-mode') === 'dark';
        }
        return false;
    });

    const toggleDarkMode = () => {
        const newMode = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-mode', newMode);
        setIsDark(!isDark);
    };

    return (
        <header className="w-full border-b border-[var(--color-border-main)] bg-[var(--color-bg-card)]/80 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
                <div className="text-lg font-semibold text-text-main">Logit</div>
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-main bg-bg-card hover:bg-bg-main transition-all duration-200 hover:shadow-sm active:scale-95"
                    aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
                >
                    {isDark ? (
                        <IconSun size={20} className="text-text-main" strokeWidth={2} />
                    ) : (
                        <IconMoon size={20} className="text-text-main" strokeWidth={2} />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
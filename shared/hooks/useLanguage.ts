import { useTranslation } from "react-i18next";

export type Language = "ko" | "en";

export const useLanguage = () => {
    const { i18n } = useTranslation();

    const language = (i18n.language?.startsWith("ko") ? "ko" : "en") as Language;

    const setLanguage = (lng: Language) => {
        i18n.changeLanguage(lng);
    };

    return { language, setLanguage };
};

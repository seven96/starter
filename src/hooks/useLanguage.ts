import { i18n } from "@/locales";

export default function useCurrentLanguage() {
    return i18n.language;
}

export function useChangeLanguage(language: string) {
    return i18n.changeLanguage.bind(i18n)(language);
}

export function useI18n() {
    return i18n;
}
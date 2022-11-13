import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import getAllLanguage from './languages';

export * from "./languages";

const resources = getAllLanguage();

function initI18n(initialLanguage: string = 'en', fallbackLanguage: string = 'en') {
    return i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            lng: initialLanguage,
            fallbackLng: fallbackLanguage,
            resources: resources,
            interpolation: {
                escapeValue: false,
            },
            detection: {
                caches: ['localStorage', 'sessionStorage', 'cookie'],
            },
        });
}

export default initI18n();
export { i18n };

export function changeLanguage(language: string) {
    return i18n.changeLanguage.bind(i18n)(language);
}
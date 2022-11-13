import EN_US from "./EN_US";
import ZH_CN from "./ZH_CN";

const languages = [EN_US, ZH_CN];
export type ResourceKey =
    | string
    | {
        [key: string]: any;
    };

export interface ResourceLanguage {
    [namespace: string]: ResourceKey;
}

export function defineLanguage(language: string, resources: ResourceLanguage, context?: Record<string | number | symbol, any>) {
    return {
        language,
        resources: {
            translation: resources,
        },
        context
    };
}

export default function getAllLanguage() {
    return languages.reduce((acc, language) => {
        acc[language.language] = language.resources;
        return acc;
    }, {} as Record<string, ResourceLanguage>);
}

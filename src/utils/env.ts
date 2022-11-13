export const envs = process.env;

export const getEnv = (key: string) => {
    return envs[key];
}

export const getEnvWithDefault = (key: string, defaultValue: string = '') => {
    return getEnv(key) || defaultValue;
}

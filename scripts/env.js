function getEnv() {
    return process.env.NODE_ENV;
}

const envConfig = {
    development: ["dev", "development", "local", "wip"],
    production: ["prod", "production", "staging", "preview", "release"],
    test: ["test", "testing"],
    analyze: ["analyze", "analyzing"],
};

function getEnvConfig(env) {
    return Object.keys(envConfig).find((key) => envConfig[key].includes(env));
}

function isEnvConfig(envConfig) {
    return getEnvConfig(getEnv()) === envConfig;
}

function getEnvFlags(env) {
    return envConfig[env];
}

const envs = {
    isDev: getEnvConfig("development").includes(getEnv()),
    isProd: getEnvConfig("production").includes(getEnv()),
    isTest: getEnvConfig("test").includes(getEnv()),
    isAnalyze: getEnvConfig("analyze").includes(getEnv()),
}

module.exports = {
    getEnv,
    getEnvConfig,
    isEnvConfig,
    getEnvFlags,
    envs
}
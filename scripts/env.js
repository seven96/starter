const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const configs = {
    development: ["dev", "development", "local", "wip"],
    production: ["prod", "production", "staging", "preview", "release"],
    test: ["test", "testing"],
    analyze: ["analyze", "analyzing"],
};

function getNodeEnv() {
    return process.env.NODE_ENV;
}
function shouldLoadEnvFile(path) {
    return fs.existsSync(path);
}
function loadEnvFile(path) {
    if (shouldLoadEnvFile(path)) {
        return dotenv.parse(fs.readFileSync(path));
    }
    return {};
}

function getEnvConfig(env) {
    return Object.keys(configs).find((key) => configs[key].includes(env));
}
function isEnvConfig(config) {
    return getEnvConfig(getNodeEnv()) === config;
}
function getEnvFlags(env) {
    return configs[env];
}

const envs = {
    isDev: getEnvConfig("development").includes(getNodeEnv()),
    isProd: getEnvConfig("production").includes(getNodeEnv()),
    isTest: getEnvConfig("test").includes(getNodeEnv()),
    isAnalyze: getEnvConfig("analyze").includes(getNodeEnv()),

    meta: {
        env: getNodeEnv(),
        ...loadEnvFile(path.resolve(process.cwd(), '.env')),
        ...loadEnvFile(path.resolve(process.cwd(), `.env.${getNodeEnv()}`)),
    }
}

module.exports = {
    getNodeEnv,
    getEnvConfig,
    isEnvConfig,
    getEnvFlags,
    envs
}

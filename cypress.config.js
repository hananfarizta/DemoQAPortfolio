const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://demoqa.com/',
        async setupNodeEvents(on, config) {
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on("file:preprocessor", bundler);
            await addCucumberPreprocessorPlugin(on, config);

            return config;
        },
        specPattern: [
            "cypress/e2e/features/*.feature",
            "cypress/e2e/features/*/*.feature",
            "cypress/e2e/features/*/*/*.feature"
        ],
        supportFile: false,
        chromeWebSecurity: false
    },
    defaultCommandTimeout: 10000,
    requestMode: true,
    retries: {
        runMode: 1,
        openMode: 0,
    },
    video: false,
});
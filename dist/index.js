"use strict";
/**
 * Entry point for the CAVALI promissory note batch processing script.
 *
 * Configuration is loaded from environment variables (.env files).
 * The NODE_ENV variable determines which environment to run (dev, stg, prod).
 *
 * To run:
 * - npm run dev-script    (uses .env.dev)
 * - npm run stg-script    (uses .env.stg)
 * - npm run prod-script   (uses .env.prod)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const _script_1 = require("./_script");
// Load environment variables from .env file
// The specific .env file is determined by the npm script
(0, dotenv_1.config)();
/**
 * Parse the TO_SEND environment variable into an array.
 * Format: "3,5-10,15" -> [3, [5, 10], 15]
 */
function parseToSend(toSendStr) {
    if (!toSendStr)
        return undefined;
    return toSendStr.split(",").map(item => {
        item = item.trim();
        if (item.includes("-")) {
            const [start, end] = item.split("-").map(Number);
            return [start, end];
        }
        return Number(item);
    });
}
/**
 * Build configuration from environment variables.
 */
function buildConfigFromEnv() {
    const requiredVars = ["FILE", "BATCH_SIZE", "PREFIX", "AUTHORIZATION", "APIKEY"];
    // Check for required environment variables
    for (const varName of requiredVars) {
        if (!process.env[varName]) {
            throw new Error(`Missing required environment variable: ${varName}`);
        }
    }
    return {
        file: process.env.FILE,
        batch: process.env.BATCH ? Number(process.env.BATCH) : 1,
        maxBatch: process.env.MAX_BATCH ? Number(process.env.MAX_BATCH) : undefined,
        batchSize: Number(process.env.BATCH_SIZE),
        prefix: process.env.PREFIX,
        authorization: process.env.AUTHORIZATION,
        apikey: process.env.APIKEY,
        toSend: parseToSend(process.env.TO_SEND),
    };
}
/**
 * Get environment name from NODE_ENV variable.
 * Defaults to 'dev' if not specified.
 */
function getEnvironment() {
    const env = process.env.NODE_ENV;
    if (env === 'stg' || env === 'prod') {
        return env;
    }
    return 'dev';
}
/**
 * Execute the program with configuration from environment variables.
 */
const config = buildConfigFromEnv();
const environment = getEnvironment();
console.log(`\n🚀 Running in ${environment.toUpperCase()} environment\n`);
(0, _script_1.program)(config, environment).then(console.log);
//# sourceMappingURL=index.js.map
// next.config.js
/** @type {import('next').NextConfig} */
require('dotenv').config({ path: `${process.env.ENV_FILE}` });

const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',

    // Expose ENVIRONMENT variable (replacing your previous runtime configs)
    env: {
        ENVIRONMENT: process.env.ENVIRONMENT,
    },

    // Keep this if you previously needed it with MUI
    transpilePackages: ['@mui/x-data-grid'],

    // turbopack: {},
};

module.exports = nextConfig;

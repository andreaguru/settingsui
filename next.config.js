/** @type {import('next').NextConfig} */
require('dotenv-flow').config({
  node_env: process.env.APP_ENV || process.env.NODE_ENV || 'development'
});

const env = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    env[key] = process.env[key]
  }
})

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiEnv: process.env.APP_ENV,
    apiTest: "testapi"
  },
  output: 'standalone',
    webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx/,
      use: [
        {
          loader: 'webpack-strip-code',
          options: {
            choiceArray: [
              {
                start: 'start-test-block',
                end: 'end-test-block'
              },
            ]
          }
        }
      ]
    })

    return config
  },
};

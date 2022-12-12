/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
  env: {
    SETTINGS_API_ENDPOINT: process.env.NEXT_PUBLIC_SETTINGS_API_ENDPOINT,
  },
};

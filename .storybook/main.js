const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-postcss"],
  core: {
    builder: 'webpack4',
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, "../src")
    }

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            }

          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      resourceQuery: /blockType=i18n/,
      type: 'javascript/auto',
      use: [
        {
          loader: '@intlify/vue-i18n-loader'
        }
      ]
    })

    return config;
  }
};
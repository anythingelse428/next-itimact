/**
 * @type {import('next').NextConfig}
 */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
module.exports = {
  config: () => {
    return {
      publicRuntimeConfig: {
        BACKEND_URL: 'http://localhost/backend',
      },
      serverRuntimeConfig: {
        BACKEND_URL: 'http://localhost/backend',
      },
    };
  },
};
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
};

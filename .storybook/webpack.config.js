const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader')
      }
    ]
  });

  config.module.rules.push({
    test: /\.stories\.(ts|tsx)?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre'
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};

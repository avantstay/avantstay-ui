module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
    ],
  })

  config.module.rules.push({
    test: /\.stories\.(ts|tsx)?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  })

  // Remove CaseSensitivePathsPlugin (it causes storybook not to build due to some lodash packages)
  config.plugins.splice(4, 1)

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}

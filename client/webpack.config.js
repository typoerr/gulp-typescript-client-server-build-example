const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const tsConfig = path.resolve(__dirname, 'tsconfig.json')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: env,
  entry: {
    app: './index.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /(\/node_modules\/|\.test\.tsx?$)/,
        use: [{ loader: 'ts-loader', options: { configFile: tsConfig } }],
      },
    ],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfig,
      }),
    ],
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx'],
  },
  stats: 'minimal',
}

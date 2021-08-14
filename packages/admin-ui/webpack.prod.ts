
import HtmlWebpackPlugin from "html-webpack-plugin";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import type {Configuration} from "webpack";
import {ProvidePlugin} from "webpack";
import {resolve} from "path";

const config: Configuration = {
  mode: "production",
  /**
   * Type of sourceMaps
   *
   * @description source map access should be limited on server
   * @see https://webpack.js.org/configuration/devtool/#devtool
   */
  devtool: "source-map",
  /**
   * Application Entry points the application.
   *
   * @see https://webpack.js.org/configuration/entry-context/#entry
   */
  entry: {
    /**
     * Application main entry point
     */
    main: "./src/index.tsx",
  },
  output: {
    /**
     * The publicPath specifies the public URL address of the output files when referenced
     *
     * @see https://webpack.js.org/guides/public-path/
     */
    publicPath: "/",
    /**
     * The output directory as absolute path (required).
     *
     * @see https://webpack.js.org/configuration/output/#output-path
     */
    path: resolve("build"),
  },
  resolve: {
    /**
     * An array of extensions that should be used to resolve modules.
     *
     * @see https://webpack.js.org/configuration/resolve/#resolve-extensions
     */
    extensions: [".ts", ".tsx", ".js"],
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /(\.tsx|\.ts)$/,
        include: [
          resolve(__dirname, "./src"),
        ],
        use: [
          {
            loader: "ts-loader",
            options: {
              projectReferences: true,
              experimentalFileCaching: true,
              configFile: "tsconfig.build.json",
            },
          },
          {
            loader: "@linaria/webpack-loader",
            options: {sourceMap: false},
          },
        ],
      },
    ],
  },
  plugins: [
    /**
     * Plugin CleanWebpackPlugin
     *
     * @description Clean build and test folders.
     * @see https://github.com/johnagan/clean-webpack-plugin
     */
    new CleanWebpackPlugin(),
    /**
     * Create logos and favicons
     * @see https://www.npmjs.com/package/favicons-webpack-plugin
     */
     new FaviconsWebpackPlugin({
      logo: './src/logo.svg'
    }),
    /**
     * Make things global
     * @see https://webpack.js.org/plugins/provide-plugin/
     */
    new ProvidePlugin({
      React:     "react",
      ReactDOM:  "react-dom",
    }),
    /**
     * Plugin BundleAnalyzerPlugin
     * @description analyze webpack final bundle
     *
     * @see https://github.com/webpack-contrib/webpack-bundle-analyzer
     */
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    /**
     * Plugin HtmlWebpackPlugin
     *
     * @description create index.html, inject main and css
     * @see https://webpack.js.org/plugins/html-webpack-plugin/
     */
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      meta: {
        "Content-Security-Policy": {
          "http-equiv": "Content-Security-Policy",
          "content": "default-src self; upgrade-insecure-requests",
        },
      },
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      },
    }),
  ],
};

export default config;

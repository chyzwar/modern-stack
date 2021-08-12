import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import type {Configuration} from "webpack";
import {ProvidePlugin, HotModuleReplacementPlugin} from "webpack";
import {resolve} from "path";


interface DevServerConfiguartion {
  devServer: {
    port: number;
    allowedHosts: string;
  }
}

const config: Configuration & DevServerConfiguartion= {
  mode: "development",
  /**
   * Type of sourceMaps
   *
   * @description source map access should be limited on server
   * @see https://webpack.js.org/configuration/devtool/#devtool
   */
  devtool: "inline-source-map",
  /**
   * Application Entry points the application.
   *
   * @see https://webpack.js.org/configuration/entry-context/#entry
   */
  entry: {
    /**
     * Application main entry point
     */
    main: resolve("./src/index.tsx"),
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
  devServer: {
    port: 5000,
    allowedHosts: 'all'
  },
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
            loader: "babel-loader", 
            options: {plugins: ["react-refresh/babel"]}
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              projectReferences: true,
              experimentalFileCaching: true,
              configFile: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    /**
     * Make things global
     * @see https://webpack.js.org/plugins/provide-plugin/
     */
    new ProvidePlugin({
      React:     "react",
      ReactDOM:  "react-dom",
    }),
    /**
     * Enable HMR plugin
     * @see https://webpack.js.org/plugins/hot-module-replacement-plugin/
     */
    new HotModuleReplacementPlugin(),
    /**
     * Refresh plugin
     * @see https://github.com/pmmmwh/react-refresh-webpack-plugin
     */
    new ReactRefreshWebpackPlugin(),
    /**
     * Plugin HtmlWebpackPlugin
     *
     * @description create index.html, inject main and css
     * @see https://webpack.js.org/plugins/html-webpack-plugin/
     */
    new HtmlWebpackPlugin({
      title: "React Starter Application",
      template: "public/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      },
    }),
  ],
};

export default config;
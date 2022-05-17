import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import type {Configuration} from "webpack";
import {ProvidePlugin} from "webpack";
import {resolve} from "path";


interface DevServerConfiguration {
  devServer: {
    port: number;
    host: string;
    allowedHosts: string;
    historyApiFallback: boolean;
    client: {
      webSocketURL: {
        hostname: string;
        pathname: string
        port: number;
      }
    }
    static: {
      directory: string;
    },
  }
}

const config: Configuration & DevServerConfiguration= {
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
    port: 4000,
    host: "0.0.0.0",
    allowedHosts: 'all',
    historyApiFallback: true,
    static: {
      directory:  resolve(__dirname, "public"),
    },
    client: {
      webSocketURL: {
        hostname: "localhost",
        pathname: "/ws",
        port: 4000,
      },
    }
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
     * Create logos and favicons
     * @see https://www.npmjs.com/package/favicons-webpack-plugin
     */
    new FaviconsWebpackPlugin({
      logo: './src/logo.svg',
      mode: 'light',
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
     * Refresh plugin
     * @see https://github.com/pmmmwh/react-refresh-webpack-plugin
     */
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wds',
        sockHost: "localhost",
        sockPath: "/ws",
        sockPort: 4000,
      }
    }),
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
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

import * as react from "react";
import * as reactDom from "react-dom";

const isProd = process.env.NODE_ENV === "production";
const extensions = [".js", ".ts", ".tsx"];

export default {
  input: "src/index.tsx",
  output: {
    file: "public/index.js",
    format: "iife",
  },
  plugins: [
    postcss({
      extract: false,
      modules: true,
      use: ["sass"],
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(
        isProd ? "production" : "development"
      ),
    }),
    resolve({
      extensions,
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        react: Object.keys(react),
        "react-dom": Object.keys(reactDom),
      },
    }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [
        "react-require",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        [
          "@babel/plugin-proposal-object-rest-spread",
          {
            useBuiltIns: true,
          },
        ],
        [
          "@babel/plugin-transform-runtime",
          {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: false,
          },
        ],
      ],
    }),
    isProd
      ? terser()
      : serve({
          host: "localhost",
          port: 3000,
          open: true,
          contentBase: "public",
          historyApiFallback: true,
        }),
    !isProd &&
      livereload({
        watch: "public",
      }),
  ],
};

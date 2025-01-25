import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const isProd = process.title.includes("--prod");

const plugins = [
    typescript(),
    resolve(),
    commonjs()
];
if(isProd) {
    plugins.push(terser({
        compress: {
            drop_debugger: true
        }
    }));
}

export default [
    {
        input: "src/core/index.ts",
        output: {
            file: "build/core.js",
            format: "cjs",
            inlineDynamicImports: true
        },
        plugins
    }
];

import esbuild from "esbuild";

const prod = (process.argv[2] === "production");

esbuild.build({
    entryPoints: ["src/main.ts"],
    bundle: true,
    define: {
        "DEBUG": !prod
    },
    external: [
        "obsidian",
        "electron",
        "@codemirror/state",
        "@codemirror/view",
        "@codemirror/language"
    ],
    platform: "node",
    minify: prod,
    watch: !prod,
    sourcemap: "inline",
    outfile: "main.js",
    logLevel: "info"
}).catch(() => process.exit(1));

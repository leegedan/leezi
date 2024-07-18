import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: [
        './src/index',
        {
            builder: 'mkdist',
            input: './src/hooks/',
            outDir: './es/hooks',
        },
        {
            builder: 'mkdist',
            input: './src/libs/',
            outDir: './es/libs',
            // ext:'js',
        },
    ],
    // outDir: './es',
    // declaration: true
    // externals: ["@v-c/utils"]
});

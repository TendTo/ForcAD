import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';

const isProduction = process.env.NODE_ENV === 'production';

export default [
    { ignores: ['dist/**'] },
    js.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        files: ['**/*.{js,mjs,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            'no-console': [
                isProduction ? 'error' : 'off',
                { allow: ['warn', 'error'] },
            ],
            'no-debugger': isProduction ? 'error' : 'off',
            'vue/multi-word-component-names': 'off',
        },
    },
    eslintConfigPrettier,
];

import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
    js.configs.recommended,
    {
        ignores: ['build/**', 'node_modules/**', '*.config.js', '*.config.ts'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                document: 'readonly',
                window: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                console: 'readonly',
                localStorage: 'readonly',
                process: 'readonly',
                React: 'readonly',
                JSX: 'readonly',
                test: 'readonly',
                expect: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // File and function size rules
            'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
            'max-lines-per-function': ['error', { max: 25, skipBlankLines: true, skipComments: true }],

            // Function complexity rules
            complexity: ['error', 10],
            'max-params': ['error', 6],
            'max-depth': ['error', 4],

            // Code style
            semi: ['error', 'always'],
            quotes: ['error', 'single'],

            // TypeScript strictness
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'error',
            'consistent-return': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-var-requires': 'error',

            // React rules
            'react/react-in-jsx-scope': 'error',
            'react/prop-types': 'error',
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/jsx-no-undef': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/no-unescaped-entities': 'warn',

            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Accessibility rules
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',

            // Clean code
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
        },
    },
    {
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'max-lines-per-function': 'off',
        },
    },
];

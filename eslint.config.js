import { defineConfig } from "eslint/config";
import { fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactRefresh from "eslint-plugin-react-refresh";
import compatPlugin from "eslint-plugin-compat";
import vitest from "eslint-plugin-vitest";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
	{
		ignores: ["dist/**", "node_modules/**", ".git/**"],
	},
	js.configs.recommended,
	compatPlugin.configs["flat/recommended"],
	{
		files: ["src/**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: "module",
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: "./tsconfig.json",
			},
			globals: {
				...globals.browser,
			},
		},
		plugins: {
			react: fixupPluginRules(react),
			"jsx-a11y": fixupPluginRules(jsxA11y),
			"@typescript-eslint": fixupPluginRules(typescriptEslint),
			"react-refresh": reactRefresh,
			vitest,
			import: fixupPluginRules(importPlugin),
			"react-hooks": fixupPluginRules(reactHooks),
		},
		settings: {
			react: {
				createClass: "createReactClass",
				pragma: "React",
				fragment: "Fragment",
				version: "detect",
			},
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"],
			},
			"import/resolver": {
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"],
				},
			},
		},
		rules: {
			"react-refresh/only-export-components": ["warn", {
				allowConstantExport: true,
			}],
			"array-callback-return": "warn",
			"dot-location": ["warn", "property"],
			eqeqeq: ["warn", "smart"],
			"new-parens": "warn",
			"no-caller": "warn",
			"no-cond-assign": ["warn", "except-parens"],
			"no-const-assign": "warn",
			"no-console": "warn",
			"no-control-regex": "warn",
			"no-delete-var": "warn",
			"no-dupe-args": "warn",
			"no-dupe-keys": "warn",
			"no-duplicate-case": "warn",
			"no-empty-character-class": "warn",
			"no-empty-pattern": "warn",
			"no-eval": "warn",
			"no-ex-assign": "warn",
			"no-extend-native": "warn",
			"no-extra-bind": "warn",
			"no-extra-label": "warn",
			"no-fallthrough": "warn",
			"no-func-assign": "warn",
			"no-implied-eval": "warn",
			"no-invalid-regexp": "warn",
			"no-iterator": "warn",
			"no-label-var": "warn",
			"no-labels": ["warn", {
				allowLoop: true,
				allowSwitch: false,
			}],
			"no-lone-blocks": "warn",
			"no-loop-func": "warn",
			"no-mixed-operators": ["warn", {
				groups: [
					["&", "|", "^", "~", "<<", ">>", ">>>"],
					["==", "!=", "===", "!==", ">", ">=", "<", "<="],
					["&&", "||"],
					["in", "instanceof"],
				],
				allowSamePrecedence: false,
			}],
			"no-multi-str": "warn",
			"no-global-assign": "warn",
			"no-unsafe-negation": "warn",
			"no-new-func": "warn",
			"no-new-object": "warn",
			"no-new-symbol": "warn",
			"no-new-wrappers": "warn",
			"no-obj-calls": "warn",
			"no-octal": "warn",
			"no-octal-escape": "warn",
			"no-regex-spaces": "warn",
			"no-restricted-syntax": ["warn", "WithStatement"],
			"no-script-url": "warn",
			"no-self-assign": "warn",
			"no-self-compare": "warn",
			"no-sequences": "warn",
			"no-shadow-restricted-names": "warn",
			"no-sparse-arrays": "warn",
			"no-template-curly-in-string": "warn",
			"no-this-before-super": "warn",
			"no-throw-literal": "warn",
			"no-restricted-globals": ["error"],
			"no-unreachable": "warn",
			"no-unused-labels": "warn",
			"no-unused-vars": "off",
			"no-useless-computed-key": "warn",
			"no-useless-concat": "warn",
			"no-useless-escape": "warn",
			"no-useless-rename": ["warn", {
				ignoreDestructuring: false,
				ignoreImport: false,
				ignoreExport: false,
			}],
			"no-with": "warn",
			"no-whitespace-before-property": "warn",
			"require-yield": "warn",
			"rest-spread-spacing": ["warn", "never"],
			strict: ["warn", "never"],
			"unicode-bom": ["warn", "never"],
			"use-isnan": "warn",
			"valid-typeof": "warn",
			"getter-return": "warn",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/explicit-function-return-type": "error",
			"@typescript-eslint/no-unused-vars": ["error", {
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^_",
			}],
			"@typescript-eslint/no-unnecessary-type-arguments": "error",
			"@typescript-eslint/prefer-nullish-coalescing": "off",
			"@typescript-eslint/prefer-optional-chain": "error",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/no-var-requires": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/restrict-plus-operands": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-misused-promises": ["warn", {
				checksVoidReturn: {
					arguments: false,
					attributes: false,
				},
			}],
			"@typescript-eslint/no-unsafe-enum-comparison": "off",
			"brace-style": "error",
			curly: ["error", "all"],
			"import/order": ["error", {
				groups: [
					"builtin",
					"external",
					["internal", "unknown"],
					"parent",
					"sibling",
					"index",
				],
				"newlines-between": "always",
			}],
			"import/named": "warn",
			"import/no-unresolved": "off",
			"import/newline-after-import": "error",
			"import/first": "error",
			"import/no-duplicates": "error",
			"import/extensions": "off",
			"import/prefer-default-export": "off",
			"import/no-unassigned-import": "error",
			"import/no-anonymous-default-export": "error",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react/prop-types": "off",
			"react/display-name": "off",
			"vitest/no-alias-methods": "error",
			"vitest/no-conditional-expect": "error",
			"vitest/no-focused-tests": "warn",
			"vitest/no-interpolation-in-snapshots": "error",
			"vitest/no-standalone-expect": "error",
			"vitest/no-test-prefixes": "error",
			"vitest/prefer-comparison-matcher": "error",
			"vitest/prefer-equality-matcher": "error",
			"vitest/prefer-hooks-on-top": "error",
			"vitest/prefer-mock-promise-shorthand": "error",
			"vitest/prefer-spy-on": "error",
			"vitest/prefer-to-contain": "error",
			"vitest/prefer-to-have-length": "error",
			"vitest/prefer-todo": "error",
			"vitest/require-top-level-describe": "error",
		},
	},
	{
		files: ["**/*.stories.*"],
		rules: {
			"import/no-anonymous-default-export": "off",
		},
	},
	{
		files: ["**/*.test.{ts,tsx}"],
		languageOptions: {
			globals: {
				...globals.node,
				...Object.fromEntries(
					Object.entries(globals.browser).map(([key]) => [key, "readonly"])
				),
				it: "readonly",
				expect: "readonly",
				describe: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly",
				beforeAll: "readonly",
				afterAll: "readonly",
				vi: "readonly",
			},
		},
	},
	{
		files: ["vite.config.ts"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
]);
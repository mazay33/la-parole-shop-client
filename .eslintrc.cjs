const MAX_LINE_LENGTH = 120;
module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
		requireConfigFile: false,
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	extends: [
		'plugin:nuxt/recommended',
		'@nuxtjs/eslint-config-typescript',
		'plugin:prettier/recommended',
		'prettier',
		'@unocss',
	],
	plugins: ['prettier'],
	rules: {
		'no-console': 'off',
		'prettier/prettier': [
			2,
			{
				singleQuote: true,
				useTabs: true,
				tabWidth: 4,
				printWidth: MAX_LINE_LENGTH,
				trailingComma: 'all',
				arrowParens: 'avoid',
				singleAttributePerLine: true,
			},
		],
		'import/export': 0,
		'@typescript-eslint/no-unused-vars': 1,
		'no-unused-vars': 1,
		'max-len': [1, { code: MAX_LINE_LENGTH, ignoreComments: true }],
		'n/no-path-concat': 0,
		'vue/multi-word-component-names': 0,
	},
};

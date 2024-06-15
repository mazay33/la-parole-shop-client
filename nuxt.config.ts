import pkg from './package.json';

export default defineNuxtConfig({
	srcDir: 'src',
	alias: {
		'~': `${__dirname}/src/`,
		'@': `${__dirname}/src/`,
		'~~': `${__dirname}/`,
		'@@': `${__dirname}/`,
		assets: `${__dirname}/src/assets/`,
		public: `${__dirname}/src/public/`,
	},
	devtools: true,
	ssr: true,
	runtimeConfig: {
		public: {
			APP_VERSION: pkg.version,
			APP_NAME: pkg.name,
			api: '',
			// APP_MODE: process.env?.NODE_ENV,
		},
	},

	modules: [
		// '@nuxtjs/eslint-module',
		'nuxt-primevue',
		'@formkit/nuxt',
		'@unocss/nuxt',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@vueuse/nuxt',
		'~/modules/auth/module',
	],
	// eslint: {
	// 	lintOnStart: false,
	// },

	primevue: {
		components: {
			exclude: ['Chart'],
		},
		options: {
			ripple: true,
		},
	},
	css: [
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'@sfxcode/formkit-primevue/dist/sass/formkit-primevue.scss',
	],
	build: {
		transpile: ['nuxt', 'primevue', 'formkit-primevue'],
	},
	sourcemap: {
		client: false,
		server: true,
	},
	nitro: {
		prerender: {
			failOnError: false,
		},
		minify: true,
		compressPublicAssets: true,
	},
});

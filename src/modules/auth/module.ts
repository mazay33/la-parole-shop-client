import { defineNuxtModule } from '@nuxt/kit';

import util from '../../../nuxt.modules';

util.dirname = __dirname;

export default defineNuxtModule({
	// Default configuration options for your module
	defaults: {},
	// register routes, components, autoimports
	hooks: util.hooks(),
	// set layouts, global plugins, middleware
	setup(options: any, nuxt: any) {
		util.setup(options, nuxt);
	},
});

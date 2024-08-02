import { defineNuxtPlugin } from '#app';
import lazyDirective from '~/directives/v-lazy';

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.directive('lazy', lazyDirective);
});

// ~/directives/v-lazy.ts

interface LazyImageElement extends HTMLImageElement {
	_lazyLoadObserver?: IntersectionObserver;
}

const lazyDirective = {
	getSSRProps(binding: { value: { src: string; placeholder: string } }, vnode: VNode) {
		return {
			src: binding.value.placeholder,
			loading: 'lazy',
			class: 'loading',
		};
	},
	mounted(el: LazyImageElement, binding: { value: { src: string; placeholder: string } }) {
		el.src = binding.value.placeholder;

		const loadImage = () => {
			const image = new Image();
			image.src = binding.value.src;
			image.onload = () => {
				el.src = binding.value.src;
				el.classList.add('loaded');
				el.classList.remove('loading');
			};
		};

		// Intersection Observer callback
		const onIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					el.classList.add('loading'); // Add loading class for styling
					loadImage();
					observer.unobserve(el);
				}
			});
		};

		// Create and observe with Intersection Observer
		const observer = new IntersectionObserver(onIntersect, {
			rootMargin: '0px',
			threshold: 0.1,
		});

		el._lazyLoadObserver = observer;
		observer.observe(el);
	},
	unmounted(el: LazyImageElement) {
		el._lazyLoadObserver?.disconnect();
	},
};

export default lazyDirective;

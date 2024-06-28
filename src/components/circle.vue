<script setup lang="ts">
import { ref, onMounted } from 'vue';

const circleRef = ref(null);

const onMouseMove = (e: MouseEvent) => {
	const circle = circleRef.value;
	if (circle) {
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;
		const offsetX = (centerX - e.clientX) / window.innerWidth;
		const offsetY = (centerY - e.clientY) / window.innerHeight;
		circle.style.transform = `translate(${offsetX * 20}%, ${offsetY * 20}%) translate(-50%, -50%)`;
	}
};

onMounted(() => {
	document.addEventListener('mousemove', onMouseMove);
});
</script>

<template>
	<div class="link-container">
		<div
			ref="circleRef"
			class="highlight-circle"
		></div>
	</div>
</template>

<style>
.link-container {
	display: inline-block;
	width: 100%;
	height: 100%;
}

.highlight-circle {
	top: 50%;
	left: 50%;
	width: 190px;
	height: 190px;
	background: radial-gradient(circle, rgba(248, 156, 248, 0.5) 15%, rgba(255, 218, 255, 0.1) 70%);
	border-radius: 50%;
	transform: translate(-50%, -50%);
	transition: transform 0.1s ease-out;
	pointer-events: none;
}
</style>

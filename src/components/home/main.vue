<script setup lang="ts"></script>

<template>
	<div class="max-w-[1180px] mx-auto">
		<img
			class="max-w-[780px] left-10 rotate-12 w-full absolute"
			src="/public/flower.png"
			alt=""
		/>
		<div class="flex justify-between">
			<div class="relative max-w-[610px] w-full">
				<div class="z-10 text-[138px] cormorant-garamond-light font-300">
					<p class="leading-28 tracking-normal">LA</p>
					<p class="leading-28 tracking-normal ml-[72px] text-right">PAROLE</p>
					<p class="leading-28 tracking-normal text-right">LINGIRIE</p>
				</div>
				<div class="text-right mt-10 leading-7 text-lg font-300 tracking-wider">
					Нижнее белье ручной работы, <br />
					раскрывающее твою <br />
					чувственность
				</div>
			</div>

			<div class="">
				<img
					class="max-w-[520px] w-full"
					src="https://optim.tildacdn.com/tild6230-3562-4239-a662-653730636539/-/format/webp/IMG_7270_1.jpg"
					alt=""
				/>
			</div>
		</div>
		<NuxtLink
			to="product/components"
			class="text-lg font-300"
			>В каталог</NuxtLink
		>
	</div>
</template>

<style scoped>
.cormorant-garamond-light {
	font-family: 'Cormorant Garamond', serif;
	font-weight: 300;
	font-style: normal;
}
</style>

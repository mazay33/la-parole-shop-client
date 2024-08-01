<script setup lang="ts"></script>

<template>
	<div class="max-w-[1180px] mx-auto relative">
		<div class="absolute right-125 top-5 w-full h-full overflow-hidden pointer-events-none">
			<img
				class="absolute top-0 left-0 w-full max-w-[760px] rotate-[10deg]"
				src="/public/flower.png"
				alt=""
			/>
		</div>
		<div class="flex justify-between gap-10">
			<div class="relative max-w-[610px] w-full">
				<div class="z-10 text-[138px] cormorant-garamond-light font-300">
					<p class="leading-32">LA</p>
					<p class="leading-32 ml-[72px] text-right">PAROLE</p>
					<p class="leading-32 text-right">LINGIRIE</p>
				</div>
				<div class="text-right mt-10 leading-7 text-lg tracking-wider">
					Нижнее белье ручной работы, <br />
					раскрывающее твою истинную <br />
					сексуальность
				</div>
			</div>

			<img
				class="max-w-[520px] w-full"
				src="https://optim.tildacdn.com/tild6230-3562-4239-a662-653730636539/-/format/webp/IMG_7270_1.jpg"
				alt=""
			/>
		</div>

		<HomeComplects class="mt-20" />
	</div>
</template>

<style scoped>
.cormorant-garamond-light {
	font-family: 'Cormorant Garamond', serif;
	font-weight: 300;
	font-style: normal;
}
</style>

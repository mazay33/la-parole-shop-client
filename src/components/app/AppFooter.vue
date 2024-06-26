<script setup lang="ts">
import InputText from 'primevue/inputtext';

const router = useRouter();
const userEmail = ref();
</script>

<template>
	<div>
		<footer class="max-w-[1180px] mx-auto w-full font-['Raleway'] pb-20">
			<hr class="border-gray-300" />
			<div class="flex flex-col md-flex-row text-sm text-center">
				<div class="flex-1 mt-10">
					<img
						class="w-55 cursor-pointer"
						src="https://optim.tildacdn.com/tild3465-6133-4137-b136-333565323731/-/cover/404x364/center/center/-/format/webp/_r_.png"
						alt=""
						@click="router.push('/')"
					/>
					<p class="text-sm font-light text-center pt-10">© 2021 La Parole Lingerie</p>
				</div>
				<div class="flex-1 mt-10">
					<nuxt-link
						to="/product/catalog"
						class="font block mb-3"
						>ПОКУПАТЕЛЯМ</nuxt-link
					>
					<div class="flex-col">
						<nuxt-link
							class="nlink"
							to="/"
							>ДОСТАВКА И ОПЛАТА</nuxt-link
						>
						<nuxt-link
							class="nlink"
							to="/product/catalog"
							>ОБМЕН И ВОЗРАТ</nuxt-link
						>
						<nuxt-link
							class="nlink"
							to="/"
							>ГИД ПО РАЗМЕРАМ</nuxt-link
						>
						<nuxt-link
							class="nlink"
							to="/product/catalog"
							>РЕКОМЕНДАЦИИ ПО РАЗМЕРАМ</nuxt-link
						>
						<nuxt-link
							class="nlink"
							to="/"
							>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</nuxt-link
						>
					</div>
				</div>
				<div class="flex-1 mt-10">
					<nuxt-link
						to="/"
						class="font block mb-3"
						>СВЯЖИТЕСЬ С НАМИ</nuxt-link
					>
					<div class="flex-col">
						<nuxt-link
							class="nlink"
							to="/"
							>COSTUMERS@LAPAROLE.RU</nuxt-link
						>
						<nuxt-link
							class="nlink"
							to="https://api.whatsapp.com/send/?phone=79933584523"
							target="_blank"
							>WHATSAPP</nuxt-link
						>
						<nuxt-link
							class="nlink"
							to="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fla_parole_lingerie%2F%3Futm_medium%3Dcopy_link&is_from_rle"
							target="_blank"
							>INSTAGRAM</nuxt-link
						>
						<nuxt-link
							class="nlink"
							to="https://t.me/+79167857770"
							target="_blank"
							>TELEGRAM</nuxt-link
						>
					</div>
				</div>
				<div class="flex-1 mt-10">
					<nuxt-link
						to="/"
						class="font block mb-3"
						>О НАС</nuxt-link
					>
					<div class="flex-col">
						<nuxt-link
							class="nlink"
							to="/"
							>О БРЕНДЕ LA PAROLE</nuxt-link
						>
						<div class="mt-5 mb-8 flex place-content-center">
							<p class="w-70 block">
								Подпишитесь на нашу email рассылку, чтобы быть в курсе всех новинок и акций и получите
								скидку 5% на первый заказ
							</p>
						</div>
						<div class="flex place-content-center">
							<FloatLabel>
								<InputText
									size="large"
									v-model="userEmail"
									class="w-60 focus:border-color-black hover:border-black"
								/>
								<label for="username">Email</label>
							</FloatLabel>
							<Button
								class="pi pi-arrow-right bg-black border-black ml-2 text-center w-12"
								style="font-size: 0.7rem"
							></Button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<style lang="scss">
.font {
	font-weight: 600;
	color: black;
}
.nlink {
	color: rgb(51 65 85);
	display: block;
	padding-top: 15px;
}
</style>

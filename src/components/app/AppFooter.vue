<script setup lang="ts">
import InputText from 'primevue/inputtext';

const router = useRouter();
const userEmail = ref();

const gid = ref('center');
const visible = ref(false);

const openPosition = pos => {
	gid.value = pos;
	visible.value = true;
};

const recomendation = ref(false);
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
							to="/product/dostavka_i_oplata"
							>ДОСТАВКА И ОПЛАТА</nuxt-link
						>
						<nuxt-link class="nlink" to="/product/dostavka_i_oplata#obmen-i-vozvrat">
							ОБМЕН И ВОЗВРАТ
						</nuxt-link>
						<p1
							class="nlink cursor-pointer"
							@click="openPosition('bottom')"
						>
							ГИД ПО РАЗМЕРАМ
						</p1>
						<Dialog
							v-model:visible="visible"
							header="Гид по размерам"
							:style="{ width: '100%' }"
							:position="gid"
							:modal="true"
							:draggable="false"
						>
							<div class="grid place-content-center">
								<img
									class="w-full"
									src="https://static.tildacdn.com/tild3138-6362-4566-b236-316139353630/_980_.svg"
								/>
							</div>
						</Dialog>

						<p1
							class="nlink cursor-pointer"
							@click="recomendation = true"
						>
							РЕКОМЕНДАЦИИ ПО УХОДУ
						</p1>
						<Dialog
							v-model:visible="recomendation"
							modal
							header="Рекомендации по уходу"
							:style="{ width: '60%' }"
						>
							<div class="text-center">
								<img
									class="w-full"
									src="https://optim.tildacdn.com/tild6663-3734-4266-a231-636134636334/-/resize/756x/-/format/webp/photo.png"
								/></div>
							<div class="flex-col">
									<div class="content">
										
										<p class="flex">
											<p pr-3>&#9679</p> Ручная стирка 30 градусов. Нижнее белье шьётся из деликатных тканей, поэтому не стирайте его в
											машинке (даже при деликатном режиме).
										</p>
										<p class="flex">
											<p pr-3>&#9679</p> Отжимайте белье аккуратно, не выкручивая, иначе вы рискуете нарушить форму.</p>
											<p class="flex">
												<p pr-3>&#9679</p> Сушите белье естественным путём в расправленном виде. Ни в коем случае на батарее или в
											сушилке. Высокая температура деформирует нежную структуру ткани.
										</p>
									</div>
							</div>
						</Dialog>
						<nuxt-link
							class="nlink"
							to="/"
							>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</nuxt-link
						>
					</div>
				</div>
				<div class="flex-1 mt-10">
					<nuxt-link
						to="/product/catalog"
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
								class="bg-black border-black ml-2 text-center w-12"
								icon="pi pi-arrow-right"
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
.content p {
	font-family: 'Raleway', sans-serif;
    font-size: 15px;
}
</style>

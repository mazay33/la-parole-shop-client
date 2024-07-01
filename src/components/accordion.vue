<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
</script>

<template>
	<div>
		<Accordion class="transparent-accordion">
			<AccordionTab header="Таблица размеров">
				<img
					class="w-full"
					src="https://static.tildacdn.com/tild6163-6661-4739-b333-396130373230/Group_267.svg"
				/>
			</AccordionTab>
			<AccordionTab header="Материалы">
				<div class="content">
					<div><p>95% полиамид</p>
					<p class="mt--4">5% эластан</p>
					<p>Ластовица у трусиков 100% хлопок</p></div>
				</div>
			</AccordionTab>
			<AccordionTab header="Рекомендации по уходу">
				<div class="content">
					<img
						class="w-full"
						src="https://optim.tildacdn.com/tild6339-6561-4864-b163-373431666139/-/format/webp/photo.png"
					/>
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
			</AccordionTab>
			<AccordionTab header="Характеристики">
				<div class="content"><p>Категория: Комплекты</p>
					<p class="mt--4">ДxШxВ: 350x300x50 мм</p>
					<p class="mt--4">Вес: 500 г</p></div>
			</AccordionTab>
		</Accordion>
	</div>
</template>

<style lang="scss" >
.transparent-accordion .p-accordion .p-accordion-tab .p-accordion-header,
.transparent-accordion .p-accordion .p-accordion-tab .p-accordion-content {
	background-color: inherit !important;
	color: inherit;
	border: none;
}

.transparent-accordion .p-accordion-header-link {
	color: black;
    font-size: 20px;
    font-family: 'Raleway', sans-serif;
    padding-bottom: 20px;
    padding-top: 20px;
		background-color: inherit;
}

.p-accordion .p-accordion-content{
	background: inherit;
}

.content p {
	font-family: 'Raleway', sans-serif;
    font-size: 15px;
}
</style>

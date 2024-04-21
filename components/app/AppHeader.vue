<script lang="ts" setup>
  const authStore = useAuthStore()
  const { authenticated } = storeToRefs(authStore)
  const { isLoading: isLoadingAuth } = storeToRefs(authStore)
  const items = ref([
    {
      label: 'Каталог',
      root: true,
      items: [
        [
          {
            label: 'КОМПЛЕКТЫ',
            items: [
              { label: 'ВСЕ КОМПЛЕКТЫ' },
              { label: 'BESTSELLERS' },
              { label: 'БАЗОВЫЕ КОМПЛЕКТЫ' },
              { label: 'КРУЖЕВНОЕ БЕЛЬЕ' },
              { label: 'ЧЕРНОЕ БЕЛЬЕ' },
              { label: 'ТЕЛЕСНОЕ БЕЛЬЕ' },
              { label: 'НЕЖНОЕ БЕЛЬЕ' },
              { label: 'КРАСНОЕ БЕЛЬЕ' },
              { label: 'КРАСНОЕ БЕЛЬЕ' },
              { label: 'БЕЛЬЕ ДЛЯ СВИДАНИЙ' },
            ],
          },
        ],
        [
          {
            label: 'БЮСТГАЛЬТЕРЫ',
            items: [
              { label: 'ВСЕ БЮСТГАЛЬТЕРЫ' },
              { label: 'КЛАССИЧЕСКАЯ ЧАШКА' },
              { label: 'УКОРОЧЕННАЯ ЧАШКА' },
              { label: 'БАЛКОНЕТ' },
              { label: 'КОРСЕТ' },
            ],
          },
        ],
        [
          {
            label: 'ТРУСИКИ',
            items: [
              { label: 'ВСЕ ТРУСИКИ' },
              { label: 'СТРИНГИ' },
              { label: 'СТРИНГИ НА РЕГУЛЯТОРАХ' },
              { label: 'БРАЗИЛЬЯНО' },
              { label: 'БРАЗИЛЬЯНО НА РЕГУЛЯТОРАХ' },
              { label: 'ВЫСОКИЕ' },
              { label: 'КРУЖЕВНЫЕ' },
            ],
          },
        ],
        [
          {
            label: 'АКСЕССУАРЫ',
            items: [{ label: 'ПОЯСА' }, { label: 'Посмотреть все' }],
          },
        ],
      ],
    },
    {
      label: 'Новиники',
      root: true,
    },
    {
      label: 'Сертификаты',
      root: true,
    },
    {
      label: 'Индивидуальный пошив',
      root: true,
    },
    {
      label: 'Скидки',
      root: true,
    },
    {
      label: 'О нас',
      root: true,
    },
  ])

  const cartStore = useCartStore()

  const { cartTotal } = storeToRefs(cartStore)

  await cartStore.getCartTotal()

  const isAuthModalOpen = ref(false)

  const authState = reactive({
    email: 'mazaev2000@gmail.com',
    password: 'mazaev3417508',
  })

  const login = async () => {
    await authStore.login(authState.email, authState.password)
  }
</script>

<template>
  <header
    class="app-header pt-2 fixed w-full z-10 bg-[#f4f4f4]/[0.25] backdrop-blur-md"
  >
    <MegaMenu class="max-w-[1180px] mx-auto" :model="items">
      <template #start>
        <div class="">
          <img
            class="w-19"
            src="https://static.tildacdn.com/tild3231-6432-4035-b065-626135383237/01.svg"
            alt=""
          />
        </div>
      </template>

      <template #item="{ item }">
        <nuxt-link
          to=""
          v-if="item.root"
          class="flex items-center px-3 py-2 cursor-pointer overflow-hidden relative uppercase text-[--text-color]"
        >
          <span :class="item.icon" />
          <span class="">{{ item.label }}</span>
        </nuxt-link>

        <a
          v-else-if="!item.image"
          class="flex items-center p-2 cursor-pointer gap-1 text-[--text-color]"
        >
          <span class="inline-flex flex-column gap-1">
            <span class=" ">{{ item.label }}</span>
          </span>
        </a>
      </template>

      <template #end>
        <div class="flex gap-6 items-center">
          <i class="pi pi-heart text-3xl cursor-pointer"></i>

          <i
            @click="useRouter().push('/cart')"
            class="pi pi-shopping-cart text-3xl cursor-pointer"
          ></i>
          <!-- <span>
            {{ cartTotal?.count }}
          </span> -->
          <i
            @click="isAuthModalOpen = true"
            :class="!authenticated ? 'pi pi-sign-in ' : 'pi pi-user'"
            class="text-3xl cursor-pointer"
          ></i>
        </div>
      </template>
    </MegaMenu>
  </header>

  <Dialog
    v-model:visible="isAuthModalOpen"
    modal
    header="Login"
    :style="{ width: '25rem' }"
  >
    <span class="p-text-secondary block mb-5">Login to your account</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">E-mail</label>
      <InputText
        v-model="authState.email"
        id="username"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Password</label>
      <InputText
        v-model="authState.password"
        id="email"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="isAuthModalOpen = false"
      ></Button>
      <Button
        :loading="isLoadingAuth"
        type="button"
        label="Save"
        @click="login"
      ></Button>
    </div>
  </Dialog>
</template>

<style lang="scss">
  .app-header {
    .p-megamenu {
      justify-content: space-between;
      align-items: center;
      background: inherit;
      border: none;
      text-transform: uppercase;
      font-weight: 300;
      &-root-list {
        margin-left: auto;
        gap: 16px;
      }
      .p-menuitem:nth-child(1) {
        padding-top: 1.5px;
      }
      .p-megamenu-panel {
        top: 60px;
      }
      &-end {
        margin-left: 32px;
      }
    }
  }
</style>

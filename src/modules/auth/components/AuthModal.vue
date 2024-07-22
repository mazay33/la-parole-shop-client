<script setup lang="ts">
definePageMeta({
	layout: 'auth',
});
const config = useRuntimeConfig();

const emit = defineEmits(['@close']);

const authStore = useAuthStore();

const email = ref<string>('user@example.com');
const password = ref<string>('password123');
const loading = ref<boolean>(false);

const login = async () => {
	loading.value = true;
	await authStore.login(email.value, password.value);
	if (authStore.isAuthenticated) {
		emit('@close');
	}
	loading.value = false;
	authStore.authModalCustomText = '';
};

const loginWithYadnex = async () => {
	const previousRoute = useRouter().currentRoute.value.fullPath;

	localStorage.setItem('previousRoute', previousRoute);

	navigateTo(config.public.api + 'auth/yandex', { external: true });
	authStore.authModalCustomText = '';
};
</script>
<template>
	<div class="w-full surface-card px-3 py-2">
		<div
			class="flex items-center justify-center p-3 bg-[--surface-100] mb-7 rounded-xl"
			v-if="authStore.isAuthCustomTextVisible"
		>
			<i class="pi pi-exclamation-circle mr-4 text-2xl"></i>
			<span>
				{{ authStore.authModalCustomText }}
			</span>
		</div>
		<div class="flex flex-col gap-2">
			<label for="email">Электронная почта</label>
			<InputText
				v-model="email"
				id="email"
				aria-describedby="email"
				placeholder="user@example.com"
			/>
			<small id="email"></small>
		</div>

		<div class="flex flex-col gap-2 w-full">
			<label for="password">Пароль</label>
			<Password
				v-model="password"
				toggleMask
				class="password-input"
				aria-describedby="password"
				:feedback="false"
			/>
			<small
				id="password"
				class="text-red"
			></small>
		</div>

		<div class="flex align-items-center justify-content-between mb-6">
			<a class="font-medium no-underline text-right cursor-pointer">Забыли пароль?</a>
		</div>
		<Button
			@click="login()"
			:loading="loading"
			class="w-full"
			icon="pi pi-user"
			label="Войти"
		/>

		<div
			class="p-divider p-component p-divider-horizontal p-divider-solid p-divider-center my-6"
			style="justify-content: center"
		>
			<div
				class="p-divider-content"
				data-pc-section="content"
			>
				<span class="font-normal text-sm">ИЛИ</span>
			</div>
		</div>
		<div class="flex gap-4">
			<Button
				@click="loginWithYadnex()"
				class="p-button p-component w-full p-button-secondary"
				type="button"
			>
				<IconYandex class="mr-2" />
				<span class="p-button-label text-black">Войти с помощью Yandex</span>
			</Button>
			<Button
				@click="loginWithYadnex()"
				class="p-button p-component w-full p-button-secondary"
				type="button"
			>
				<IconGoogle class="mr-2" />
				<span class="p-button-label text-black">Войти с помощью Google</span>
			</Button>
		</div>

		<div class="mt-6 text-center">
			Нет аккаунта?
			<a
				tabindex="0"
				class="font-medium"
				>Зарегеистрируйтесь</a
			>
		</div>
	</div>
	<!-- <div class="w-full mx-auto p-6">
		<div class="mb-5">
			<div class="text-3xl font-medium mb-3">Welcome Back</div>
			<span class="font-medium mr-2">Don't have an account?</span
			><a class="font-medium no-underline text-indigo-500 cursor-pointer">Create today!</a>
		</div>
		<div>
			<label
				for="email1"
				class="block font-medium mb-2"
				>Email</label
			>
			<InputText
				v-model="email"
				id="email1"
				type="text"
				placeholder="Email address"
				class="w-full mb-3"
			/>

			<label
				for="password1"
				class="block font-medium mb-2"
				>Password</label
			>
			<InputText
				v-model="password"
				id="password1"
				type="password"
				placeholder="Password"
				class="w-full mb-3"
			/>
			<div class="flex align-items-center justify-content-between mb-6">
				<div class="flex align-items-center">
					<Checkbox
						id="rememberme1"
						:binary="true"
						class="mr-2"
					></Checkbox>
					<label for="rememberme1">Remember me</label>
				</div>
				<a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
			</div>

			<Button
				@click="login()"
				:loading="loading"
				type="submit"
				label="Sign In"
				icon="pi pi-user"
				class="w-full"
			></Button>

			<nuxt-link :to="config.public.api + 'auth/google'">
				<Button
					:loading="loading"
					type="submit"
					label="Sign In with Google"
					icon="pi pi-user"
					class="w-full mt-4"
				></Button>
			</nuxt-link>

			<nuxt-link :to="config.public.api + 'auth/yandex'">
				<Button
					:loading="loading"
					type="submit"
					label="Sign In with Yandex"
					icon="pi pi-user"
					class="w-full mt-4"
				></Button>
			</nuxt-link>
		</div>
	</div> -->
</template>

<style>
.password-input {
	input {
		@apply w-full;
	}
}
</style>

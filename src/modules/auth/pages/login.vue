<script setup lang="ts">
import useApiService from '~/services/apiService';

definePageMeta({
	layout: 'auth',
});
const router = useRouter();

const authStore = useAuthStore();

const { loading, authenticated } = storeToRefs(authStore);

const email = ref<string>('mazaev2000@gmail.com');
const password = ref<string>('mazaev3417508');

const login = async () => {
	await authStore.login(email.value, password.value);
	// if (authenticated.value) {
	// 	router.push('/');
	// }
};

// const refresh = async () => {
// 	await authStore.refresh();
// };

// const getMe = async () => {
// 	await authStore.getMe();
// };
const { data } = await useApiService().auth.getMe();
// refresh()
</script>
<template>
	<div class="flex justify-between items-center h-screen overflow-y-hidden">
		<div class="w-full mx-auto md:w-1/3 p-6 md:p-8">
			<div class="mb-5">
				<!-- <img
          src="/images/blocks/logos/hyper.svg"
          alt="Image"
          height="50"
          class="mb-3"
        /> -->
				{{ data }}
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
					<a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
						>Forgot password?</a
					>
				</div>

				<Button
					@click="login()"
					:loading="loading"
					type="submit"
					label="Sign In"
					icon="pi pi-user"
					class="w-full"
				></Button>

				<Button
					@click="refresh()"
					:loading="loading"
					type="submit"
					label="Sign In"
					icon="pi pi-user"
					class="w-full mt-3"
				></Button>

				<Button
					@click="getMe()"
					:loading="loading"
					type="submit"
					label="Sign In"
					icon="pi pi-user"
					class="w-full mt-3"
				></Button>
			</div>
		</div>

		<div class="relative w-1/2 h-full">
			<img
				class="absoltue w-full h-full object-cover"
				src="https://blocks.primevue.org/images/blocks/signin/signin.jpg"
				alt=""
			/>
		</div>
	</div>
</template>

<style scoped></style>

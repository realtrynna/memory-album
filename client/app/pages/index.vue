<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Memory album</h2>

            <div class="flex justify-end mb-4">
                <button
                    @click="openSignupModal"
                    class="text-sm text-indigo-600 hover:underline"
                >
                    회원가입
                </button>

                <SignupModal v-model:isSignup="isSignupModalOpen" />
            </div>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700"
                        >Email</label
                    >
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700"
                        >Password</label
                    >
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                >
                    로그인
                </button>
            </form>

            <button
                @click="handleKakaoLogin"
                class="w-full mt-4 bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition flex items-center justify-center"
            >
                <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 ... (카카오 아이콘 경로)" />
                </svg>
                카카오 로그인
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import SignupModal from "../components/modals/SignupModal.vue";

const isSignupModalOpen = ref(false);

const openSignupModal = () => {
    isSignupModalOpen.value = true;
};
</script>

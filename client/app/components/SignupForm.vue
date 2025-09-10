<template>
    <form class="space-y-4" @submit.prevent="submit">
        <!-- 이메일 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium">이메일</label>
            <input
                v-model="email"
                type="email"
                placeholder="이메일 입력"
                class="flex-1 border rounded-md p-2"
                required
            />
        </div>

        <!-- 이름 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium">이름</label>
            <input
                v-model="name"
                type="text"
                placeholder="이름 입력"
                class="flex-1 border rounded-md p-2"
                required
            />
        </div>

        <!-- 비밀번호 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium">비밀번호</label>
            <input
                v-model="password"
                type="password"
                placeholder="비밀번호 입력"
                class="flex-1 border rounded-md p-2"
                required
            />
        </div>

        <!-- 비밀번호 확인 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium text-sm">비밀번호 확인</label>
            <input
                v-model="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                class="flex-1 border rounded-md p-2"
                required
            />
        </div>

        <!-- 핸드폰 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium">핸드폰</label>
            <input
                v-model="phone1"
                type="text"
                maxlength="3"
                class="w-1/4 border rounded-md p-2"
                required
            />
            <span>-</span>
            <input
                v-model="phone2"
                type="text"
                maxlength="4"
                class="w-1/4 border rounded-md p-2"
                required
            />
            <span>-</span>
            <input
                v-model="phone3"
                type="text"
                maxlength="4"
                class="w-1/4 border rounded-md p-2"
                required
            />
        </div>

        <!-- 생년월일 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium">생년월일</label>
            <select v-model="birthYear" class="w-1/3 border rounded-md p-2">
                <option disabled value="">년</option>
                <option v-for="y in yearList" :key="y" :value="y">{{ y }}</option>
            </select>
            <select v-model="birthMonth" class="w-1/4 border rounded-md p-2">
                <option disabled value="">월</option>
                <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
            </select>
            <select v-model="birthDay" class="w-1/4 border rounded-md p-2">
                <option disabled value="">일</option>
                <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
            </select>
        </div>

        <div class="flex justify-end space-x-2">
            <button
                type="button"
                class="px-4 py-2 rounded-md border"
                @click="$emit('update:isSignup', false)"
            >
                닫기
            </button>
            <button
                type="submit"
                class="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                @click="handleSignup"
            >
                가입
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserApi } from "../composables/useUserApi";

const email = ref(null);

const currentYear = new Date().getFullYear();
const yearList = computed(() => {
    const arr = [];
    for (let y = 1940; y <= currentYear; y++) {
        arr.push(y);
    }
    return arr;
});

const handleSignup = async () => {
    await useUserApi().post("/api/users", email.value);

    console.log("현재 이메일", email.value);
};
</script>

<template>
    <form class="space-y-4" @submit.prevent="submit">
        <!-- 이메일 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium">이메일</label>

            <!-- 아이디 부분 -->
            <input
                v-model="emailId"
                type="text"
                placeholder="이메일 입력"
                class="w-1/3 border rounded-md p-2"
                required
            />

            <span>@</span>

            <!-- 도메인 선택 또는 직접 입력 -->
            <template v-if="emailDomain !== 'custom'">
                <select v-model="emailDomain" class="w-1/3 border rounded-md p-2">
                    <option disabled value="">도메인 선택</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="custom">직접 입력</option>
                </select>
            </template>

            <template v-else>
                <input
                    v-model="customDomain"
                    type="text"
                    placeholder="도메인 입력"
                    class="w-1/3 border rounded-md p-2"
                    required
                />
            </template>
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
        <div class="flex flex-col space-y-1">
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
            <!-- 안내 문구 -->
            <span class="ml-28 text-sm text-gray-500">
                {{ passwordHint }}
            </span>
        </div>

        <!-- 비밀번호 확인 -->
        <div class="flex items-center space-x-2">
            <label class="w-24 text-right font-medium text-sm">비밀번호 확인</label>
            <input
                v-model="passwordConfirm"
                ref="passwordConfirmInput"
                @focus="onFocus"
                @blur="onBlur"
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
                v-model="phoneOne"
                type="text"
                maxlength="3"
                class="w-1/4 border rounded-md p-2"
                required
            />
            <span>-</span>
            <input
                v-model="phoneTwo"
                type="text"
                maxlength="4"
                class="w-1/4 border rounded-md p-2"
                required
            />
            <span>-</span>
            <input
                v-model="phoneThree"
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

        <!-- 닫기 가입 -->
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
                class="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                :disabled="!isSignupPossible"
                @click="handleSignup"
            >
                가입
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useSignupValidator } from "@/composables/useSignupValidator";

const emailId = ref("");
const emailDomain = ref("");
const customDomain = ref("");
const isSignupPossible = ref(true);
const name = ref("");
const password = ref("");
const passwordConfirm = ref("");
const phoneOne = ref("");
const phoneTwo = ref("");
const phoneThree = ref("");
const passwordConfirmInput = ref<HTMLInputElement | null>(null);
const isPasswordConfirmFocused = ref(false);

const { emailValidate, nameValidate, passwordValidate, phoneValidate } =
    useSignupValidator();

const currentYear = new Date().getFullYear();
const yearList = computed(() => {
    const arr = [];
    for (let y = 1940; y <= currentYear; y++) {
        arr.push(y);
    }
    return arr;
});
const email = computed(() => {
    return emailDomain.value === "custom"
        ? `${emailId.value}@${customDomain.value}`
        : `${emailId.value}@${emailDomain.value}`;
});
const passwordHint = computed(() => {
    return isPasswordConfirmFocused.value &&
        password.value.length === passwordConfirm.value.length &&
        password.value === passwordConfirm.value
        ? "비밀번호가 일치합니다."
        : passwordConfirm.value.length === 0
          ? "비밀번호는 영문/숫자 + 특수문자를 포함하고 6~15자여야 합니다."
          : "처음 입력한 비밀번호와 일치하지 않습니다.";
});
const onFocus = () => (isPasswordConfirmFocused.value = true);
const onBlur = () => (isPasswordConfirmFocused.value = false);

const handleSignup = async () => {
    const isEmailValidation = emailValidate(email.value);
    const isNameValidation = nameValidate(name.value);
    const passwordValidation = passwordValidate(password.value, passwordConfirm.value);
};
</script>

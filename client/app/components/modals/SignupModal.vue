<template>
    <div v-if="isSignup" class="fixed inset-0 flex items-center justify-center z-50">
        <!-- 어두운 배경 -->
        <div
            class="absolute inset-0 bg-black opacity-50"
            @click="$emit('update:isSignup', false)"
        ></div>

        <!-- 모달 카드 -->
        <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
            <h3 class="text-xl font-bold mb-4 text-center">가입 정보</h3>

            <SignupForm />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({ isSignup: Boolean });
const emits = defineEmits(["update:isSignup"]);
</script>
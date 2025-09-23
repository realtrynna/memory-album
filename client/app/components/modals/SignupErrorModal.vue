<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <div class="bg-white p-6 rounded shadow-md w-80">
            <p class="mb-4">{{ props.errorMessage }}</p>
            <button
                class="px-4 py-2 bg-indigo-600 text-white rounded"
                @click="$emit('update:isOpen', false)"
            >
                닫기
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ isOpen: boolean; errorMessage: string }>();
const emit = defineEmits<{
    (e: "update:isOpen", value: boolean): void;
}>();
</script>

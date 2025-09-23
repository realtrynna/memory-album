<template>
    <header class="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-10">
        <div class="max-w-4xl mx-auto flex justify-between items-center px-4 py-2">
            <!-- 로고 -->
            <h1 class="text-xl font-bold text-gray-800">MA</h1>

            <!-- 사용자 + 알림 + 작성 버튼 -->
            <div class="flex items-center space-x-4">
                <!-- Post 작성 버튼 -->
                <button
                    class="flex items-center justify-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    @click="toggleAdd($event)"
                    title="새 글 작성"
                >
                    <span class="material-icons">Add</span>
                </button>

                <transition name="fade">
                    <div
                        v-if="isAddOpen"
                        ref="addRef"
                        class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md flex flex-col"
                    >
                        <!-- 포스트 추가 -->
                        <button
                            class="px-4 py-2 hover:bg-indigo-100 text-left"
                            @click="addPost"
                        >
                            포스트 추가
                        </button>
                        <!-- 앨범 추가 -->
                        <button
                            class="px-4 py-2 hover:bg-indigo-100 text-left"
                            @click="addAlbum"
                        >
                            앨범 추가
                        </button>
                    </div>
                </transition>

                <!-- 알림 -->
                <button class="relative">
                    <span class="material-icons text-gray-700">Alarm</span>
                    <!--                    <span-->
                    <!--                        v-if="notifications > 0"-->
                    <!--                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1"-->
                    <!--                    >-->
                    <!--                        알람-->
                    <!--                    </span>-->
                </button>

                <!-- 프로필 -->
                <div class="flex items-center space-x-2">
                    <img
                        src="/test.jpg"
                        alt="프로필"
                        class="w-8 h-8 rounded-full object-cover"
                    />
                    <span class="text-sm font-medium text-gray-700">윤승근</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isAddOpen = ref(false);
const addRef = ref<HTMLElement | null>(null);

const toggleAdd = (e: MouseEvent) => {
    e.stopPropagation();

    isAddOpen.value = !isAddOpen.value;
};

const handleAddOutside = (e: MouseEvent) => {
    if (addRef.value && !addRef.value.contains(e.target as Node)) {
        isAddOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener("click", handleAddOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleAddOutside);
});
</script>

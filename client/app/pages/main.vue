<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 상단바 -->
        <Header />

        <!-- 메인 피드 -->
        <main class="pt-16 flex justify-center">
            <div
                class="w-full max-w-6xl px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <Post v-for="album in albums" :key="album.id" :album="album" />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Post from "@/components/Post.vue";
import Header from "@/components/Header.vue";

const albums = ref([
    {
        id: 1,
        title: "여름 여행",
        place: "부산 해운대",
        comments: 5,
        thumbnail: "/thumb1.jpg",
    },
    {
        id: 2,
        title: "겨울 캠핑",
        place: "강원도 평창",
        comments: 3,
        thumbnail: "/thumb2.jpg",
    },
    { id: 3, title: "가을 등산", place: "설악산", comments: 8, thumbnail: "/thumb3.jpg" },
]);
</script>

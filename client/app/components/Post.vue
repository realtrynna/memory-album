<template>
    <div
        class="bg-white border rounded-md shadow-sm hover:shadow-md transition overflow-hidden"
    >
        <img :src="album.thumbnail" alt="앨범 이미지" class="w-full h-64 object-cover" />
        <div class="p-4">
            <h3 class="text-lg font-semibold">title</h3>
            <p class="text-sm text-gray-500">place</p>
            <p class="text-sm text-gray-400 mt-2">comment 21개</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    album: {
        id: number;
        title: string;
        place: string;
        comments: number;
        thumbnail: string;
    };
}>();
</script>

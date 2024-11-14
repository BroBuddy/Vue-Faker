<script setup lang="ts">
import { ref } from 'vue'
import Header from '../../components/Header.vue'
import Badge from '../../components/Badge.vue'
import { capitalizeText } from '../../utils/helper'
import { Post } from '../../types'

const props = defineProps({
    posts: Array,
})

const posts = ref<Post[]>(props.posts as Post[])
</script>

<template>
    <div v-if="posts">
        <Header>{{ posts?.length }} Post(s)</Header>

        <div class="px-10">
            <p class="my-5" v-if="posts?.length === 0">No posts available.</p>
            <ul v-else role="list" class="divide-y divide-gray-100">
                <li
                    class="flex justify-between gap-x-6 py-5"
                    v-for="post in posts"
                >
                    <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold text-gray-900">
                                <router-link :to="`/post/${post.id}`">{{
                                    post.title
                                }}</router-link>
                            </p>
                            <p
                                class="flex gap-2 mt-1 truncate text-xs/5 text-gray-500"
                            >
                                <router-link
                                    :to="`/tag/${tag}`"
                                    v-for="tag in post?.tags"
                                >
                                    <Badge>{{ capitalizeText(tag) }}</Badge>
                                </router-link>
                            </p>
                        </div>
                    </div>

                    <div
                        class="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
                    >
                        <div class="flex text-sm/6 gap-2">
                            <Badge color="green"
                                >+ {{ post.reactions?.likes }}</Badge
                            >
                            <Badge color="red"
                                >- {{ post.reactions?.dislikes }}</Badge
                            >
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

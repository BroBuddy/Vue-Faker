<script setup lang="ts">
import Header from '../../components/Header.vue'
import Badge from '../../components/Badge.vue'
import { capitalizeText } from '../../utils/helper'
import { computed, onMounted, ref, watch } from 'vue'
import { usePostStore } from './PostStore'

const query = ref<string>('')
const postStore = usePostStore()

const posts = computed(() => {
    return postStore.posts
})

const fetchData = (postId: string) => {
    postStore.getPostsByQuery(postId)
}

const deletePost = async (postId: string) => {
    postStore.removePost(postId)
}

watch(
    () => query.value,
    (postId, _) => {
        fetchData(String(postId))
    }
)

onMounted(() => {
    fetchData('')
})
</script>

<template>
    <Header>Search Posts</Header>

    <div class="px-10 py-5">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <input
                name="q"
                type="text"
                v-model="query"
                class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
        </div>
    </div>

    <div v-if="posts">
        <Header>{{ posts?.length ?? '0' }} Post(s)</Header>

        <div class="px-10">
            <ul role="list" class="divide-y divide-gray-100">
                <li
                    class="flex justify-between gap-x-6 py-5"
                    v-for="post in posts"
                >
                    <div class="flex min-w-0 gap-x-4">
                        <router-link :to="`/post/${post.id}`"
                            ><img
                                class="h-12 w-12 flex-none rounded-full bg-gray-50"
                                :src="`https://picsum.photos/id/${post.id}/100`"
                                alt=""
                        /></router-link>

                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold text-gray-900">
                                {{ post.title }}
                                <Badge
                                    class="cursor"
                                    color="red"
                                    @click="deletePost(post.id)"
                                    >X</Badge
                                >
                            </p>
                            <p
                                class="flex gap-2 mt-1 truncate text-xs/5 text-gray-500"
                            >
                                <router-link
                                    :to="`/tag/${tag}`"
                                    v-for="tag in post.tags"
                                    ><Badge>{{
                                        capitalizeText(tag)
                                    }}</Badge></router-link
                                >
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col items-end">
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

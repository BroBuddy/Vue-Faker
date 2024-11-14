<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Header from '../../components/Header.vue'
import { useRoute } from 'vue-router'
import { capitalizeText } from '../../utils/helper'
import Badge from '../../components/Badge.vue'
import { useTagStore } from './TagStore'
import { Post } from '../../types'

const tagStore = useTagStore()
const route = useRoute()
const tag = ref<string>('')
const posts = ref<Post[]>([])

const fetchData = async (tagName: string) => {
    posts.value = await tagStore.getPostsByTag(String(tagName))
    tag.value = tagName
}

watch(
    () => route.params.id,
    (tagName, _) => {
        fetchData(String(tagName))
    }
)

onMounted(() => {
    const tagId = String(route.params.id)
    fetchData(tagId)
})
</script>

<template>
    <Header>{{ capitalizeText(String(tag)) }}</Header>

    <div class="px-10">
        <ul role="list" class="divide-y divide-gray-100">
            <li class="flex justify-between gap-x-6 py-5" v-for="post in posts">
                <div class="flex min-w-0 gap-x-4">
                    <router-link :to="`/post/${post.id}`"
                        ><img
                            class="h-12 w-12 flex-none rounded-full bg-gray-50"
                            :src="`https://picsum.photos/id/${post.id}/100`"
                            alt=""
                    /></router-link>

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
                                v-for="tag in post.tags"
                                ><Badge>
                                    {{ capitalizeText(tag) }}</Badge
                                ></router-link
                            >
                        </p>
                    </div>
                </div>

                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
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
</template>

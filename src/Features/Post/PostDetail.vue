<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from '../../components/Header.vue'
import { useRoute } from 'vue-router'
import PostComments from './PostComments.vue'
import { capitalizeText } from '../../utils/helper'
import Badge from '../../components/Badge.vue'
import { usePostStore } from './PostStore'
import { Post } from '../../types'

const route = useRoute()
const postStore = usePostStore()
const post = ref<Post | null>(null)

onMounted(async () => {
    const postId = String(route.params.id)
    post.value = await postStore.getPostById(postId)
})
</script>

<template>
    <div v-if="post">
        <Header>{{ post?.title }}</Header>

        <div>
            <div class="mt-6 px-10">
                <dl class="divide-y divide-gray-100">
                    <div
                        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                        <dt class="text-sm/6 font-medium text-gray-900">
                            Body
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
                        >
                            {{ post?.body }}
                        </dd>
                    </div>

                    <div
                        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                        <dt class="text-sm/6 font-medium text-gray-900">
                            Tags
                        </dt>
                        <dd
                            class="flex gap-2 mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
                        >
                            <router-link
                                :to="`/tag/${tag}`"
                                v-for="tag in post?.tags"
                            >
                                <Badge>{{ capitalizeText(tag) }}</Badge>
                            </router-link>
                        </dd>
                    </div>

                    <div
                        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                        <dt class="text-sm/6 font-medium text-gray-900">
                            Reactions
                        </dt>
                        <dd
                            class="flex gap-2 mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
                        >
                            <Badge color="green">
                                + {{ post?.reactions?.likes }}
                            </Badge>
                            <Badge color="red">
                                - {{ post?.reactions?.dislikes }}
                            </Badge>
                        </dd>
                    </div>

                    <div
                        v-if="post.user"
                        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                        <dt class="text-sm/6 font-medium text-gray-900">
                            User
                        </dt>
                        <dd
                            class="flex gap-2 mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
                        >
                            <router-link :to="`/user/${post.user.id}`">
                                <Badge
                                    >{{ post.user?.firstName }}
                                    {{ post.user?.lastName }}</Badge
                                >
                            </router-link>
                        </dd>
                    </div>
                </dl>
            </div>

            <PostComments
                v-if="post.comments.length"
                :comments="post.comments"
            />
        </div>
    </div>
</template>

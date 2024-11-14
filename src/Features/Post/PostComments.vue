<script setup lang="ts">
import { ref } from 'vue'
import { Comment } from '../../types'
import Header from '../../components/Header.vue'
import Badge from '../../components/Badge.vue'

const props = defineProps({
    comments: Array,
})

const comments = ref<Comment[]>(props.comments as Comment[])
</script>

<template>
    <div v-if="comments">
        <Header>{{ comments?.length }} Comment(s)</Header>

        <div class="px-10">
            <p class="my-5" v-if="comments?.length === 0">
                No comments available.
            </p>

            <ul v-else role="list" class="divide-y divide-gray-100">
                <li
                    class="flex justify-between gap-x-6 py-5"
                    v-for="comment in comments"
                >
                    <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold text-gray-900">
                                <router-link :to="`/user/${comment?.user?.id}`"
                                    ><Badge>{{
                                        comment?.user?.fullName
                                    }}</Badge></router-link
                                >
                            </p>
                            <p class="mt-1 truncate text-xs/5 text-gray-500">
                                > {{ comment.body }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
                    >
                        <div class="flex text-sm/6 gap-2">
                            <Badge color="green">+ {{ comment.likes }}</Badge>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

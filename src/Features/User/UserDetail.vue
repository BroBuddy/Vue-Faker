<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from '../../components/Header.vue'
import UserPosts from './UserPosts.vue'
import { useUserStore } from './UserStore'
import { useRoute } from 'vue-router'
import { User } from '../../types'
import TextDisplay from '../../components/TextDisplay.vue'
import Badge from '../../components/Badge.vue'

const route = useRoute()
const userStore = useUserStore()
const user = ref<User | null>(null)

onMounted(async () => {
    const userId = String(route.params.id)
    user.value = await userStore.getUserById(userId)
})
</script>

<template>
    <div v-if="user">
        <Header>{{ user?.firstName }} {{ user?.lastName }}</Header>

        <div>
            <div class="mt-6 px-10">
                <dl class="divide-y divide-gray-100">
                    <TextDisplay label="Company"
                        >{{ user?.company?.name }}
                        <br />
                        {{ user?.company?.department }}
                        <br />
                        {{ user?.company?.title }}</TextDisplay
                    >

                    <TextDisplay label="Contact">
                        <div class="flex gap-2">
                            <a :href="`mailto:${user?.email}`">
                                <Badge>{{ user?.email }}</Badge>
                            </a>
                            <a :href="`tel:${user?.phone}`"
                                ><Badge>{{ user?.phone }}</Badge></a
                            >
                        </div>
                    </TextDisplay>

                    <TextDisplay label="Address">
                        {{ user?.address?.country }}
                        <br />
                        {{ user?.address?.postalCode }}
                        {{ user?.address?.city }}
                        <br />
                        {{ user?.address?.address }}</TextDisplay
                    >

                    <TextDisplay label="Birthday">
                        {{ user?.birthDate }} ({{ user?.age }})</TextDisplay
                    >
                </dl>
            </div>

            <UserPosts v-if="user.posts.length" :posts="user.posts" />
        </div>
    </div>
</template>

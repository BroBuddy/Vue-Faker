<script setup lang="ts">
import Header from '../../components/Header.vue'
import Badge from '../../components/Badge.vue'
import { capitalizeText } from '../../utils/helper'
import { computed, onMounted } from 'vue'
import { useUserStore } from './UserStore'

const userStore = useUserStore()

const users = computed(() => {
    return userStore.users
})

const deleteUser = async (userId: string) => {
    userStore.removeUser(userId)
}

onMounted(() => {
    if (userStore.users.length === 0) {
        userStore.getAllUsers()
    }
})
</script>

<template>
    <div v-if="users">
        <Header
            >{{ users?.length ?? '0' }} User(s)
            <router-link to="/user/add"
                ><Badge color="green">+</Badge></router-link
            ></Header
        >

        <div class="px-10">
            <ul role="list" class="divide-y divide-gray-100">
                <li
                    class="flex justify-between gap-x-6 py-5"
                    v-for="user in users"
                >
                    <div class="flex min-w-0 gap-x-4">
                        <router-link
                            v-if="user.birthDate"
                            :to="`/user/${user.id}`"
                            ><img
                                class="h-12 w-12 flex-none rounded-full bg-gray-50"
                                :src="user.image"
                                alt=""
                        /></router-link>
                        <img
                            v-else
                            class="h-12 w-12 flex-none rounded-full bg-gray-50"
                            :src="user.image"
                            alt=""
                        />

                        <div class="min-w-0 flex-auto">
                            <p class="text-sm/6 font-semibold text-gray-900">
                                {{ user.firstName }} {{ user.lastName }}
                                <Badge
                                    v-if="user.birthDate"
                                    class="cursor"
                                    color="red"
                                    @click="deleteUser(user.id)"
                                    >X</Badge
                                >
                            </p>
                            <p class="mt-1 truncate text-xs/5 text-gray-500">
                                {{ user.company?.title }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
                    >
                        <div class="flex text-sm/6 gap-2">
                            <Badge v-if="user.role">{{
                                capitalizeText(user.role)
                            }}</Badge>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
type Link = {
    path: string
    name: string
}

const links: Link[] = [
    { path: '/', name: 'Home' },
    { path: '/post', name: 'Posts' },
    { path: '/user', name: 'User' },
]
</script>

<template>
    <div>
        <nav class="bg-gray-800">
            <div class="mx-auto px-10">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="flex flex-1 items-stretch justify-start">
                        <div class="flex shrink-0 items-center">
                            <img
                                class="h-8 w-auto"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                alt=""
                            />
                        </div>

                        <div class="ml-6">
                            <div class="flex space-x-4">
                                <router-link
                                    :to="link.path"
                                    v-for="link in links"
                                    class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                    aria-current="page"
                                    >{{ link.name }}</router-link
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

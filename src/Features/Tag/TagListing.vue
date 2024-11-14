<script setup lang="ts">
import { capitalizeText } from '../../utils/helper'
import Badge from '../../components/Badge.vue'
import { useTagStore } from './TagStore'
import { computed, onMounted } from 'vue'

const tagStore = useTagStore()

const tags = computed(() => {
    return tagStore.tags
})

onMounted(() => {
    tagStore.getAllTags()
})
</script>

<template>
    <div class="my-5 flex flex-row flex-wrap gap-2" v-if="tags">
        <router-link :to="`/tag/${tag}`" v-for="tag in tags"
            ><Badge>{{ capitalizeText(String(tag)) }}</Badge></router-link
        >
    </div>
</template>

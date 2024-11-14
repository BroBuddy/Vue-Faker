<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    label: String,
})

const label = ref<string>(props.label as string)
</script>

<template>
    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm/6 font-medium text-gray-900">{{ label }}</dt>
        <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
            <slot></slot>
        </dd>
    </div>
</template>

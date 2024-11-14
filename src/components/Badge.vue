<script setup lang="ts">
import { ref } from 'vue'

const badgeClass = ref<string>('')
const props = defineProps({
    color: String,
})

switch (props.color) {
    case 'green':
        badgeClass.value = 'bg-green-50 text-green-600 ring-green-500/10'
        break
    case 'red':
        badgeClass.value = 'bg-red-50 text-red-600 ring-red-500/10'
        break
    default:
        badgeClass.value = 'bg-gray-50 text-gray-600 ring-gray-500/10'
}
</script>

<template>
    <span
        :class="`${badgeClass} inline-flex items-center rounded-md px-2 py-1text-xs font-medium ring-1 ring-inset`"
    >
        <slot></slot>
    </span>
</template>

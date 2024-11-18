<script setup lang="ts">
const props = defineProps({
    label: String,
    name: String,
    value: String,
    placeholder: String,
})

defineEmits(['onChange'])
</script>

<template>
    <div>
        <label :for="name" class="block text-sm/6 font-medium text-gray-900">{{
            props.label
        }}</label>
        <div class="mt-2">
            <input
                type="text"
                :name="props.name"
                :id="props.name"
                :value="props.value"
                @input="
                    $emit('onChange', ($event.target as HTMLInputElement).value)
                "
                class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                :placeholder="props.placeholder"
            />
        </div>
    </div>
</template>

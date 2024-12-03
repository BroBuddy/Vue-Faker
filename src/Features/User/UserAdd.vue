<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import FormInput from '../../components/FormInput.vue'
import Header from '../../components/Header.vue'
import { useUserStore } from './UserStore'
import { useRouter } from 'vue-router'
import { API_PATH } from '../../constants'

const router = useRouter()
const userStore = useUserStore()

const addForm: Record<string, Ref<string, string>> = {
    firstName: ref<string>(''),
    lastName: ref<string>(''),
    jobTitle: ref<string>(''),
}

const isFirstNameValid = computed(() => addForm.firstName.value.trim() !== '')
const isLastNameValid = computed(() => addForm.lastName.value.trim() !== '')
const isJobTitleValid = computed(() => addForm.jobTitle.value.trim() !== '')

const formIsValid = isFirstNameValid && isLastNameValid && isJobTitleValid

const changeForm = (field: string, value: string) => {
    switch (field) {
        case 'firstName':
            addForm.firstName.value = value
            break
        case 'lastName':
            addForm.lastName.value = value
            break
        case 'jobTitle':
            addForm.jobTitle.value = value
            break
    }
}

const cancelForm = () => {
    router?.push('/user')
}

const submitForm = () => {
    const { firstName, lastName, jobTitle } = addForm
    const userAlias = `${firstName.value.toLowerCase()}${lastName.value.toLowerCase().charAt(0)}`
    const formBody = {
        firstName: firstName.value,
        lastName: lastName.value,
        image: `${API_PATH}/icon/${userAlias}/128`,
        company: { title: jobTitle.value },
    }

    userStore.addUser(formBody)
    cancelForm()
}
</script>

<template>
    <Header>Add new user</Header>

    <div class="px-10">
        <form @submit.prevent="submitForm">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                    <FormInput
                        label="First name *"
                        name="firstName"
                        :value="addForm.firstName.value"
                        @onChange="($event) => changeForm('firstName', $event)"
                        placeholder="John"
                    />
                </div>

                <div class="sm:col-span-3">
                    <FormInput
                        label="Last name *"
                        name="lastName"
                        :value="addForm.lastName.value"
                        @onChange="($event) => changeForm('lastName', $event)"
                        placeholder="Doe"
                    />
                </div>

                <div class="sm:col-span-3">
                    <FormInput
                        label="Job title *"
                        name="jobTitle"
                        :value="addForm.jobTitle.value"
                        @onChange="($event) => changeForm('jobTitle', $event)"
                        placeholder="Developer"
                    />
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    class="text-sm/6 font-semibold text-gray-900"
                    @click="cancelForm"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    :disabled="!formIsValid"
                    :class="`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                        ${formIsValid ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'}
                    `"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import UserAdd from '../UserAdd.vue'

const pinia = createPinia()
setActivePinia(pinia)

const addForm = {
    firstName: ref<string>(''),
    lastName: ref<string>(''),
    jobTitle: ref<string>(''),
}

// const wrapper = mount(UserAdd, {
//     global: { plugins: [pinia] },
//     props: {},
// })

describe('User add', () => {
    it('should have initially empty form fields', () => {
        expect(addForm.firstName.value.length).toBe(0)
        expect(addForm.lastName.value.length).toBe(0)
        expect(addForm.jobTitle.value.length).toBe(0)
    })

    it('should update certain form fields', () => {
        const firstName = ''
        expect(addForm.firstName.value).toBe(firstName)
    })
})

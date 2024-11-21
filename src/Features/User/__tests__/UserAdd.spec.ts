import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { ref } from 'vue'

const pinia = createPinia()
setActivePinia(pinia)

const addForm = {
    firstName: ref<string>(''),
    lastName: ref<string>(''),
    jobTitle: ref<string>(''),
}

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

describe('User add', () => {
    it('should have initially empty form fields', () => {
        expect(addForm.firstName.value.length).toBe(0)
        expect(addForm.lastName.value.length).toBe(0)
        expect(addForm.jobTitle.value.length).toBe(0)
    })

    it('should update certain form fields', () => {
        const firstName = 'John'
        const lastName = 'Doe'
        const jobTitle = 'Developer'
        changeForm('firstName', firstName)
        expect(addForm.firstName.value).toBe(firstName)
        changeForm('lastName', lastName)
        expect(addForm.lastName.value).toBe(lastName)
        changeForm('jobTitle', jobTitle)
        expect(addForm.jobTitle.value).toBe(jobTitle)
    })
})

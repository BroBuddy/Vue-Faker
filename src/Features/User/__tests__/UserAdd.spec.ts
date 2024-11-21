import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import UserAdd from '../UserAdd.vue'

let wrapper: any
let form: any

const pinia = createPinia()
setActivePinia(pinia)

const API_PATH = 'http://example.com'
const router = {
    push: vi.fn(),
}
const userStore = {
    addUser: vi.fn(),
}

const cancelForm = () => {
    router.push('/user')
}

const submitForm = () => {
    const { firstName, lastName, jobTitle } = wrapper.vm.addForm
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

describe('User add', () => {
    beforeAll(() => {
        wrapper = mount(UserAdd)
        form = wrapper.vm.addForm
    })

    it('should have initially empty form fields', () => {
        expect(form.firstName.value.length).toBe(0)
        expect(form.lastName.value.length).toBe(0)
        expect(form.jobTitle.value.length).toBe(0)
    })

    it('should change the firstName field', () => {
        wrapper.vm.changeForm('firstName', 'John')
        expect(form.firstName.value).toBe('John')
    })

    it('should change the lastName field', () => {
        wrapper.vm.changeForm('lastName', 'Doe')
        expect(form.lastName.value).toBe('Doe')
    })

    it('should change the jobTitle field', () => {
        wrapper.vm.changeForm('jobTitle', 'Developer')
        expect(form.jobTitle.value).toBe('Developer')
    })

    it('should navigate to /user', () => {
        cancelForm()
        expect(router.push).toHaveBeenCalledWith('/user')
    })

    it('should create formBody correctly and call userStore.addUser', () => {
        form.firstName.value = 'John'
        form.lastName.value = 'Doe'
        form.jobTitle.value = 'Developer'

        submitForm()

        const expectedFormBody = {
            firstName: 'John',
            lastName: 'Doe',
            image: `${API_PATH}/icon/johnd/128`,
            company: { title: 'Developer' },
        }

        expect(userStore.addUser).toHaveBeenCalledWith(expectedFormBody)
        expect(router.push).toHaveBeenCalledWith('/user')
    })
})

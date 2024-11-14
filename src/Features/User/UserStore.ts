import { defineStore } from 'pinia'
import { API_PATH } from '../../constants'
import { ref } from 'vue'
import { User } from '../../types'

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([])

    const getAllUsers = async () => {
        try {
            const response = await fetch(`${API_PATH}/users`)
            const data = await response.json()
            users.value = data.users
        } catch (error) {
            console.error(error)
        }
    }

    const getUserById = async (userId: string) => {
        try {
            const response = await fetch(`${API_PATH}/users/${userId}`)
            const data = await response.json()
            const posts = await getUserPostsById(userId)
            data.posts = posts
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const getUserPostsById = async (userId: string) => {
        try {
            const response = await fetch(`${API_PATH}/posts/user/${userId}`)
            const data = await response.json()
            return data.posts
        } catch (error) {
            console.error(error)
        }
    }

    return {
        users,
        getAllUsers,
        getUserById,
    }
})

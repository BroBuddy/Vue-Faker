import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Post } from '../../types'
import { API_PATH } from '../../constants'
import { useUserStore } from '../User/UserStore'

export const usePostStore = defineStore('post', () => {
    const userStore = useUserStore()
    const posts = ref<Post[]>([])

    const getPostsByQuery = async (query: string) => {
        try {
            const response = await fetch(`${API_PATH}/posts/search?q=${query}`)
            const data = await response.json()
            posts.value = data.posts
        } catch (error) {
            console.error(error)
        }
    }

    const getPostById = async (postId: string) => {
        try {
            const response = await fetch(`${API_PATH}/posts/${postId}`)
            const data = await response.json()
            const user = await userStore.getUserById(data.userId)
            const comments = await getPostCommentsById(postId)
            data.user = user
            data.comments = comments
            return data
        } catch (error) {
            console.error(error)
        }
    }

    const getPostCommentsById = async (postId: string) => {
        try {
            const response = await fetch(`${API_PATH}/comments/post/${postId}`)
            const data = await response.json()
            return data.comments
        } catch (error) {
            console.error(error)
        }
    }

    return {
        posts,
        getPostsByQuery,
        getPostById,
    }
})

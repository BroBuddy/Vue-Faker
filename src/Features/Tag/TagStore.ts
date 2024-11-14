import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API_PATH } from '../../constants'

export const useTagStore = defineStore('tag', () => {
    const tags = ref<string[]>([])

    const getAllTags = async () => {
        try {
            const response = await fetch(`${API_PATH}/posts/tag-list`)
            const data = await response.json()
            tags.value = data.sort()
        } catch (error) {
            console.error(error)
        }
    }

    const getPostsByTag = async (tagName: string) => {
        try {
            const response = await fetch(`${API_PATH}/posts/tag/${tagName}`)
            const data = await response.json()
            return data.posts
        } catch (error) {
            console.error(error)
        }
    }

    return { tags, getAllTags, getPostsByTag }
})

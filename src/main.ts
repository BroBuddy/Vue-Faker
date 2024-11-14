import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import PostDetail from './Features/Post/PostDetail.vue'
import PostListing from './Features/Post/PostListing.vue'
import UserListing from './Features/User/UserListing.vue'
import UserDetail from './Features/User/UserDetail.vue'
import TagPosts from './Features/Tag/TagPosts.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/post', component: PostListing },
        { path: '/post/:id', component: PostDetail },
        { path: '/user', component: UserListing },
        { path: '/user/:id', component: UserDetail },
        { path: '/tag/:id', component: TagPosts },
    ],
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
})

app.use(pinia)
app.mount('#app')

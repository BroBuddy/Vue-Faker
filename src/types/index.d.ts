type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    birthDate: string
    age: number
    image: string
    role: string
    address: {
        country: string
        postalCode: string
        city: string
        address: string
    }
    company: {
        name: string
        department: string
        title: string
    }
}

type Post = {
    id: string
    title: string
    body: string
    tags: string[]
    reactions: {
        likes: number
        dislikes: number
    }
    user: User
    comments: Comment[]
}

type Comment = {
    body: string
    likes: number
    user: {
        id: string
        fullName: string
    }
}

export { User, Post, Comment }

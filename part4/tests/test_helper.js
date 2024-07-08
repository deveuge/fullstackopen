const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'The Art of Copilot',
        author: 'AI Writer',
        url: 'https://example.com/the-art-of-copilot',
        likes: 20
    },
    {
        title: 'The Magic of AI Writing',
        author: 'Jane Doe',
        url: 'https://example.com/the-magic-of-ai-writing',
        likes: 50
    },
    {
        title: 'Unlocking Creativity with Copilot',
        author: 'Jane Doe',
        url: 'https://example.com/unlocking-creativity-with-copilot',
        likes: 30
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
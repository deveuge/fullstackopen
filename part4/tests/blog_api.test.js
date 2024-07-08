const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require("../models/blog")


const singleBlog =
{
    title: 'New blog',
    author: 'New author',
    url: 'https://example.com/new-blog',
    likes: 10
}


beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test("blogs contain the id property", async () => {
    const response = await api.get("/api/blogs")
    response.body.forEach(blog => {
        assert.strictEqual(blog.hasOwnProperty('id'), true)
    })
})

test('create new blog', async () => {
    await api.post('/api/blogs')
        .send(singleBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()
    assert.strictEqual(finalBlogs.length, helper.initialBlogs.length + 1)
})

test('create new blog without likes', async () => {
    delete singleBlog.likes

    await api.post('/api/blogs')
        .send(singleBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDb()
    assert.strictEqual(finalBlogs[finalBlogs.length - 1].likes, 0)
})

test('create new blog without title or url', async () => {
    delete singleBlog.url

    await api.post('/api/blogs')
        .send(singleBlog)
        .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})
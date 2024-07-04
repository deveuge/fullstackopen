const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const singleBlog = [
    {
        title: 'The Art of Copilot',
        author: 'AI Writer',
        url: 'https://example.com/the-art-of-copilot',
        likes: 123
    }
]

const multipleBlogs = [
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

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(singleBlog);
        assert.strictEqual(result, singleBlog[0].likes);
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(multipleBlogs);
        assert.strictEqual(result, 100);
    })
})

describe('favorite blog', () => {
    test('of empty list returns null', () => {
        const result = listHelper.favoriteBlog([]);
        assert.strictEqual(result, null);
    })

    test('when list has only one blog returns that blog', () => {
        const result = listHelper.favoriteBlog(singleBlog);
        assert.strictEqual(result, singleBlog[0]);
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(multipleBlogs);
        assert.strictEqual(result, multipleBlogs[1]);
    })
})

describe('most blogs', () => {
    test('of empty list returns null', () => {
        const result = listHelper.mostBlogs([]);
        assert.strictEqual(result, null);
    })

    test('when list has only one blog returns that blog', () => {
        const result = listHelper.mostBlogs(singleBlog);
        assert.deepStrictEqual(result, {
            author: "AI Writer",
            blogs: 1
        });
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(multipleBlogs);
        assert.deepStrictEqual(result, {
            author: "Jane Doe",
            blogs: 2
        });
    })
})

describe('most likes', () => {
    test('of empty list returns null', () => {
        const result = listHelper.mostLikes([]);
        assert.strictEqual(result, null);
    })

    test('when list has only one blog returns that blog', () => {
        const result = listHelper.mostLikes(singleBlog);
        assert.deepStrictEqual(result, {
            author: "AI Writer",
            likes: 123
        });
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(multipleBlogs);
        assert.deepStrictEqual(result, {
            author: "Jane Doe",
            likes: 80
        });
    })
})
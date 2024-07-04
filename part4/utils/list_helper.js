const lodash = require("lodash");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogsList) => {
    return blogsList.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogsList) => {
    if (blogsList.length === 0) {
        return null
    }
    const maxLikes = Math.max(...blogsList.map((blog) => blog.likes))
    return blogsList.find((blog) => blog.likes === maxLikes)
}

const mostBlogsWOLodash = (blogsList) => {
    if (blogsList.length === 0) {
        return null
    }

    // Count author occurrences
    const authorCount = new Map();
    for (const blog of blogsList) {
        const author = blog.author;
        authorCount.set(author, (authorCount.get(author) || 0) + 1);
    }

    // Find the author with the highest count
    let maxAuthor = '';
    let maxCount = 0;
    for (const [author, count] of authorCount) {
        if (count > maxCount) {
            maxCount = count;
            maxAuthor = author;
        }
    }

    return {
        author: maxAuthor,
        blogs: maxCount
    }
}

const mostBlogs = (blogsList) => {
    if (blogsList.length === 0) {
        return null
    }

    const authorCount = lodash.countBy(blogsList, "author")
    const mostBlogsAuthor = Object.keys(authorCount).reduce((a, b) => {
        return authorCount[a] > authorCount[b] ? a : b
    })

    return {
        author: mostBlogsAuthor,
        blogs: authorCount[mostBlogsAuthor]
    }
}

const mostLikes = (blogsList) => {
    if (blogsList.length === 0) {
        return null
    }

    const likesCount = lodash(blogsList).groupBy("author")
        .map((blog, key) => ({
            author: key,
            likes: lodash.sumBy(blog, "likes"),
        }))
        .value()

    return likesCount.reduce((a, b) => {
        return a.likes > b.likes ? a : b;
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
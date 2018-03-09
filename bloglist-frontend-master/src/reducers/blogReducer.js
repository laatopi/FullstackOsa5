import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
    switch (action.type) {
        case 'LIKE_BLOG':
            const old = store.filter(b => b._id !== action.blog._id)
            console.log(old, 'vanha')
            return [...old, action.blog]
        case 'CREATE_BLOG':
            const newBlog = action.blog
            return [...store, newBlog]
        case 'DELETE_BLOG':
            const filtered = store.filter(b => b._id !== action._id)
            return filtered
        case 'INITIATE_BLOG':
            return action.blogs
        default:
            return store
    }
}
export const blogInitialization = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIATE_BLOG',
            blogs: blogs
        })
    }
}

export const blogCreation = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE_BLOG',
            blog: newBlog
        })
    }
}

export const blogLike = (blog) => {
    return async (dispatch) => {
        const likedBlog = await blogService.update(blog)
        dispatch({
            type: 'LIKE_BLOG',
            blog: likedBlog
        })
    }
}

export const blogDelete = (blog) => {
    return async (dispatch) => {
        await blogService.deleteBlog(blog._id)
        dispatch({
            type: 'DELETE_BLOG',
            _id: blog._id
        })
    }
}


export default blogReducer
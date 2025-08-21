export const API_URL = "http://localhost:3008/api";

export const API_ROUTES = {
    auth: {
        signUp: `${API_URL}/auth/sign-up`,
        signIn: `${API_URL}/auth/sign-in`,
        signOut: `${API_URL}/auth/sign-out`,
    },
    user: {
        createUser: `${API_URL}/users`,
        getUsers: `${API_URL}/users`,
        getUser: `${API_URL}/users/:id`,
        updateUser: `${API_URL}/users/:id`,
    },
    blogPost: {
        createBlogPost: `${API_URL}/blog-posts`,
        getBlogPosts: `${API_URL}/blog-posts`,
        getBlogPost: `${API_URL}/blog-posts/:id`,
        updateBlogPost: `${API_URL}/blog-posts/:id`,
        deleteBlogPost: `${API_URL}/blog-posts/:id`,
    },
    category: {
        createCategory: `${API_URL}/categories`,
        getCategories: `${API_URL}/categories`,
        getCategory: `${API_URL}/categories/:id`,
        updateCategory: `${API_URL}/categories/:id`,
        deleteCategory: `${API_URL}/categories/:id`,
    },
    comment: {
        createComment: `${API_URL}/comments`,
        getComments: `${API_URL}/comments`,
        getComment: `${API_URL}/comments/:id`,
        updateComment: `${API_URL}/comments/:id`,
        deleteComment: `${API_URL}/comments/:id`,
    },
}

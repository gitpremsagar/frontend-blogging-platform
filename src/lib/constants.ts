export const API_URL = "http://localhost:3008/api";

export const API_ROUTES = {
    auth: {
        signUp: `/auth/sign-up`,
        signIn: `/auth/sign-in`,
        signOut: `/auth/sign-out`,
        refreshAccessToken: `/auth/refresh-access-token`,
        
    },
    user: {
        createUser: `/users`,
        getUsers: `/users`,
        getUser: `/users/:id`,
        updateUser: `/users/:id`,
    },
    blogPost: {
        createBlogPost: `/blog-posts`,
        getBlogPosts: `/blog-posts`,
        getBlogPost: `/blog-posts/:id`,
        updateBlogPost: `/blog-posts/:id`,
        deleteBlogPost: `/blog-posts/:id`,
    },
    category: {
        createCategory: `/categories`,
        getCategories: `/categories`,
        getCategory: `/categories/:id`,
        updateCategory: `/categories/:id`,
        deleteCategory: `/categories/:id`,
    },
    comment: {
        createComment: `/comments`,
        getComments: `/comments`,
        getComment: `/comments/:id`,
        updateComment: `/comments/:id`,
        deleteComment: `/comments/:id`,
    },
}

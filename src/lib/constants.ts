// export const API_URL = "http://localhost:3008/api";
export const API_URL = "https://backend-blogging-platform.vercel.app";

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
        createBlogPost: `/blog-post`,
        getBlogPosts: `/blog-post`,
        getBlogPost: `/blog-post/:id`,
        getBlogPostsByCategoryId: `/blog-post/category/:id`,
        updateBlogPost: `/blog-post/:id`,
        deleteBlogPost: `/blog-post/:id`,
    },
    category: {
        createCategory: `/blog-category`,
        getCategories: `/blog-category`,
        getCategory: `/blog-category/:id`,
        updateCategory: `/blog-category/:id`,
        deleteCategory: `/blog-category/:id`,
    },
    comment: {
        createComment: `/comments`,
        getComments: `/comments`,
        getComment: `/comments/:id`,
        updateComment: `/comments/:id`,
        deleteComment: `/comments/:id`,
    },
}

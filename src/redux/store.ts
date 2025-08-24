import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import blogPostReducer from "./blogPostSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        category: categoryReducer,
        blogPost: blogPostReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
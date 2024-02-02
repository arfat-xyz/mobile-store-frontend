import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
// ...
import userReducer from "./module/user/userSlice";
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseApi.middleware]),
});
export interface SerializedError {
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Need to use the React-specific entry point to import createApi
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface CustomizedFetchBaseQueryError {
  data?: {
    success: boolean;
    message: string;
    errorMessages?: { path: string; message: string }[];
  };
}
// Define a service using a base URL and expected endpoints
const db = import.meta.env.VITE_DB;
export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["products", "comments"],
  baseQuery: fetchBaseQuery({ baseUrl: db }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomizedFetchBaseQueryError,
    object
  >,
  endpoints: () => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default baseApi;

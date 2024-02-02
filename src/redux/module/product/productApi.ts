import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({
        max,
        createdAt,
        brand,
        searchTerm,
        os,
        size,
        storage,
        token,
      }) => {
        return {
          url: `/products?max=${max}&sortBy=createdAt&sortOrder=${createdAt}${
            brand ? `&brand=${brand}` : ""
          }${searchTerm ? `&searchTerm=${searchTerm}` : ""}${
            size ? `&size=${size}` : ""
          }${os ? `&os=${os}` : ""}${storage ? `&storage=${storage}` : ""}`,
          headers: { authorization: token },
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        headers: { authorization: token },
      }),
      providesTags: ["products"],
    }),
    getSingleProductComment: builder.query({
      query: ({ id, token }) => ({
        url: `/products/comment/${id}`,
        headers: { authorization: token },
      }),
      providesTags: ["comments"],
    }),
    deleteSingleProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: { authorization: token },
      }),
      invalidatesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: ({ data, token }) => ({
        url: `/products`,
        method: "POST",
        headers: { authorization: token },
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    addComment: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `/products/comment/`,
        method: "POST",
        headers: { authorization: token },
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, token, ...data }) => {
        return {
          url: `/products/${id}`,
          method: "PUT",
          headers: { authorization: token },
          body: data.data,
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});
export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteSingleProductMutation,
  useGetSingleProductCommentQuery,
  useAddCommentMutation,
} = productApi;

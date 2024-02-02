import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postSell: builder.mutation({
      query: ({ token, productId, quantity }) => ({
        url: `/sell`,
        method: "POST",
        headers: { authorization: token },
        body: { productId, quantity: parseInt(quantity) },
      }),
      invalidatesTags: ["products"],
    }),
    getData: builder.query({
      query: ({ token }) => ({
        url: `/sell/data`,
        method: "GET",
        headers: { authorization: token },
      }),
    }),
    getAllSell: builder.query({
      query: ({ token }) => ({
        url: `/sell`,
        method: "GET",
        headers: { authorization: token },
      }),
    }),
  }),
});
export const { usePostSellMutation, useGetDataQuery, useGetAllSellQuery } =
  productApi;

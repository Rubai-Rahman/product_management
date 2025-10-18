// store/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
// Remove process import - use process.env directly
import { Product, category } from '../_types/products';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.bitechx.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // Set content type
      headers.set('Content-Type', 'application/json');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string }>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    getProducts: builder.query<Product[], { offset: number; limit: number }>({
      query: ({ offset, limit }) => `/products?offset=${offset}&limit=${limit}`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Product' as const, id })),
        { type: 'Product', id: 'LIST' },
      ],
    }),
    searchProducts: builder.query<Product[], string>({
      query: (searchedText) =>
        `/products/search?searchedText=${encodeURIComponent(searchedText)}`,
      providesTags: (result = [], error, searchedText) => [
        { type: 'Product', id: `SEARCH_${searchedText}` },
      ],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => {
        console.log('Fetching product with ID:', id);
        console.log(
          'Full URL will be:',
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.bitechx.com'
          }/products/${id}`
        );
        return `/products/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Product', id: id }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; body: Partial<Product> }
    >({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, 'Product'],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, 'Product'],
    }),
    // Categories endpoints
    getCategories: builder.query<
      category[],
      { offset?: number; limit?: number }
    >({
      query: ({ offset = 0, limit = 10 }) =>
        `/categories?offset=${offset}&limit=${limit}`,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Category' as const, id })),
        { type: 'Category', id: 'LIST' },
      ],
    }),
    searchCategories: builder.query<category[], string>({
      query: (searchedText) =>
        `/categories/search?searchedText=${searchedText}`,
      providesTags: (result = [], error, searchedText) => [
        { type: 'Category', id: `SEARCH_${searchedText}` },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useSearchCategoriesQuery,
} = api;

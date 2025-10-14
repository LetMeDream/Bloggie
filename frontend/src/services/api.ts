// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post, CategoryType } from '../types/posts'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    // Get all posts
    getPosts: builder.query<Post[], void>({
      query: () => `/post`,
    }),
    // Get all categories
    getCategories: builder.query<CategoryType[], void>({
      query: () => `/post/category/list`,
    }),
    // Get a single post by slug
    getSinglePost: builder.query<Post, string>({
      query: (slug) => `/post/detail/${slug}`,
    }),
    // Register user
    registerUser: builder.mutation({
      query: (userData: { full_name: string; email: string; password: string; password2: string }) => ({
        url: '/user/register/',
        method: 'POST',
        body: userData
      })
    }),
    // Login user
    loginUser: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: '/user/token/',
        method: 'POST',
        body: credentials,
      })
    }),
    // Create Post
    createPost: builder.mutation({
      query: (postData: { title: string; description: string; category: number; user: number, image: File, tags: string[], status: string }) => {

        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('description', postData.description);
        formData.append('category', postData.category.toString());
        formData.append('user', postData.user.toString());
        formData.append('image', postData.image); // File object
        formData.append('status', postData.status);
        formData.append('tags', JSON.stringify(postData.tags));

        return {
          url: '/author/dashboard/post-create',
          method: 'POST',
          body: formData
        }
      }
    }),
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useGetCategoriesQuery, useGetSinglePostQuery, useCreatePostMutation } = api
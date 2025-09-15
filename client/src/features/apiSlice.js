import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Send cookies (JWT) with requests
const baseQuery = fetchBaseQuery({ baseUrl: '', credentials: 'include' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Task'],
  endpoints: () => ({}),
});
import { baseApi } from "./baseApi";

const duaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDua: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/duas?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["dua"],
    }),
    getSingleDua: builder.query({
      query: (id) => ({
        url: `/dua/${id}`,
        method: "GET",
      }),
      providesTags: ["dua"],
    }),
    createDua: builder.mutation({
      query: (payload) => ({
        url: `/duas`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["dua"],
    }),
    updateDua: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/duas/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["dua"],
    }),
    deleteDua: builder.mutation({
      query: (id) => ({
        url: `/duas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dua"],
    }),
  }),
});

export const {
  useGetAllDuaQuery,
  useGetSingleDuaQuery,
  useCreateDuaMutation,
  useUpdateDuaMutation,
  useDeleteDuaMutation,
} = duaApi;

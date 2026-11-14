import { baseApi } from "./baseApi";

const SunnahApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSunnah: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/sunnahs?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["sunnah"],
    }),
    getSingleSunnah: builder.query({
      query: (id) => ({
        url: `/sunnah/${id}`,
        method: "GET",
      }),
      providesTags: ["sunnah"],
    }),
    createSunnah: builder.mutation({
      query: (payload) => ({
        url: `/sunnahs`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["sunnah"],
    }),
    updateSunnah: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/sunnahs/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["sunnah"],
    }),
    deleteSunnah: builder.mutation({
      query: (id) => ({
        url: `/sunnahs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sunnah"],
    }),
  }),
});

export const {
  useGetAllSunnahQuery,
  useGetSingleSunnahQuery,
  useCreateSunnahMutation,
  useUpdateSunnahMutation,
  useDeleteSunnahMutation,
} = SunnahApi;

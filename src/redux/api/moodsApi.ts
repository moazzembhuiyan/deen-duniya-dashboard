import { baseApi } from "./baseApi";

const moodsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMoods: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/moods?limit=${limit}&page=${page}&searchTerm=${searchText}`,
        method: "GET",
      }),
      providesTags: ["mood"],
    }),
    getSingleMood: builder.query({
      query: (id) => ({
        url: `/moods/${id}`,
        method: "GET",
      }),
      providesTags: ["mood"],
    }),
    createMood: builder.mutation({
      query: (payload) => ({
        url: `/moods`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["mood"],
    }),
    updateMood: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/moods/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["mood"],
    }),
    deleteMood: builder.mutation({
      query: (id) => ({
        url: `/moods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mood"],
    }),
  }),
});

export const {
  useGetAllMoodsQuery,
  useGetSingleMoodQuery,
  useCreateMoodMutation,
  useUpdateMoodMutation,
  useDeleteMoodMutation,
} = moodsApi;

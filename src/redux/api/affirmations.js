import { baseApi } from "./baseApi";

const affirmationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAffirmations: builder.query({
      query: ({ limit, page, searchText }) => ({
        url: `/affirmations?limit=${limit}&page=${page}&searchText=${searchText}`,
        method: "GET",
      }),
      providesTags: ["Affirmations"],
    }),

    createAffirmation: builder.mutation({
      query: (data) => ({
        url: "/affirmations",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Affirmations"],
    }),
    updateAffirmation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/affirmations/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Affirmations"],
    }),
    deleteAffirmation: builder.mutation({
      query: (id) => ({
        url: `/affirmations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Affirmations"],
    }),
  }),
});

export const {
  useGetAffirmationsQuery,
  useCreateAffirmationMutation,
  useUpdateAffirmationMutation,
  useDeleteAffirmationMutation,
} = affirmationsApi;

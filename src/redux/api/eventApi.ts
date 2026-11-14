import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: ({ limit = 10, page = 1, searchText = "", year }) => ({
        url: `/events/islamic-event?limit=${limit}&page=${page}&searchTerm=${searchText}&year=${year}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),

    createEvent: builder.mutation({
      query: (payload) => ({
        url: `/events`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["event"],
    }),

    updateEvent: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["event"],
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;

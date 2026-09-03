import { baseApi } from "./baseApi";

const FileUploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation({
      query: (payload) => ({
        url: `/uploads/single`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useUploadSingleFileMutation } = FileUploadApi;

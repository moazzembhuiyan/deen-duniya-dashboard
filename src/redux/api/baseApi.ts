import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/authSlice";

interface AuthSnapshot {
  auth?: {
    token?: string | null;
    user?: { [key: string]: unknown } | null;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, ""),
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AuthSnapshot).auth?.token;
    if (token) {
      headers.set("Authorization", token);
    }
    if (typeof window !== "undefined") {
      const signUpToken = localStorage.getItem("signupToken");
      if (signUpToken) headers.set("token", signUpToken);

      const guestToken = sessionStorage.getItem("guestToken");
      if (guestToken) headers.set("token", guestToken);

      const forgetPasswordToken = sessionStorage.getItem(
        "forgetPasswordToken",
      );
      if (forgetPasswordToken) {
        headers.set("Authorization", forgetPasswordToken);
      }
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const token = api.getState()?.auth?.token;

  if (result?.error?.status === 401 && token) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        headers: { Authorization: token },
      },
      api,
      extraOptions,
    );
    const accessToken = (
      refreshResult.data as { data?: { accessToken?: string } } | undefined
    )?.data?.accessToken;

    if (accessToken) {
      const user = (api.getState() as AuthSnapshot).auth?.user;
      api.dispatch(setUser({ user, token: accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "transactions",
    "content",
    "user",
    "auth",
    "notification",
    "categories",
    "services",
    "banner",
    "productsCategory",
    "delivery-charge",
    "refundRequests",
    "withdrawalRequests",
    "faq",
    "contentModeration",
    "complain",
    "withdrawals",
    "event",
    "Affirmations",
    "settings",
    "dua",
    "mood",
    "subCription",
    "subscriptionHistory",
    "sunnah",
  ],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

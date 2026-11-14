import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id?: string;
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  role?: string;
  phone?: string;
  photoUrl?: string;
  image?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

interface SetUserPayload {
  user?: AuthUser | null;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const { user, token } = action.payload;
      state.user = user ?? state.user;
      state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

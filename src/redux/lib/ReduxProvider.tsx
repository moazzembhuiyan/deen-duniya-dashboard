"use client";

import type { ReactNode } from "react";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { AdminPageSkeleton } from "@/components/LoadingSkeleton";

export default function ReduxProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<AdminPageSkeleton />}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}

"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { hydrateCart } from "@/lib/redux/cartSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    store.dispatch(hydrateCart());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}


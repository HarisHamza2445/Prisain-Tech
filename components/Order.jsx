"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { priceOrder } from "@/lib/proposal";

// The visitor's package, add-ons and retainer, shared by the booking portal and the terms section.
const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState({
    baseId: "t2",
    addons: {},
    retainerId: null,
  });
  const [booking, setBooking] = useState(false);

  const value = useMemo(() => {
    const quote = priceOrder(order);
    return {
      order,
      quote,
      booking,
      setBooking,
      pickBase: (baseId) => setOrder((o) => ({ ...o, baseId })),
      setAddon: (id, qty) => setOrder((o) => ({ ...o, addons: { ...o.addons, [id]: qty } })),
      setRetainer: (retainerId) => setOrder((o) => ({ ...o, retainerId })),
    };
  }, [order, booking]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export const useOrder = () => useContext(OrderContext);

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Order } from "../types/order";

type OrderContextValue = {
  lastOrder: Order | null;
  setLastOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const value = useMemo(() => ({ lastOrder, setLastOrder }), [lastOrder]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}

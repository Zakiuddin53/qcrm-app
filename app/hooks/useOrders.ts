import { useState, useCallback, useEffect } from "react";
import { Order, OrderStatus } from "../types/order";
import generateMockOrders from "../data/mockOrders";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOrders(generateMockOrders());
      setLoading(false);
    };

    loadOrders();
  }, []);

  const updateOrderStatus = useCallback(
    (orderId: string, newStatus: OrderStatus) => {
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    },
    []
  );

  const filterOrders = useCallback(
    (status?: OrderStatus) => {
      return status
        ? orders.filter((order) => order.status === status)
        : orders;
    },
    [orders]
  );

  return {
    orders,
    loading,
    updateOrderStatus,
    filterOrders,
  };
};

export default useOrders;

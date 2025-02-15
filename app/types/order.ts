export type OrderStatus = "pending" | "accepted" | "delivered";

export interface Order {
  id: string;
  customerName: string;
  address: string;
  status: OrderStatus;
  timestamp: number;
}

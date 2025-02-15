import { Order } from "../types/order";

const generateMockOrders = (): Order[] => [
  {
    id: "1",
    customerName: "John Doe",
    address: "123 Main St, New York",
    status: "pending",
    timestamp: Date.now() - 3600000,
  },
  {
    id: "2",
    customerName: "Jane Smith",
    address: "456 Park Ave, Brooklyn",
    status: "accepted",
    timestamp: Date.now() - 7200000,
  },
  {
    id: "3",
    customerName: "Mike Johnson",
    address: "789 Broadway, Manhattan",
    status: "delivered",
    timestamp: Date.now(),
  },
];

export default generateMockOrders;

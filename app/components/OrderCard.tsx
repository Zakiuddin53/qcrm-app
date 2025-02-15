import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Order, OrderStatus } from "../types/order";
import { useRouter } from "expo-router";

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
}

const OrderCard = ({ order, onStatusUpdate }: OrderCardProps) => {
  const router = useRouter();

  const getNextStatus = (): OrderStatus | null => {
    switch (order.status) {
      case "pending":
        return "accepted";
      case "accepted":
        return "delivered";
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <ThemedView style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/(orders)/[id]",
            params: { id: order.id },
          })
        }
      >
        <ThemedText type="defaultSemiBold">Order #{order.id}</ThemedText>
        <ThemedText>{order.customerName}</ThemedText>
        <ThemedText>{order.address}</ThemedText>
        <ThemedText>Status: {order.status.toUpperCase()}</ThemedText>

        {nextStatus && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onStatusUpdate(order.id, nextStatus)}
          >
            <ThemedText style={styles.buttonText}>
              Mark as {nextStatus}
            </ThemedText>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#0a7ea4",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default OrderCard;

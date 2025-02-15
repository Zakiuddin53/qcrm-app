import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StatusTimeline } from "../components/StatusTimeline";
import useOrders from "../hooks/useOrders";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { orders } = useOrders();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Order not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Order #{order.id}</ThemedText>
          <ThemedText style={styles.timestamp}>
            {new Date(order.timestamp).toLocaleString()}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Status</ThemedText>
          <StatusTimeline currentStatus={order.status} />
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Customer Information</ThemedText>
          <ThemedView style={styles.infoContainer}>
            <ThemedText type="defaultSemiBold">Name</ThemedText>
            <ThemedText>{order.customerName}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoContainer}>
            <ThemedText type="defaultSemiBold">Delivery Address</ThemedText>
            <ThemedText>{order.address}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  timestamp: {
    color: "#687076",
    marginTop: 4,
  },
  infoContainer: {
    marginTop: 12,
    gap: 4,
  },
});

import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { OrderStatus } from "../types/order";
import useOrders from "../hooks/useOrders";
import { OrderCardSkeleton } from "../components/OrderCardSkeleton";
import OrderCard from "../components/OrderCard";

const FILTER_OPTIONS: OrderStatus[] = ["pending", "accepted", "delivered"];

export default function OrdersScreen() {
  const { orders, loading, updateOrderStatus, filterOrders } = useOrders();
  const [activeFilter, setActiveFilter] = useState<OrderStatus | undefined>();

  const filteredOrders = filterOrders(activeFilter);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <ThemedView style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                !activeFilter && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(undefined)}
            >
              <ThemedText>All</ThemedText>
            </TouchableOpacity>
            {FILTER_OPTIONS.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  activeFilter === status && styles.activeFilter,
                ]}
                onPress={() => setActiveFilter(status)}
              >
                <ThemedText>{status}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        }
        data={loading ? [] : filteredOrders}
        renderItem={({ item }) => (
          <OrderCard order={item} onStatusUpdate={updateOrderStatus} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={loading ? <OrderCardSkeleton /> : null}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
  },
  filterButton: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#0a7ea4",
  },
  activeFilter: {
    backgroundColor: "#0a7ea4",
  },
});

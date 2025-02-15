import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { OrderStatus } from "../types/order";

const TIMELINE_STEPS: OrderStatus[] = ["pending", "accepted", "delivered"];

interface StatusTimelineProps {
  currentStatus: OrderStatus;
}

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = TIMELINE_STEPS.indexOf(currentStatus);

  return (
    <View style={styles.container}>
      {TIMELINE_STEPS.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === TIMELINE_STEPS.length - 1;

        return (
          <View key={status} style={styles.timelineItem}>
            <View style={styles.statusContainer}>
              <View style={[styles.dot, isCompleted && styles.completedDot]} />
              <ThemedText
                style={[styles.statusText, isCompleted && styles.completedText]}
              >
                {status.replace(/_/g, " ").toUpperCase()}
              </ThemedText>
            </View>
            {!isLast && (
              <View
                style={[styles.line, isCompleted && styles.completedLine]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 150,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E1E9EE",
    marginRight: 8,
  },
  completedDot: {
    backgroundColor: "#0a7ea4",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#E1E9EE",
    marginVertical: 12,
  },
  completedLine: {
    backgroundColor: "#0a7ea4",
  },
  statusText: {
    fontSize: 14,
    color: "#687076",
  },
  completedText: {
    color: "#0a7ea4",
    fontWeight: "600",
  },
});

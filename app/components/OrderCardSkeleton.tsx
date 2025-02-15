import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";

export function OrderCardSkeleton() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <ThemedView style={styles.card}>
      <Animated.View style={[styles.skeleton, styles.title, animatedStyle]} />
      <Animated.View style={[styles.skeleton, styles.text, animatedStyle]} />
      <Animated.View style={[styles.skeleton, styles.text, animatedStyle]} />
      <Animated.View style={[styles.skeleton, styles.status, animatedStyle]} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skeleton: {
    backgroundColor: "#E1E9EE",
    borderRadius: 4,
  },
  title: {
    height: 24,
    width: "40%",
    marginBottom: 12,
  },
  text: {
    height: 16,
    width: "60%",
    marginBottom: 8,
  },
  status: {
    height: 20,
    width: "30%",
    marginTop: 4,
  },
});

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";

interface StatusChangeAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export function StatusChangeAnimation({
  show,
  onComplete,
}: StatusChangeAnimationProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.3);

  useEffect(() => {
    if (show) {
      opacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 200 }, (finished) => {
          if (finished) {
            runOnJS(onComplete)();
          }
        })
      );

      scale.value = withSequence(
        withSpring(1.2),
        withSpring(1),
        withTiming(0.3, { duration: 200 })
      );
    }
  }, [show]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!show) return null;

  return (
    <Animated.View
      style={[styles.container, animatedStyle, { pointerEvents: "none" }]}
    >
      <ThemedText style={styles.text}>✓ Status Updated</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: -25 }],
    backgroundColor: "#0a7ea4",
    padding: 16,
    borderRadius: 8,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});

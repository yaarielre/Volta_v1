import type { ReactNode } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { colors } from "../constants";

interface ScreenWrapperProps {
  children: ReactNode;
  padded?: boolean;
}

export function ScreenWrapper({ children, padded = true }: ScreenWrapperProps) {
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.container, padded && styles.padded]}>{children}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: 24,
  },
});

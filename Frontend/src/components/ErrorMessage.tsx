import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../constants";
import { Button } from "./Button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      {onRetry && <Button title="Reintentar" onPress={onRetry} variant="outline" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  text: {
    ...typography.body,
    color: colors.error,
    textAlign: "center",
  },
});

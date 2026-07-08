import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../constants";

export function Loading({ fullScreen = true }: { fullScreen?: boolean }) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreen: {
    flex: 1,
  },
});

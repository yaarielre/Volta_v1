import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { configureApi } from "./src/services/api";
import { useAuthStore } from "./src/store/authStore";
import { authService } from "./src/services/auth";

configureApi({
  getAccessToken: () => authService.getStoredAccessToken(),
  onUnauthorized: () => useAuthStore.getState().logout(),
});

export default function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

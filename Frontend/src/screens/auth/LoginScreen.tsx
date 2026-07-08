import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../types/navigation";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors, typography, spacing } from "../../constants";
import { useAuth } from "../../hooks/useAuth";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "El email es requerido";
    if (!password) newErrors.password = "La contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin() {
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await login({ email: email.trim(), password });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setServerError(error.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Voltaa</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.form}>
          {serverError ? (
            <Text style={styles.serverError}>{serverError}</Text>
          ) : null}

          <Input
            label="Email"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              setErrors((e) => ({ ...e, email: undefined }));
            }}
            placeholder="tu@email.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Contraseña"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              setErrors((e) => ({ ...e, password: undefined }));
            }}
            placeholder="••••••••"
            secureTextEntry
            error={errors.password}
          />

          <Button
            title="Iniciar sesión"
            onPress={handleLogin}
            loading={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.footerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -1,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  form: {
    gap: spacing.md,
  },
  serverError: {
    ...typography.caption,
    color: colors.error,
    textAlign: "center",
    backgroundColor: colors.error + "15",
    padding: spacing.sm,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footerLink: {
    ...typography.bodyBold,
    color: colors.primary,
  },
});

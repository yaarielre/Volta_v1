import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../types/navigation";
import { ScreenWrapper } from "../../components/ScreenWrapper";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { colors, typography, spacing } from "../../constants";
import { useAuth } from "../../hooks/useAuth";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "El nombre es requerido";
    if (!email.trim()) newErrors.email = "El email es requerido";
    if (password.length < 8) newErrors.password = "Mínimo 8 caracteres";
    if (password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister() {
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setServerError(error.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Únete a Volta</Text>
        </View>

        <View style={styles.form}>
          {serverError ? (
            <Text style={styles.serverError}>{serverError}</Text>
          ) : null}

          <Input
            label="Nombre"
            value={name}
            onChangeText={(t) => { setName(t); setErrors((e) => ({ ...e, name: "" })); }}
            placeholder="Tu nombre"
            autoCapitalize="words"
            error={errors.name}
          />

          <Input
            label="Email"
            value={email}
            onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: "" })); }}
            placeholder="tu@email.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <Input
            label="Contraseña"
            value={password}
            onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: "" })); }}
            placeholder="Mínimo 8 caracteres"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); setErrors((e) => ({ ...e, confirmPassword: "" })); }}
            placeholder="Repite la contraseña"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title="Crear cuenta"
            onPress={handleRegister}
            loading={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Inicia sesión</Text>
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
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
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


import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { login } from '../services/authService';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { colors, spacing, typography } from '../theme/tokens';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }

    try {
      setBusy(true);
      await login(email, password);
    } catch (error) {
      Alert.alert(
        'Login Error',
        error instanceof Error ? error.message : 'Unable to log in.'
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CampusConnect</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton
        title={busy ? 'Signing In...' : 'Sign In'}
        onPress={handleLogin}
        disabled={busy}
      />

      <Link href={"/register" as any} style={styles.link}>
        Create an account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.text,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.mutedText,
    fontSize: typography.body,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  link: {
    textAlign: 'center',
    color: colors.primary,
    marginTop: spacing.lg,
  },
});

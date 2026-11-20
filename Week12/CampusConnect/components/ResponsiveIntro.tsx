
import { useWindowDimensions, StyleSheet, Text, View } from 'react-native';

export function ResponsiveIntro() {
  const { width } = useWindowDimensions();
  const compact = width < 380;

  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <Text style={[styles.heading, compact && styles.compactHeading]}>
        Campus Connect
      </Text>
      <Text>Designed for different phone sizes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 20 },
  compactCard: { padding: 12 },
  heading: { fontSize: 26, fontWeight: '700' },
  compactHeading: { fontSize: 22 },
});

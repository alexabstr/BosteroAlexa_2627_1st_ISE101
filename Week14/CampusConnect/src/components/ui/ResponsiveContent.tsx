
import { useWindowDimensions, View, StyleSheet } from 'react-native';

export function ResponsiveContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 700;

  return (
    <View style={[styles.container, wide && styles.wideContainer]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  wideContainer: {
    maxWidth: 760,
    paddingHorizontal: 24,
  },
});


import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme/tokens';

type StatusBadgeProps = {
  status: 'Pending' | 'Synced' | 'Failed';
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusColor =
    status === 'Synced'
      ? colors.success
      : status === 'Failed'
        ? colors.danger
        : colors.mutedText;

  return (
    <View style={[styles.badge, { borderColor: statusColor }]}>
      <Text style={[styles.label, { color: statusColor }]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: typography.caption,
    fontWeight: '600',
  },
});

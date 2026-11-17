import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function AnnouncementDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Announcement details</Text>
      <Text>Announcement ID: {id ?? 'No ID provided'}</Text>
    </View>
  );
}
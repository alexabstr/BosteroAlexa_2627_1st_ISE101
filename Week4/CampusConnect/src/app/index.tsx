
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Announcement } from '../../types/announcement';
import { getUnreadAnnouncements } from '../../services/announcementUtils';
import AnnouncementPanel from '../../components/AnnouncementPanel';

const sampleAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Enrollment reminders', category: 'Academic', read: false },
  { id: 'a2', title: 'Campus orientation', category: 'Events', read: true },
];

export default function HomeScreen() {
  const unread = getUnreadAnnouncements(sampleAnnouncements);

  return (
    <View style={styles.container}>
      <Image
  source={require('../../assets/images/campus-banner.png')}
  style={styles.banner}
  accessibilityLabel="Campus Connect banner"
/>
      <Text style={styles.title}>Campus Connect</Text>

      <Text style={styles.subtitle}>
        One campus. Connected students.
      </Text>

      <Text style={styles.description}>
        Welcome to the Week 1 project foundation.
      </Text>

      <Text style={styles.sectionTitle}>
        Announcements Utility Test
      </Text>

      <Text style={styles.info}>
        Total announcements: {sampleAnnouncements.length}
      </Text>

      <Text style={styles.info}>
        Unread announcement: {unread.length}
      </Text>

      {unread.map(item => (
        <Text key={item.id} style={styles.announcement}>
          • {item.title}
        </Text>
      ))}

      <AnnouncementPanel />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
  width: '100%',
  height: 150,
  borderRadius: 12,
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F4F7FB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  announcement: {
    fontSize: 15,
    marginTop: 4,
  },
});

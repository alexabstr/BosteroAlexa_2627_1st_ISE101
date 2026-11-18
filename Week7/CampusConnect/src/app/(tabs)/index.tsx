import { Link, router } from 'expo-router';
import { useRef } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import type { Announcement } from '../../../types/announcement';
import { getUnreadAnnouncements } from '../../../services/announcementUtils';
import AnnouncementPanel from '../../../components/AnnouncementPanel';
import { ActionButton } from '../../../components/ActionButton';

const sampleAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Enrollment reminders', category: 'Academic', read: false },
  { id: 'a2', title: 'Campus orientation', category: 'Events', read: true },
];

export default function HomeScreen() {
 const unread = getUnreadAnnouncements(sampleAnnouncements);
 const scrollViewRef = useRef<React.ElementRef<typeof ScrollView> | null>(null);

  return (
<ScrollView
  style={styles.screen}
  contentContainerStyle={styles.container}
>
      <Text style={styles.title}>Campus Announcements</Text>

      <Text style={styles.subtitle}>
        Stay updated with the latest campus news.
      </Text>

   <ActionButton
  label="View All Announcements"
  onPress={() =>
    scrollViewRef.current?.scrollTo({
      y: 350,
      animated: true,
    })
  }
/>

      <Image
        source={require('../../../assets/images/school-seal.png')}
        style={styles.seal}
        accessibilityLabel="Santa Rita College of Pampanga school seal"
      />

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
<Link href={"/announcements/101" as any} asChild>
  <Pressable>
    <Text style={{ color: "blue", textDecorationLine: "underline" }}>
      Open announcement
    </Text>
  </Pressable>
</Link>

<Link href={"/profile" as any} asChild>
  <Pressable>
    <Text style={{ color: "blue", textDecorationLine: "underline" }}>
      Open Student Profile
    </Text>
  </Pressable>
</Link>
<Pressable onPress={() => router.push('/announcements/101')}>
  <Text style={{ color: "blue", textDecorationLine: "underline" }}>
    View details
  </Text>
</Pressable>
<Link href={"/announcements/submit" as any} asChild>
  <Pressable>
    <Text style={{ color: "blue", textDecorationLine: "underline" }}>
      Submit Announcement
    </Text>
  </Pressable>
</Link>
      <AnnouncementPanel />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
    textAlign: 'center',
  },
  seal: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginTop: 24,
    marginBottom: 16,
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

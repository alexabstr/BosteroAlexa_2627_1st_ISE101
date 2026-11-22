
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

export function LocalNotificationButton() {
  const [message, setMessage] = useState('No reminder scheduled');

  async function scheduleReminder() {
    try {
      const permission =
        await Notifications.getPermissionsAsync();

      let finalStatus = permission.status;

      if (finalStatus !== 'granted') {
        const requested =
          await Notifications.requestPermissionsAsync();

        finalStatus = requested.status;
      }

      if (finalStatus !== 'granted') {
        setMessage(
          'Notification permission was not granted. You can continue without reminders.'
        );
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'CampusConnect Reminder',
          body: 'You have a task reminder!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });

      setMessage('Local reminder scheduled successfully.');
    } catch {
      setMessage('Unable to schedule reminder. Please try again.');
    }
  }

  return (
    <View>
      <Button
        title="Set Reminder"
        onPress={() => void scheduleReminder()}
      />

      <Text accessibilityLiveRegion="polite">
        {message}
      </Text>
    </View>
  );
}

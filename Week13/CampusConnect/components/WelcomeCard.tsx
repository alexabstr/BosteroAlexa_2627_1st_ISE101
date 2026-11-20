
import { Text, View } from 'react-native';

type WelcomeCardProps = {
  title: string;
  message: string;
};

export function WelcomeCard({ title, message }: WelcomeCardProps) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{message}</Text>
    </View>
  );
}

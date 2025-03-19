import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import ChatBox from '@/components/ChatBox';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Tab</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* aEditScreenInfo path="app/(tabs)/two.tsx" /> */}
      <ChatBox
        isUser={true}
        text={'Hello User, this is the AI. This message was create in collaboration with Badri and friends!<br />You can ask me any question and I will try my best to give you a satisfactory answer.'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

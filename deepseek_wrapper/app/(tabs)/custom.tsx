import { Alert, Button, Dimensions, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import ChatBox from '@/components/ChatBox';

const doSomething = () => {
  Alert.alert('button pressed');
}

export default function ChatView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Tab</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* aEditScreenInfo path="app/(tabs)/two.tsx" /> */}
      <ChatBox
        isUser={false}
        text={'Hello User, this is the AI. This message was create in collaboration with Badri and friends!<br />You can ask me any question and I will try my best to give you a satisfactory answer.'}
      />

      <ChatBox
        isUser={true}
        text={'Hello lk;jasldkfj'}
      />
      <View style={styles.button}>
        <Button
          onPress={doSomething}
          title="button"
          color='red'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
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
  button: { alignItems: 'flex-end', }
});

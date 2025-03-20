import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ChatBoxProps {
  text: string;
  isUser: boolean;
}
const ChatBox: React.FC<ChatBoxProps> = ({ text, isUser }) => {
  return (
    <View style={isUser ? styles.containerRight : styles.containerLeft}>
      <Text style={styles.text}>{text}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  containerRight: {
    backgroundColor: 'grey', // Blue color for chat bubble
    padding: 18,
    borderRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 0, // Makes a chat bubble shape
    maxWidth: '70%', // Adjusts size relative to screen width
    alignSelf: 'flex-end', // Aligns the bubble to the right
    marginRight: '5%',
    marginVertical: 20,
  },
  containerLeft: {
    backgroundColor: 'grey', // Blue color for chat bubble
    padding: 18,
    borderRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 16, // Makes a chat bubble shape
    maxWidth: '70%', // Adjusts size relative to screen width
    alignSelf: 'flex-start', // Aligns the bubble to the right
    marginLeft: '5%',
    marginVertical: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
});

export default ChatBox;

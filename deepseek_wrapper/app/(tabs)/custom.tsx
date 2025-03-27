import { Button, Dimensions, ScrollView, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';
import ChatBox from '@/components/ChatBox';
import { useEffect, useRef, useState } from 'react';

export default function ChatView() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { isUser: false, text: "Hello User, this is the AI.This message was created in collaboration with Badri and friends! You can ask me any question and I will try my best to give you a satisfactory answer." }
  ]);

  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.addEventListener('keydown', handleKeyPress);
    }
  }, []);

  const handleSend = () => {
    if (query.trim()) {
      setMessages([...messages, { isUser: true, text: query }]);
      setQuery('');
      console.log(messages);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Window</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <ChatBox key={index} isUser={msg.isUser} text={msg.text} />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <Button title="Send" onPress={handleSend} color="red" />
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
  button: { alignItems: 'flex-end', }, chatContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'white',
  },
});

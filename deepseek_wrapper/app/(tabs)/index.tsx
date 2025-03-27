import { Button, Dimensions, ScrollView, StyleSheet, TextInput } from 'react-native';
import { View } from '@/components/Themed';
import ChatBox from '@/components/ChatBox';
import { useEffect, useRef, useState } from 'react';

export default function ChatView() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    { isUser: false, text: "Hello User, this is the AI.This message was created in collaboration with Murthy and friends! You can ask me any question and I will try my best to give you a satisfactory answer." }
  ]);

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

  const handleSend = async () => {
    if (query.trim()) {
      setMessages([...messages, { isUser: true, text: query }]);
      await askQuery();
      setQuery('');
      console.log(messages);
    }
  }

  const handleScrollDown = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const askQuery = async () => {
    setMessages((prevMessages) => [...prevMessages, { isUser: false, text: "" }]);

    const responseStream = await fetch("http://localhost:3000/ask-query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query }),
    });

    if (!responseStream?.body) {
      console.log("response Stream is null");
      return;
    }

    const reader = responseStream.body.getReader();
    const decoder = new TextDecoder();

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const lastMessageIndex = updatedMessages.length - 1;

      const processChunk = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[lastMessageIndex] = {
              ...newMessages[lastMessageIndex],
              text: newMessages[lastMessageIndex].text + chunk,
            };
            return newMessages;
          });
          handleScrollDown();
        }
      };

      processChunk();
      return updatedMessages;
    });
  };

  return (
    <View style={styles.container}>

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={handleScrollDown}
        style={styles.chatContainer}
      >
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
  top: {
    position: 'sticky',
    top: 0,
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

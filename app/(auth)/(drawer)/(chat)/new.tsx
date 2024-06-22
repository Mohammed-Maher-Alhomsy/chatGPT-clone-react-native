import { useState } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { Message } from "@/utils/interfaces";
import { defaultStyles } from "@/constants/Styles";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import HeaderDropDown from "@/components/HeaderDropDown";

const Page = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState("3.5");
  const [messages, setMessages] = useState<Message[]>([]);

  const getCompletion = (message: string) => {
    console.log(message);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () =>
            Platform.OS === "android" ? (
              <HeaderDropDown
                title="ChatGPT"
                onSelect={(key) => setGptVersion(key)}
                selected={gptVersion}
                items={[
                  { key: "3.5", title: "GPT-3.5", icon: "bolt" },
                  { key: "4", title: "GPT-4", icon: "sparkles" },
                ]}
              />
            ) : undefined,
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <Button title="Sign out" onPress={() => signOut()} />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onSouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  item: {},
});

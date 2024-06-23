import { useState } from "react";
import {
  View,
  Image,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { Redirect, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useMMKVString } from "react-native-mmkv";

import { storage } from "@/utils/Storage";
import { Message, Role } from "@/utils/interfaces";
import { defaultStyles } from "@/constants/Styles";
import ChatMessage from "@/components/ChatMessage";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import HeaderDropDown from "@/components/HeaderDropDown";

const DUMMY_MESSAGES: Message[] = [
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
  {
    role: Role.Bot,
    content: "HEllo, how can I help you today?",
  },
  {
    role: Role.User,
    content:
      "I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app. I need help with my React Native app.",
  },
];

const Page = () => {
  const [key, setKey] = useMMKVString("apiKey", storage);
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [organization, setOrganization] = useMMKVString("org", storage);
  const [gptVersion, setGptVersion] = useMMKVString("gptVersion", storage);

  if (!key || !organization || key === "" || organization === "") {
    return <Redirect href="/(auth)/(modal)/settings" />;
  }

  const getCompletion = (message: string) => {
    console.log(message);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="ChatGPT"
              onSelect={(key) => setGptVersion(key)}
              selected={gptVersion}
              items={[
                { key: "3.5", title: "GPT-3.5", icon: "bolt" },
                { key: "4", title: "GPT-4", icon: "sparkles" },
              ]}
            />
          ),
        }}
      />

      <View
        style={
          messages.length !== 0
            ? { flex: 1 }
            : { flex: 1, justifyContent: "center", alignItems: "center" }
        }
      >
        {messages.length === 0 && (
          <View style={styles.logoContainer}>
            <Image
              style={styles.image}
              source={require("@/assets/images/logo-white.png")}
            />
          </View>
        )}

        {messages.length > 0 && (
          <FlashList
            data={messages}
            estimatedItemSize={400}
            keyboardDismissMode="on-drag"
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <ChatMessage {...item} />}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 30 }}
          />
        )}
      </View>

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
  logoContainer: {
    width: 50,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 50,
  },

  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
});

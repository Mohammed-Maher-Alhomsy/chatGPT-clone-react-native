import { Image, StyleSheet, Text, View } from "react-native";

import { Message, Role } from "@/utils/interfaces";

const ChatMessage = ({ content, role, imageUrl, prompt }: Message) => {
  return (
    <View style={styles.row}>
      {role === Role.Bot ? (
        <View style={styles.item}>
          <Image
            style={styles.btnImage}
            source={require("@/assets/images/logo-white.png")}
          />
        </View>
      ) : (
        <Image
          style={styles.avatar}
          source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
        />
      )}

      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  row: {
    gap: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    marginVertical: 10,
  },

  item: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  btnImage: {
    backgroundColor: "#000",
    margin: 6,
    width: 16,
    height: 16,
  },

  text: {
    flex: 1,
    padding: 4,
    fontSize: 16,
    flexWrap: "wrap",
  },
});

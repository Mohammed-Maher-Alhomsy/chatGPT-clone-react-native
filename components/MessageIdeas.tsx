import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Colors from "@/constants/Colors";

const PredefinedMessages = [
  { title: "Explain React Native", text: "like I'm five years old" },
  {
    title: "Suggest fun activites",
    text: "for a family visting San Francisco",
  },
  { title: "Recommend a dish", text: "to impress a date who's a picky eater" },
];

type Props = {
  onSelectCard: (message: string) => void;
};

const MessageIdeas = ({ onSelectCard }: Props) => {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 16,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {PredefinedMessages.map(({ text, title }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onSelectCard(`${title} ${text}`)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
            <Text style={{ fontSize: 14, color: Colors.grey }}>{text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MessageIdeas;

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: Colors.input,
  },
});

import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";

import Animated, {
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";

type Props = {
  onSouldSendMessage: (message: string) => void;
};

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const MessageInput = ({ onSouldSendMessage }: Props) => {
  const expanded = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState("");

  const expandItem = () => {
    expanded.value = withTiming(1, { duration: 400 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
  };

  const onChangeText = (message: string) => {
    collapseItems();
    setMessage(message);
  };

  const onSend = () => {
    onSouldSendMessage(message);
    setMessage("");
  };

  const expandedStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP
    );

    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );

    return {
      opacity: expanded.value,
      width: widthInterpolation,
    };
  });

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === ImagePicker.PermissionStatus.GRANTED) {
      await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
  };

  return (
    <View style={{ paddingBottom: bottom + 5, paddingTop: 10 }}>
      <View style={styles.row}>
        <ATouchableOpacity
          onPress={expandItem}
          style={[styles.roundBtn, expandedStyle]}
        >
          <Ionicons name="add" size={24} color={Colors.grey} />
        </ATouchableOpacity>

        <Animated.View style={[styles.buttonView, buttonViewStyle]}>
          <TouchableOpacity onPress={pickImageFromCamera}>
            <Ionicons name="camera-outline" size={30} color={Colors.grey} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => ImagePicker.launchImageLibraryAsync()}
          >
            <Ionicons name="image-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
            <Ionicons name="folder-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </Animated.View>

        <TextInput
          autoFocus
          multiline
          value={message}
          placeholder="Message"
          placeholderTextColor="black"
          onFocus={collapseItems}
          onChangeText={onChangeText}
          style={styles.messageInput}
        />

        {message.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
            <Ionicons name="arrow-up-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={24} color={Colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.input,
  },

  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: Colors.greyLight,
    backgroundColor: Colors.light,
  },

  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

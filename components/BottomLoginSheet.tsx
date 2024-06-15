import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]}>
        <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
        <Ionicons
          name="logo-google"
          size={16}
          style={styles.btnIcon}
          color="#fff"
        />
        <Text style={styles.btnDarkText}>Continue with Apple</Text>
      </TouchableOpacity>

      <Link
        asChild
        style={[defaultStyles.btn, styles.btnDark]}
        href={{ pathname: "/login", params: { type: "register" } }}
      >
        <TouchableOpacity>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color="#fff" />
          <Text style={styles.btnDarkText}>Sign in with email</Text>
        </TouchableOpacity>
      </Link>

      <Link
        asChild
        style={[defaultStyles.btn, styles.btnDark]}
        href={{ pathname: "/login", params: { type: "login" } }}
      >
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default BottomLoginSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    padding: 26,
    gap: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  btnLight: {
    backgroundColor: "white",
  },

  btnIcon: {
    paddingRight: 7,
  },

  btnLightText: {
    fontSize: 20,
  },

  btnDark: {
    backgroundColor: Colors.grey,
  },

  btnDarkText: {
    color: "#fff",
    fontSize: 20,
  },

  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
});

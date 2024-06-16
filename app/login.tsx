import { useState } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("maher@gmail.com");

  const onSignUpPress = async () => {};
  const onSignInPress = async () => {};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={70}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      <Image
        style={styles.logo}
        source={require("../assets/images/logo-dark.png")}
      />

      <Text style={styles.title}>
        {type === "login" ? "Welcome back" : "Create your account"}
      </Text>

      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          placeholder="Email"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />

        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {type === "login" ? (
        <TouchableOpacity
          onPress={onSignInPress}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Log in</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onSignUpPress}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Create account</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  logo: {
    width: 60,
    height: 60,
    marginVertical: 80,
    alignSelf: "center",
  },

  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },

  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },

  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },

  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
  },
});

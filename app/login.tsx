import { useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  useSignIn,
  useSignUp,
  isClerkAPIResponseError,
} from "@clerk/clerk-expo";
import { useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const {
    signUp,
    isLoaded: signUpLoaded,
    setActive: signupSetActive,
  } = useSignUp();

  const { signIn, isLoaded, setActive } = useSignIn();

  const onSignUpPress = async () => {
    if (!signUpLoaded) return;

    setLoading(true);

    try {
      const result = await signUp.create({ emailAddress, password });

      console.log("Sign Up Result : ", result);

      signupSetActive({
        session: result.createdSessionId,
      });
    } catch (error) {
      console.log("Sign Up Error : ", error);

      if (isClerkAPIResponseError(error)) {
        Alert.alert(error.errors[0].message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      console.log("Sign In Result : ", result);

      setActive({
        session: result.createdSessionId,
      });
    } catch (error) {
      console.log("Sign Up Error : ", error);

      if (isClerkAPIResponseError(error)) {
        Alert.alert(error.errors[0].message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 0}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
            keyboardType="email-address"
            placeholder="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />

          <TextInput
            value={password}
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            style={styles.inputField}
            onChangeText={setPassword}
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
      </ScrollView>
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

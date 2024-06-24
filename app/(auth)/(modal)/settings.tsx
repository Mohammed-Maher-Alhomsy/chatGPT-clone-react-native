import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useMMKVString } from "react-native-mmkv";

import Colors from "@/constants/Colors";
import { storage } from "@/utils/Storage";
import { defaultStyles } from "@/constants/Styles";

const Page = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const [org, setOrg] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [key, setKey] = useMMKVString("apiKey", storage);
  const [organization, setOrganization] = useMMKVString("org", storage);

  const saveApiKey = async () => {
    setKey(apiKey);
    setOrganization(org);
    router.push("/(auth)/(drawer)/(chat)/new");
  };

  const removeApiKey = () => {};

  return (
    <View style={styles.container}>
      {key && key !== "" && (
        <>
          <Text style={styles.label}>You are all set!</Text>
          <TouchableOpacity
            onPress={() => removeApiKey()}
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
          >
            <Text style={styles.buttonText}>Remove API Key</Text>
          </TouchableOpacity>
        </>
      )}

      {(!key || key === "") && (
        <>
          <Text style={styles.label}>API Key & Organization:</Text>

          {/* <TouchableOpacity
            onPress={() => removeApiKey()}
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
          >
            <Text style={styles.buttonText}>Remove API Key</Text>
          </TouchableOpacity> */}

          <TextInput
            style={styles.input}
            defaultValue={key}
            onChangeText={setApiKey}
            placeholder="Enter your API key"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            defaultValue={organization}
            onChangeText={setOrg}
            placeholder="Your organization"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={saveApiKey}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.signoutBtn} onPress={() => signOut()}>
        <Text style={styles.signoutBtnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: Colors.primary,
  },

  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  signoutBtn: {
    backgroundColor: "#C80036",
    alignSelf: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 7,
  },

  signoutBtnText: {
    color: "#fff",
    fontSize: 16,
  },
});

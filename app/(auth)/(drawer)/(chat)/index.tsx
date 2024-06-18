import { Button, SafeAreaView, StyleSheet, Text } from "react-native";

import { useAuth } from "@clerk/clerk-expo";

const Page = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={{ padding: 30 }}>
      <Text>Page</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});

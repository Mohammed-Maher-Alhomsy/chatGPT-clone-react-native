import { StyleSheet, Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});

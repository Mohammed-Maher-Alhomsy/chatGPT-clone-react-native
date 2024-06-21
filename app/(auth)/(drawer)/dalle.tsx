import { Platform, StyleSheet, View } from "react-native";

import { Stack } from "expo-router";

import { defaultStyles } from "@/constants/Styles";
import HeaderDropDown from "@/components/HeaderDropDown";

const Page = () => {
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () =>
            Platform.OS === "android" ? (
              <HeaderDropDown
                title="Dall.E"
                onSelect={(key) => {}}
                items={[
                  {
                    key: "share",
                    title: "Share GPT",
                    icon: "square.and.arrow.up",
                  },
                  { key: "details", title: "See Details", icon: "info.circle" },
                  { key: "keep", title: "Keep in Sidebar", icon: "pin" },
                ]}
              />
            ) : undefined,
        }}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});

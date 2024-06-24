import { TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerBackVisible: false }}>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false, statusBarColor: "#222" }}
      />

      <Stack.Screen
        name="(modal)/settings"
        options={{
          presentation: "modal",
          headerTitle: "Settings",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.selected },
          headerRight: () => (
            <>
              {router.canGoBack() && (
                <TouchableOpacity onPress={() => router.replace("explore")}>
                  <Ionicons
                    name="close-circle-outline"
                    size={28}
                    color="#000"
                  />
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;

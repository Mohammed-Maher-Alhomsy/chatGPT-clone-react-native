import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerBackVisible: false }}>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false, statusBarColor: "#222" }}
      />
    </Stack>
  );
};

export default Layout;

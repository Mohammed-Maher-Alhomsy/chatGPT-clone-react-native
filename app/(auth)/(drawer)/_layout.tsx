import { StyleSheet } from "react-native";

import { Drawer } from "expo-router/drawer";

const Layout = () => {
  return (
    <Drawer>
      <Drawer.Screen name="explore" />
      <Drawer.Screen name="(chat)/index" options={{ drawerLabel: "Chat" }} />
      <Drawer.Screen name="dalle" options={{ drawerLabel: "Chat" }} />
    </Drawer>
  );
};

export default Layout;

const styles = StyleSheet.create({});

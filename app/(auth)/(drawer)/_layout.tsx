import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Drawer } from "expo-router/drawer";
import { Link, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import CustomDrawerContent from "@/components/CustomDrawerContent";

const Layout = () => {
  const navigation = useNavigation();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <FontAwesome6
              name="grip-lines"
              size={28}
              color={Colors.grey}
              style={{ marginLeft: 16 }}
            />
          </TouchableOpacity>
        ),
        headerShadowVisible: false,
        drawerStyle: { width: "86%" },
        overlayColor: "rgba(0, 0, 0,0.3)",
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -18 },
        drawerActiveBackgroundColor: Colors.selected,
        headerStyle: { backgroundColor: Colors.light },
      }}
    >
      <Drawer.Screen
        name="(chat)/new"
        getId={() => Math.random().toString()}
        options={{
          title: "ChatGPT",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
              <Image
                style={styles.btnImage}
                source={require("@/assets/images/logo-white.png")}
              />
            </View>
          ),

          headerRight: () => (
            <Link
              push
              asChild
              style={{ marginRight: 10 }}
              href="/(auth)/(drawer)/(chat)/new"
            >
              <TouchableOpacity>
                <Ionicons name="create-outline" size={24} color={Colors.grey} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Drawer.Screen
        name="dalle"
        options={{
          title: "Dalle.E",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
              <Image
                style={styles.dallEImage}
                source={require("@/assets/images/dalle.png")}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="explore"
        options={{
          title: "Explore GPTs",
          drawerIcon: () => (
            <View style={[styles.exploreItem]}>
              <Ionicons name="apps-outline" size={18} color="#000" />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

export default Layout;

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },

  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },

  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: "cover",
  },

  exploreItem: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

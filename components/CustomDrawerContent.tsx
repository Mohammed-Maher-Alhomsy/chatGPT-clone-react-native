import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";

const CustomDrawerContent = (props: any) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, marginLeft: top, marginTop: 7 }}>
      <View style={{ paddingBottom: 16 }}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name="search" />
          <TextInput style={styles.input} placeholder="Search..." />
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{ padding: 16, paddingBottom: bottom }}>
        <Link href="/(auth)/(modal)/settings" asChild push>
          <TouchableOpacity style={styles.footer}>
            <Image
              style={styles.avatar}
              source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
            />

            <Text style={styles.username}>Mika Meerkat</Text>
            <Ionicons
              size={24}
              color={Colors.greyLight}
              name="ellipsis-horizontal"
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.input,
    borderRadius: 10,
    height: 34,
  },

  searchIcon: {
    padding: 6,
  },

  input: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 8,
    paddingVertical: 8,
    color: "#242424",
    alignItems: "center",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },

  username: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
});

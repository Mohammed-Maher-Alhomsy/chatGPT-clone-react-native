import { StyleSheet, Text, View } from "react-native";

import * as DropdownMenu from "zeego/dropdown-menu";

import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

type Props = {
  title: string;
  selected?: string;
  onSelect: (key: string) => void;
  items: { key: string; title: string; icon: string }[];
};

const HeaderDropDown = ({ title, selected, items, onSelect }: Props) => {
  return (
    <DropdownMenu.Root style={defaultStyles.pageContainer}>
      <DropdownMenu.Trigger>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
          {selected && (
            <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                fontWeight: "500",
                color: Colors.greyLight,
              }}
            >
              {selected} &gt;
            </Text>
          )}
        </View>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {items.map((item) => (
          <DropdownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>

            <DropdownMenu.ItemIcon
              ios={{
                name: item.icon,
                pointSize: 18,
              }}
            />
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default HeaderDropDown;

const styles = StyleSheet.create({});

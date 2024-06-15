import { View } from "react-native";

import AnimatedIntro from "@/components/AnimatedIntro";
import BottomLoginSheet from "@/components/BottomLoginSheet";

const Page = () => {
  return (
    <View style={{ flex: 1 }}>
      <AnimatedIntro />
      <BottomLoginSheet />
    </View>
  );
};

export default Page;

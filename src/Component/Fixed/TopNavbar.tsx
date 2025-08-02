import React from "react";
import { View, Image, Dimensions, Text, Pressable } from "react-native";

const { width, height } = Dimensions.get("window");

const TopNavbar = () => {
  return (
    <View className="w-full bg-white h-[8%] flex flex-row justify-start px-5" style={{ elevation: 10 }}>
      <Image
        source={require("../../../assets/adaptive-icon.png")}
        style={{
          width: width * 0.1, // add width
          height: height * 0.05, // 30% of screen height
          resizeMode: "contain",
        }} className="my-auto"/>
    </View>
  );
};

export default TopNavbar;

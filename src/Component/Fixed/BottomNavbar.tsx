import React, { useState } from "react";
import { View, Dimensions, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useAppNavigation } from "../../TS Logic/routesInterface";
import { useRoute } from "@react-navigation/native";

const BottomNavbar = () => {
  const navigation = useAppNavigation(); // ✅ no type boilerplate
  const route = useRoute();


  return (
    <>
      <View className="w-full bg-white h-[13%]  px-5 pb-10" style={style.bottomNavbar}>
        <View className="my-auto flex flex-row justify-around">

          <Pressable className="my-auto" onPress={() => navigation.navigate("addDataForm")}>
            <FontAwesome name="money" size={route.name === 'addDataForm' ? 25 : 20} color={route.name === 'addDataForm' ? '#55a630' : '#9999a1'} />
          </Pressable>

          <Pressable className="my-auto" onPress={() => navigation.navigate("notepad")}>
            <FontAwesome5 name="sticky-note" size={route.name === 'notepad' ? 25 : 20} solid color={route.name === 'notepad' ? '#55a630' : '#9999a1'} />
          </Pressable>


          <Pressable className="my-auto" onPress={() => navigation.navigate("list")}>
            <FontAwesome name="list" size={route.name === 'list' ? 25 : 20} color={route.name === 'list' ? '#55a630' : '#9999a1'} />
          </Pressable>


          <Pressable className="my-auto" onPress={() => navigation.navigate("allRecords")}>
            <FontAwesome5 name="calendar-alt" size={route.name === 'allRecords' ? 25 : 20} color={route.name === 'allRecords' ? '#55a630' : '#9999a1'} />
          </Pressable>


          <Pressable className="my-auto" onPress={() => navigation.navigate("userProfile")}>
            <FontAwesome name="user" size={route.name === 'userProfile' ? 25 : 20} color={route.name === 'userProfile' ? '#55a630' : '#9999a1'} />
          </Pressable>

        </View>
      </View>

    </>
  );
};

const style = StyleSheet.create({
  bottomNavbar: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white", // important for shadow to render
    elevation: 10,
    borderTopColor: "#212121",
    borderTopWidth: 3,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

export default BottomNavbar;

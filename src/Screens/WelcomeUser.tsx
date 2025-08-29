import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "react-native";
import TopNavbar from "../Component/Fixed/TopNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppNavigation } from "../TS Logic/routesInterface";
import { RFPercentage } from "react-native-responsive-fontsize";
import commonFontSizeStyles from "../CSS/commonStyleSheet";

const NameInsert = () => {
    const [userName, setUserName] = useState<string | null>("");

    const navigation = useAppNavigation(); // ✅ no type boilerplate


    useEffect(() => {
        async function getUserName() {
            const uName = await AsyncStorage.getItem("userName");
            setUserName(uName);
        }

        getUserName();
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <TopNavbar />
            <View className="h-[80%] flex items-center justify-center">
                <View className="w-[90%] px-4">
                    <Text style={{ fontSize: Math.max(Math.min(RFPercentage(2.5), 25), 18) }}>𝑯𝒊 ,</Text>
                    <Text className="font-extrabold text-3xl italic pt-2">
                        {userName}
                    </Text>
                    <Text className="font-extrabold italic pt-2" style={{ fontSize: Math.max(Math.min(RFPercentage(2.5), 25), 18) }}>
                        𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒃𝒂𝒄𝒌 , 𝑻𝒓𝒂𝒄𝒌 𝒀𝒐𝒖𝒓 𝑬𝒙𝒑𝒆𝒏𝒔𝒆 💰💰💰
                    </Text>
                </View>
            </View>
            <View className="h-[10%] w-[90%] px-5 m-auto">
                <Pressable className="py-4 bg-red-600 w-[100%] rounded-3xl"
                    onPress={() => navigation.navigate("addDataForm")}
                >
                    <Text className="text-center text-white font-bold" style={commonFontSizeStyles.commonButtonSize}>
                        Lets Record Your Expenses
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default NameInsert;

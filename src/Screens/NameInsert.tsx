import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, View, Dimensions } from 'react-native'
import TopNavbar from '../Component/Fixed/TopNavbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputBox from '../Component/Common/InputBox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { toastHelperCallingFunc } from '../Component/Common/ToastComponent'
import { useAppNavigation } from "../TS Logic/routesInterface";

const NameInsert = () => {
    const { width, height } = Dimensions.get("window");
    const [userName, setUserName] = useState("");
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const navigation = useAppNavigation(); // ✅ no type boilerplate

    const setStorageDataFunction = async () => {
        if (userName.trim() == "") {
            toastHelperCallingFunc({
                type: 'error',
                text1: 'Check Blank Fields',
                text2: 'Enter Username',
            });
            return;
        }
        //
        else if (selectedGender == null) {
            toastHelperCallingFunc({
                type: 'error',
                text1: 'Check Blank Fields',
                text2: 'Select Gender',
            })
            return;
        }

        await AsyncStorage.setItem("userName", userName);
        await AsyncStorage.setItem("gender", selectedGender);
        navigation.navigate("addDataForm");
    }


    useEffect(() => {
        async function getData() {
            const userName = await AsyncStorage.getItem("userName");
            const userGender = await AsyncStorage.getItem("gender");

            setUserName(userName || "");
            setSelectedGender(userGender || null);
        }
        getData();
    }, []);
    return (
        <SafeAreaView className="flex-1">
            <TopNavbar />
            <View className="flex-1 items-center justify-center bg-white">
                <View className="w-[90%] max-w-md px-4">
                    {/* Input */}
                    <Text className="text-lg font-bold mb-2">Enter Item Name :</Text>
                    <InputBox
                        placeholder="Enter item name"
                        value={userName}
                        onChangeText={setUserName}
                    />

                    {/* Gender Selection */}
                    <View className="flex-row justify-between py-8 space-x-3">
                        {/* Male */}
                        <Pressable onPress={() => setSelectedGender("male")} className={`flex-1 p-4 rounded-3xl flex-row items-center border-2 me-2 ${selectedGender === "male" ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                        >
                            <Image source={require("../../assets/manlogo.png")} className="w-8 h-8 mr-3" resizeMode="contain" />
                            <Text className="text-lg font-bold">Male</Text>
                        </Pressable>

                        {/* Female */}
                        <Pressable onPress={() => setSelectedGender("female")} className={`flex-1 p-4 rounded-3xl flex-row items-center border-2 ms-2 ${selectedGender === "female" ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                        >
                            <Image source={require("../../assets/femalelogo.png")} className="w-8 h-8 mr-3" resizeMode="contain" />
                            <Text className="text-lg font-bold">Female</Text>
                        </Pressable>
                    </View>

                    {/* Save Button */}
                    <View className="mt-4">
                        <Pressable className="py-4 bg-red-600 rounded-3xl" onPress={setStorageDataFunction}>
                            <Text className="text-center text-white font-bold text-2xl">Save Data</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NameInsert
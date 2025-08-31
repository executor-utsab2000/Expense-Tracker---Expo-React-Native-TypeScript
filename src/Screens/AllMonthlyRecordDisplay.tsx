import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProjectLayout from "../Component/Layout/ProjectLayout";
import { FontAwesome5 } from "@expo/vector-icons";
import { toastHelperCallingFunc } from "../Component/Common/ToastComponent";
import Component_AllRecordsModel from "./Component_AllRecordsModel";
import commonFontSizeStyles from "../CSS/commonStyleSheet";
import TabsContainer from "../Component/Common/TabsContainer";
import saveAsPdf from "../TS Logic/saveAsPdf";

const AllMonthlyRecordDisplay = () => {
    const [allData, setAllData] = useState<any>(null);
    const [showModel, setShowModel] = useState<boolean>(true);
    const [modelData, setModelData] = useState<any>(null);


    function getModelData(modelId: any) {
        const modelData = allData.find((elm: any) => elm.id == modelId);
        const total = modelData.todos.reduce((sum: number, elm: any) => sum + Number(elm.amount), 0);
        setModelData({ ...modelData, total });
        setShowModel(true);
    }

    function getDataById(modelId: any) {
        const todoData = allData.find((elm: any) => elm.id == modelId);
        saveAsPdf(todoData)
    }


    async function deleteModelDataById(id: any, title: any) {
        const newRecordData = allData.filter((elm: any) => elm.id != id);
        setAllData(newRecordData);
        setShowModel(false);
        toastHelperCallingFunc({
            type: "success",
            text1: "Record Deleted",
            text2: `Record Deleated for ${title}`,
        });
        await AsyncStorage.setItem("allTodoList", JSON.stringify(newRecordData));
        // console.log(id);
    }



    useEffect(() => {
        async function getAllData() {
            let storedAllTodoList = await AsyncStorage.getItem("allTodoList");
            // console.log(storedAllTodoList);

            if (storedAllTodoList != null) {
                storedAllTodoList = JSON.parse(storedAllTodoList);
                if (Array.isArray(storedAllTodoList)) {
                    setAllData(storedAllTodoList);
                } else {
                    setAllData([]);
                }
            }
            else {
                setAllData([]);
            }
        }

        getAllData();
    }, []);



    return (
        <>
            <ProjectLayout>
                <ScrollView className="flex-1 px-5 my-8">
                    {allData && allData.length > 0 ? (
                        allData.map((elm: any, index: number) => (

                            <Pressable key={index} onPress={() => { getModelData(elm.id) }}>
                                <TabsContainer>
                                    <View className="flex flex-row justify-between">
                                        <View>
                                            <Text className="mb-5" style={commonFontSizeStyles.commonHeaderFontSize}>{elm.title}</Text>
                                            <Text className="font-extrabold" style={commonFontSizeStyles.commonTextContent}>Monthly Budget : <Text className="text-red-600 font-bold ">₹ 2000 /-</Text> </Text>
                                            <Text className="font-extrabold" style={commonFontSizeStyles.commonTextContent}>Total Spent :  <Text className="text-red-600 font-bold ">₹ 2000 /-</Text> </Text>
                                            <Text className="font-extrabold" style={commonFontSizeStyles.commonTextContent}>Remaining Amount :  <Text className="text-red-600 font-bold ">₹ 2000 /-</Text> </Text>
                                        </View>
                                        <View className="my-auto">
                                            <Pressable>
                                                <Text className="color-[#3a86ff] text-center" style={commonFontSizeStyles.commonButtonSize}>View Details</Text>
                                            </Pressable>
                                            <Pressable className="px-3 py-2 mt-2 bg-green-600 rounded-xl" style={{ elevation: 5 }} onPress={() => getDataById(elm.id)}>
                                                <Text className="text-white" style={commonFontSizeStyles.commonButtonSize}>Save as PDF</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </TabsContainer>
                            </Pressable>

                        ))
                    ) : (
                        <Text className="text-center text-gray-500 mt-10">
                            Month wise records will be added on 1st of every Month.
                        </Text>
                    )}
                </ScrollView>
            </ProjectLayout>

            <Component_AllRecordsModel
                modelDataById={modelData}
                setShowModel={() => setShowModel(false)}
                showModel={showModel}
                deleteModelDataByIdFunction={() => deleteModelDataById(modelData.id, modelData.title)}
            />
        </>
    );
};

export default AllMonthlyRecordDisplay;

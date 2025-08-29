import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProjectLayout from "../Component/Layout/ProjectLayout";
import { FontAwesome5 } from "@expo/vector-icons";
import { toastHelperCallingFunc } from "../Component/Common/ToastComponent";
import Component_AllRecordsModel from "./Component_AllRecordsModel";
import commonFontSizeStyles from "../CSS/commonStyleSheet";

const AllMonthlyRecordDisplay = () => {
    const [allData, setAllData] = useState<any>(null);
    const [showModel, setShowModel] = useState<boolean>(true);
    const [modelData, setModelData] = useState<any>(null);


    function getModelData(modelId: any) {
        // console.log(modelId);

        const modelData = allData.find((elm: any) => elm.id == modelId);

        const total = modelData.todos.reduce((sum: number, elm: any) => sum + Number(elm.amount), 0);
        setModelData({ ...modelData, total });
        setShowModel(true);
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
                <ScrollView className="flex-1 px-5">
                    {allData && allData.length > 0 ? (
                        allData.map((elm: any, index: number) => (
                            <Pressable
                                key={index}
                                className="w-[90%] px-4 py-3 border-b-2 border-blue-500 mx-auto my-2 flex flex-row justify-between"
                                onPress={() => {
                                    getModelData(elm.id);
                                }}
                            >
                                <Text className="text-base font-semibold" style={commonFontSizeStyles.commonTextContent}>{elm.title}</Text>
                                <FontAwesome5 name="eye" size={20} color="#black" />
                            </Pressable>
                        ))
                    ) : (
                        <Text className="text-center text-gray-500 mt-10">
                            Month Wise records will be added on 1st of every Month.
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

import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProjectLayout from "../Component/Layout/ProjectLayout";
import { toastHelperCallingFunc } from "../Component/Common/ToastComponent";
import Component_AllRecordsModel from "./Component_AllRecordsModel";
import commonFontSizeStyles from "../CSS/commonStyleSheet";
import TabsContainer from "../Component/Common/TabsContainer";
import GeneratePdfToHtml from "../pdfBuild/GeneratePdftoHtml";
import { formatAmount } from "../TS Logic/formatAmount";
import saveAsPdf from "../pdfBuild/saveAsPdf";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";

const AllMonthlyRecordDisplay = () => {
    const [allData, setAllData] = useState<any>(null);
    const [showModel, setShowModel] = useState<boolean>(true);
    const [modelData, setModelData] = useState<any>(null);
    const [userName, setUserName] = useState("");


    const downloadPdf = async (modelId: any) => {
        try {
            const userName = await AsyncStorage.getItem("userName");
            setUserName(userName || "");
            const todoData = allData.find((elm: any) => elm.id == modelId);
            const pdfData = saveAsPdf(todoData);

            const logoAsset = Asset.fromModule(require("../../assets/adaptive-icon.png"));
            await logoAsset.downloadAsync();
            const logoUri = logoAsset.localUri;
            console.log(logoUri);

            const html = GeneratePdfToHtml(pdfData, userName);

            const { uri } = await Print.printToFileAsync({ html });
            console.log("✅ PDF generated at:", uri);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                alert("Sharing not available on this device");
            }
        } catch (err) {
            console.error("❌ PDF generation failed:", err);
        }
    };




    function getModelData(modelId: any) {
        const modelData = allData.find((elm: any) => elm.id == modelId);
        const total = modelData.todos.reduce((sum: number, elm: any) => sum + Number(elm.amount), 0);
        setModelData({ ...modelData, total });
        console.log(modelData);

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
                <ScrollView className="flex-1 px-5 my-8">
                    {allData && allData.length > 0 ? (
                        allData.map((elm: any, index: number) => (

                            <Pressable key={index} onPress={() => { getModelData(elm.id) }}>
                                <TabsContainer>
                                    <View className="flex flex-row justify-between">
                                        <View>
                                            <Text className="mb-5" style={commonFontSizeStyles.commonHeaderFontSize}>{elm.title}</Text>
                                            <Text className="font-extrabold" style={commonFontSizeStyles.commonTextContent}>Monthly Budget : <Text className="text-red-600 font-bold ">₹ {formatAmount(elm.budgetSet)} /-</Text> </Text>
                                            <Text className="font-extrabold" style={commonFontSizeStyles.commonTextContent}>Total Spent :
                                                <Text className="text-red-600 font-bold ">
                                                    ₹ {formatAmount(elm.todos.reduce((result: number, currVal: any) => Number(result) + Number(currVal.amount), 0))} /-
                                                </Text>
                                            </Text>
                                            <Text className="font-extrabold" style={commonFontSizeStyles.commonTextContent}>Remaining Amount :  <Text className="text-red-600 font-bold ">₹ {formatAmount(elm.remainingAmount)} /-</Text> </Text>
                                        </View>
                                        <View className="my-auto">
                                            <Pressable>
                                                <Text className="color-[#3a86ff] text-center" style={commonFontSizeStyles.commonButtonSize}>View Details</Text>
                                            </Pressable>
                                            <Pressable className="px-3 py-2 mt-2 bg-green-600 rounded-xl" style={{ elevation: 5 }} onPress={() => downloadPdf(elm.id)}>
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

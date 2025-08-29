import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import ModelContainer from "../Component/Common/ModalContainer";
import { formatAmount } from "../TS Logic/formatAmount";
import commonFontSizeStyles from "../CSS/commonStyleSheet";

interface TodoItem {
    id: string;
    title: string;
    amount: number;
    currentDate: string;
    currentTime: string;
}

interface ModelData {
    id: string;
    title: string;
    todos: TodoItem[];
    total: number;
    budgetSet: number;
    remainingAmount: number;
}

interface Component_AllRecordsModelProps {
    modelDataById: ModelData | null;
    setShowModel: () => void;
    showModel: boolean;
    deleteModelDataByIdFunction: () => void;
}

const Component_AllRecordsModel: React.FC<Component_AllRecordsModelProps> = ({
    modelDataById,
    setShowModel,
    showModel,
    deleteModelDataByIdFunction,
}) => {
    if (!modelDataById) return null;

    const { id, title, todos, total, budgetSet, remainingAmount } = modelDataById;
    console.log(modelDataById);




    return (
        <ModelContainer isVisible={showModel} title={`Expense Details of ${title}`}>
            <View className="w-[80%] bg-white rounded-3xl m-auto relative pb-5">
                <View className="p-5">
                    <View className="border-b-2 border-gray-500">
                        <Text className="font-extrabold" >{title}</Text>
                        <Text className=" font-bold color-red-600" style={commonFontSizeStyles.commonTextContent}>Total Entries : {todos.length}</Text>
                        <Text className="font-extrabold mt-2 mb-5" style={commonFontSizeStyles.commonTextContent}>Total : <Text className="color-red-600">₹ {formatAmount(total)} /-</Text></Text>
                        <Text className=" font-extrabold color-red-600" style={commonFontSizeStyles.commonTextContent}>Total Monthly Budget : {formatAmount(budgetSet)}</Text>
                        <Text className=" font-extrabold color-red-600 mb-4" style={commonFontSizeStyles.commonTextContent}>Remaining Monthly Budget : {formatAmount(remainingAmount)}</Text>
                    </View>

                    <View className="flex-row mt-4 py-3" style={{ borderBottomWidth: 1, borderBottomColor: "#212121" }}>
                        <Text className="flex-1 text-center font-extrabold px-2" style={commonFontSizeStyles.commonTextContent}>Item Name</Text>
                        <Text className="flex-1 text-center font-extrabold px-2" style={commonFontSizeStyles.commonTextContent}>Amount(₹)</Text>
                        <Text className="flex-1 text-center font-extrabold px-2" style={commonFontSizeStyles.commonTextContent}>Date/Time</Text>
                    </View>

                    <ScrollView>
                        {todos.map(({ amount, currentDate, currentTime, title }, index) => (
                            <View key={index} className="flex-row border-b border-gray-200 py-2">
                                <Text className="px-2  flex-1 text-center my-auto" style={commonFontSizeStyles.commonTextContent}>{title}</Text>
                                <Text className="px-2  flex-1 text-center font-bold color-red-600 my-auto" style={commonFontSizeStyles.commonTextContent}> ₹{Number(amount).toFixed(2)} </Text>
                                <Text className="px-2  flex-1 text-center my-auto" style={commonFontSizeStyles.commonTextContent}>{currentDate} -  {currentTime}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View className="p-3 mt-5 flex flex-row justify-between">
                    <Pressable className="bg-red-600 py-3 rounded-3xl w-[45%]" onPress={deleteModelDataByIdFunction}>
                        <Text className="text-center text-white font-bold" style={commonFontSizeStyles.commonButtonSize}>Delete</Text>
                    </Pressable>
                    <Pressable className="bg-red-600 py-3 rounded-3xl w-[45%]" onPress={setShowModel}>
                        <Text className="text-center text-white font-bold" style={commonFontSizeStyles.commonButtonSize}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </ModelContainer>
    );
};

export default Component_AllRecordsModel;

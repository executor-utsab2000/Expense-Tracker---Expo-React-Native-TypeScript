import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Modal from "react-native-modal";
import ModelContainer from "../Component/Common/ModalContainer";

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
            <View className="w-[80%] bg-white rounded-3xl m-auto relative py-5">
                <View className="p-5">
                    <View className="border-b-2 border-gray-500">
                        <Text className="text-2xl font-extrabold">{title}</Text>
                        <Text className="text-xl font-extrabold mt-2 mb-10">
                            Total : <Text className="color-red-600">₹ {total} /-</Text>
                        </Text>
                        <Text className="text-sm font-extrabold color-red-600">Total Monthly Budget : {budgetSet}</Text>
                        <Text className="text-sm font-extrabold color-red-600 mb-4">Remaining Monthly Budget : {remainingAmount}</Text>
                    </View>

                    <View className="flex-row mt-4 py-3" style={{ borderBottomWidth: 1, borderBottomColor: "#212121" }}>
                        <Text className="flex-1 text-center font-extrabold">Item Name</Text>
                        <Text className="flex-1 text-center font-extrabold">Amount(₹)</Text>
                        <Text className="flex-1 text-center font-extrabold">Date/Time</Text>
                    </View>

                    <ScrollView>
                        {todos.map(({ amount, currentDate, currentTime, title }, index) => (
                            <View key={index} className="flex-row border-b border-gray-200 py-2">
                                <Text className="flex-1 text-center text-sm my-auto">{title}</Text>
                                <Text className="flex-1 text-center text-sm font-semibold color-red-600 my-auto"> ₹{Number(amount).toFixed(2)} </Text>
                                <Text className="flex-1 text-center text-sm my-auto">{currentDate} -  {currentTime}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View className="p-3 mt-5 flex flex-row justify-between">
                    <Pressable className="bg-red-600 py-3 rounded-3xl w-[45%]" onPress={deleteModelDataByIdFunction}>
                        <Text className="text-center text-white font-bold text-lg">Delete</Text>
                    </Pressable>
                    <Pressable className="bg-red-600 py-3 rounded-3xl w-[45%]" onPress={setShowModel}>
                        <Text className="text-center text-white font-bold text-lg">Close</Text>
                    </Pressable>
                </View>
            </View>
        </ModelContainer>
    );
};

export default Component_AllRecordsModel;

import { Pressable, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface ItemTabsProps {
    slNo: number | string,
    expenseTitle: string,
    expenseAmount: string | number,
    expenseCategory: string,
    expenseDateTime: any,
    expenseDeleteFunction: () => void,
    expenseEditFunction: () => void,
}

const ItemTabs = ({
    slNo = '',
    expenseTitle = "",
    expenseAmount = 0,
    expenseCategory = "",
    expenseDateTime = [],
    expenseDeleteFunction,
    expenseEditFunction,
}: ItemTabsProps) => {

    return (
        <>
            <View className="w-full px-2 py-5 my-4 rounded-2xl bg-[#f8f9fa]" style={{ elevation: 5 }}>

                <View>
                    <View className="flex flex-row justify-between px-2 ">
                        <View className="w-9/12 flex flex-row my-auto">
                            <Text className="text-lg font-bold pe-3">{slNo}.</Text>
                            <Text className="text-lg font-bold">{expenseTitle}</Text>
                        </View>

                        <View className="w-3/12 flex flex-row justify-around">
                            <Pressable className="p-3 bg-[#fca311] m-2 rounded-full" onPress={expenseEditFunction} style={{ elevation: 5 }}><FontAwesome5 name="edit" size={15} color="black" /></Pressable>
                            <Pressable className="p-3 bg-[#e63946] m-2 rounded-full" onPress={expenseDeleteFunction} style={{ elevation: 5 }}><FontAwesome5 name="trash" size={15} color="black" /></Pressable>
                        </View>
                    </View>
                </View>

                <View className="mt-3 flex flex-row">
                    <View className="w-9/12 ps-2">
                        <Text className="text-md color-slate-400 font-semibold pe-3">{expenseCategory}</Text>
                        <Text className="text-md color-slate-400 font-semibold mt-2">
                            {expenseDateTime[0]}
                            <View className="px-2">
                                <FontAwesome5 name="circle" solid size={8} color="#94a3b8" />
                            </View>
                            {expenseDateTime[1]}
                        </Text>
                    </View>
                    <View className="w-3/12">
                        <Text className="text-center text-xl font-extrabold color-[#38b000]">
                            ₹ {Number(expenseAmount).toFixed(2)}
                        </Text>
                    </View>
                </View>

            </View>
        </>
    );
};

export default ItemTabs;

import { Pressable, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TabsContainer from "../Common/TabsContainer";
import commonFontSizeStyles from "../../CSS/commonStyleSheet";

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
            <TabsContainer>

                <View>
                    {/* Top Row: Title + Actions */}
                    <View className="flex-row justify-between px-2">
                        {/* Title + SL No */}
                        <View className="flex-1 flex-row items-center">
                            <Text className="font-bold pr-2" style={commonFontSizeStyles.commonHeaderFontSize}>{slNo}.</Text>
                            <Text className="font-bold flex-shrink" style={commonFontSizeStyles.commonHeaderFontSize}>{expenseTitle}</Text>
                        </View>

                        {/* Action Buttons */}
                        <View className="flex-row items-center">
                            <Pressable className="p-3 bg-[#fca311] mx-1 rounded-full" onPress={expenseEditFunction} style={{ elevation: 5 }}>
                                <FontAwesome5 name="edit" size={15} color="white" />
                            </Pressable>

                            <Pressable className="p-3 bg-[#e63946] mx-1 rounded-full" onPress={expenseDeleteFunction} style={{ elevation: 5 }}>
                                <FontAwesome5 name="trash" size={15} color="white" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View className="mt-3 flex-row">
                    {/* Left side */}
                    <View className="flex-1 pl-2">
                        <Text className="text-slate-500 font-semibold" style={commonFontSizeStyles.commonTextContent}>{expenseCategory}</Text>
                        <View className="flex-row items-center mt-2 flex-wrap">
                            <Text className="text-slate-500 font-semibold" style={commonFontSizeStyles.commonTextContent}>{expenseDateTime[0]}</Text>
                            <FontAwesome5 name="circle" solid size={6} color="#94a3b8" className="mx-1" />
                            <Text className="text-slate-500 font-semibold" style={commonFontSizeStyles.commonTextContent}>{expenseDateTime[1]}</Text>
                        </View>
                    </View>

                    {/* Right side */}
                    <View className="justify-center items-end min-w-[70px]">
                        <Text className="font-extrabold text-[#38b000]" style={commonFontSizeStyles.commonHeaderFontSize}>₹ {Number(expenseAmount).toFixed(2)}</Text>
                    </View>
                </View>

            </TabsContainer >
        </>
    );
};

export default ItemTabs;

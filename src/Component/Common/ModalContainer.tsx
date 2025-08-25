import React from "react";
import Modal from "react-native-modal";
import { View, Image, Text, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";


interface ModalComponentInterface {
    isVisible: boolean,
    children: React.ReactNode,
    title: string
}

const ModelContainer = ({ isVisible, children, title }: ModalComponentInterface) => {
    return (
        <Modal isVisible={isVisible}>
            <View className="w-[90%] bg-white p-6 mx-auto" style={{ maxHeight: '85%', borderRadius: 20, elevation: 5 }}>
                <View className="h-20 border-b-slate-500 border-b-2 flex flex-row">
                    <Image
                        source={require("../../../assets/adaptive-icon.png")}
                        style={{
                            width: 50,
                            height: 70,
                            resizeMode: "contain",
                            marginRight: 10
                        }}
                        className="my-auto "
                    />
                    <Text className="font-bold flex-1 my-auto" style={{ fontSize: Math.max(Math.min(RFPercentage(1.8), 18), 12) }} numberOfLines={2}>{title}</Text>
                </View>
                <ScrollView className="py-8">{children}</ScrollView>
            </View>
        </Modal>
    );
};

export default ModelContainer;

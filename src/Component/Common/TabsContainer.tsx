import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Dimensions } from "react-native";

interface TabsContainerProps {
    children: ReactNode
}

const { width, height } = Dimensions.get("window");

const TabsContainer = ({ children }: TabsContainerProps) => {
    return (
        <View
            className="rounded-2xl bg-[#f8f9fa]"
            style={{
                elevation: 5,
                width: width * 0.9,   // 90% of screen width
                paddingVertical: height * 0.015, // ~2% of screen height
                paddingHorizontal: width * 0.04, // ~4% of screen width
                marginVertical: height * 0.015,  // ~1.5% of screen height
                alignSelf: "center", // keeps it centered
            }}
        >
            {children}
        </View>
    )
}

export default TabsContainer

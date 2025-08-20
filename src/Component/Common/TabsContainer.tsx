import React, { ReactNode } from 'react'
import { View } from 'react-native'

interface TabsContainerProps {
    children: ReactNode
}

const TabsContainer = ({ children }: TabsContainerProps) => {
    return (
        <View className="w-full px-2 py-5 my-4 rounded-2xl bg-[#f8f9fa]" style={{ elevation: 5 }}>
            {children}
        </View>
    )
}

export default TabsContainer

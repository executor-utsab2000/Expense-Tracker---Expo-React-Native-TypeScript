import React from 'react'
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import TabsContainer from '../Common/TabsContainer'
import { Pressable, Text, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';

interface ProfileTabsProps {
    title: string,
    count: string | number,
}

const ProfileTabs = ({ title = '', count = '' }: ProfileTabsProps) => {
    return (
        <>
            <TabsContainer>
                <View className='flex flex-row justify-between'>
                    <View className='flex flex-row'>
                        <View className='px-3 my-auto'>
                            <FontAwesome5 name="chart-line" size={20} color="#3a86ff" />
                        </View>
                        <View className='px-3'>
                            <Text className='font-extrabold' style={{ letterSpacing: 1, fontSize: Math.max(Math.min(RFPercentage(1.5), 20), 10) }}>{title}</Text>
                            <Text className='font-extrabold text-red-600' style={{ letterSpacing: 1, fontSize: Math.max(Math.min(RFPercentage(1.3), 20), 10) }}>{count}</Text>
                        </View>
                    </View>
                </View>
            </TabsContainer>
        </>
    )
}

export default ProfileTabs
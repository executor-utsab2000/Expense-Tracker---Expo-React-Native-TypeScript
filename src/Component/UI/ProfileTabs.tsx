import React from 'react'
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import TabsContainer from '../Common/TabsContainer'
import { Pressable, Text, View } from 'react-native'

interface ProfileTabsProps {
    icon: any,      //without any its giving large type error
    title: string,
    count: string | number,
}

const ProfileTabs = ({ icon = '', title = '', count = '' }: ProfileTabsProps) => {
    return (
        <>
            <TabsContainer>
                <View className='flex flex-row justify-between'>
                    <View className='flex flex-row'>
                        <View className='px-3 my-auto'>
                            <FontAwesome name={icon} size={20} color="#3a86ff" />
                        </View>
                        <View className='px-3'>
                            <Text className='text-xl font-extrabold' style={{ letterSpacing: 1 }}>{title}</Text>
                            <Text className='text-lg font-extrabold'>{count}</Text>
                        </View>
                    </View>
                </View>
            </TabsContainer>
        </>
    )
}

export default ProfileTabs
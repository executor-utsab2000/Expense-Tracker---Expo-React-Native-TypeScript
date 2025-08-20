import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native'
import ProfileTabs from '../Component/UI/ProfileTabs'
import ProjectLayout from '../Component/Layout/ProjectLayout'
import { FontAwesome } from "@expo/vector-icons";
import getUserData from '../TS Logic/getUserProfileData';
import { useAppNavigation } from "../TS Logic/routesInterface";

const { width, height } = Dimensions.get("window");
// 
const ProfilePage = () => {

    const [userDetails, setUserDetails] = useState<any>({
        genderLogo: '',
        highestSpentThisMonth: '',
        mostSpentThisMonth: '',
        totalRecords: '',
        totalRecordsThisMonth: '',
        totalSpentThisMonth: '',
        totalSpentTillDate: '',
        userGender: '',
        userName: '',
        userProfilePic: ''
    });

    const navigation = useAppNavigation(); // ✅ no type boilerplate

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserData();
            setUserDetails(userData);
            // console.log(userData);
        };

        fetchData(); // Call the async function inside useEffect
    }, []);



    return (
        <>
            <ProjectLayout>

                <View className=" mt-5 flex items-center mx-auto h-[30%] relative">
                    <View className='rounded-full overflow-hidden border-green-300 border-4 mb-3 p-3 bg-white' style={{ elevation: 5 }}>
                        <Image
                            className='mx-auto'
                            source={userDetails.userProfilePic}
                            style={{
                                width: width * 0.19, // add width
                                height: height * 0.085, // 30% of screen height
                                resizeMode: "contain",
                            }}
                        />
                    </View>
                    <Text className='text-2xl mt-2 font-extrabold' style={{ letterSpacing: 1 }}>{userDetails.userName}</Text>
                    <View className='mt-4'>
                        <Image
                            source={userDetails.genderLogo}
                            style={{
                                width: width * 0.1, // add width
                                height: height * 0.03, // 30% of screen height
                                resizeMode: "contain",
                            }}
                        />
                    </View>

                    <Pressable style={{
                        position: "absolute",
                        bottom: '20%',
                        right: '-30%',
                        borderRadius: 30,
                        elevation: 5 // shadow for Android
                    }}
                        className='p-5 bg-red-500'
                        onPress={() => navigation.navigate("nameInsert")}
                    >
                        <FontAwesome name="edit" size={20} color="yellow" />
                    </Pressable>
                </View>

                <ScrollView className='h-[60%] px-10'>
                    <ProfileTabs icon="eye" title='Total Records' count={userDetails.totalRecords} />
                    <ProfileTabs icon="eye" title='Total Spent Till Date' count={userDetails.totalSpentTillDate} />
                    <ProfileTabs icon="eye" title='Total Records this Month' count={userDetails.totalRecordsThisMonth} />
                    <ProfileTabs icon="eye" title='Total Spent this month' count={userDetails.totalSpentThisMonth} />
                    <ProfileTabs icon="eye" title='Highest Spent this Month' count={userDetails.highestSpentThisMonth} />
                    <ProfileTabs icon="eye" title='Most Spent this Month' count={userDetails.mostSpentThisMonth} />
                </ScrollView>

            </ProjectLayout >
        </>
    )
}

export default ProfilePage
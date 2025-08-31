import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native'
import ProfileTabs from '../Component/UI/ProfileTabs'
import ProjectLayout from '../Component/Layout/ProjectLayout'
import { FontAwesome } from "@expo/vector-icons";
import getUserData from '../TS Logic/getUserProfileData';
import { useAppNavigation } from "../TS Logic/routesInterface";
import { formatAmount } from '../TS Logic/formatAmount';

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
            console.log(userData);
        };

        fetchData(); // Call the async function inside useEffect
    }, []);



    return (
        <>
            <ProjectLayout>

                <View className=" mt-5 flex items-center mx-auto h-[30%] relative">
                    <View
                        className="rounded-full overflow-hidden border-green-300 border-4 mb-3 bg-white p-2"
                        style={{ elevation: 5 }}
                    >
                        <Image
                            source={userDetails.userProfilePic}
                            style={{
                                width: width * 0.19,  // make sure width === height
                                height: width * 0.19, // use width for both
                                borderRadius: (width * 0.19) / 2, // half of width
                                resizeMode: "cover",  // cover looks more natural than contain
                                alignSelf: "center",  // replaces mx-auto for RN
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

                <ScrollView className='h-[60%] px-10 mb-5'>
                    <ProfileTabs title='Total Records' count={formatAmount(userDetails.totalRecords)} />
                    <ProfileTabs title='Total Spent Till Date' count={formatAmount(userDetails.totalSpentTillDate)} />
                    <ProfileTabs title='Total Records this Month' count={formatAmount(userDetails.totalRecordsThisMonth)} />
                    <ProfileTabs title='Total Spent this month' count={formatAmount(userDetails.totalSpentThisMonth)} />
                    <ProfileTabs title='Highest Spent this Month' count={formatAmount(userDetails.highestSpentThisMonth)} />
                    <ProfileTabs title='Most Spent this Month' count={formatAmount(userDetails.mostSpentThisMonth)} />
                </ScrollView>

            </ProjectLayout >
        </>
    )
}

export default ProfilePage
import React, { useEffect, useState, useId } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";


import { toastHelperCallingFunc } from '../Component/Common/ToastComponent';
import ProjectLayout from '../Component/Layout/ProjectLayout'
import InputBox from '../Component/Common/InputBox';
// import { dummyNotes } from '../DummyData/dummyDataNotes';
import ModelContainer from '../Component/Common/ModalContainer';
import commonFontSizeStyles from "../CSS/commonStyleSheet";
import TabsContainer from '../Component/Common/TabsContainer';



interface userAllNotesInterface {
    notesId: string | number
    noteContent: string
    noteRecordDate: any
}
const NotePad = () => {

    const [userName, setUserName] = useState<string | null>("");
    const [userNotes, setUserNotes] = useState<userAllNotesInterface | null>(null);
    const [noteText, setNoteText] = useState<string>("");
    const [userAllNotes, setUserAllNotes] = useState<userAllNotesInterface[]>([])
    const [showEditModal, setShowEditModal] = useState<boolean>(false)


    const updateAddNotes = async () => {

        if (noteText.trim() == '') {
            toastHelperCallingFunc({
                type: 'error',
                text1: 'Invalid Notes',
                text2: 'Please insert some data',
            });
            return
        }

        if (userNotes == null) {

            const newNote: userAllNotesInterface = {
                notesId: Date.now(),
                noteContent: noteText.trim(),
                noteRecordDate: new Date().toISOString(),
            };
            // console.log(78);

            const updatedNotesList = [newNote, ...userAllNotes];
            await AsyncStorage.setItem('userAllNotes', JSON.stringify(updatedNotesList))
            toastHelperCallingFunc({
                type: 'success',
                text1: 'Success',
                text2: 'Notes Saved Successfully',
            });
            setShowEditModal(false)
            return

        }
        else {
            // console.log('update');
            // console.log(userNotes);
            const noteId = userNotes.notesId
            const allNotes = [...userAllNotes]
            allNotes.forEach((elm) => {
                if (elm.notesId == noteId) {
                    elm.noteContent = noteText
                }
            })
            setUserAllNotes(allNotes)
            setShowEditModal(false)

            await AsyncStorage.setItem('userAllNotes', JSON.stringify(allNotes))
            setUserNotes(null)
        }
    };

    const addEditNotesModelFunc = (noteId: string | number) => {
        // console.log(noteId);
        if (noteId == '') {
            setNoteText('')
            setShowEditModal(true);
        }
        else {
            const noteData = userAllNotes.find((note) => note.notesId == noteId)
            if (noteData) {
                setUserNotes(noteData);
                setNoteText(noteData.noteContent); // bind this to TextInput
                setShowEditModal(true);
            }
        }
    }


    const deleteNotes = async (notesId: string | number) => {
        const filteredNotes = userAllNotes.filter((note) => note.notesId !== notesId);

        setUserAllNotes(filteredNotes); // Update state
        await AsyncStorage.setItem('userAllNotes', JSON.stringify(filteredNotes)); // Persist change
        toastHelperCallingFunc({
            type: 'success',
            text1: 'Deleted',
            text2: 'Note deleted successfully',
        });
    };


    const deleteAllNotes = async () => {
        await AsyncStorage.removeItem('userAllNotes'); // Persist change
        toastHelperCallingFunc({
            type: 'success',
            text1: 'Deleted',
            text2: 'All Note deleted successfully',
        });
    }


    useEffect(() => {
        async function getUserName() {
            const uName = await AsyncStorage.getItem("userName");
            setUserName(uName);
            const getAllNotes = await AsyncStorage.getItem("userAllNotes");
            setUserAllNotes(getAllNotes ? JSON.parse(getAllNotes) : []);
            // await AsyncStorage.setItem('userAllNotes', JSON.stringify(dummyNotes))
        }

        getUserName();
    }, []);



    // fetch again on notesList Change
    useEffect(() => {
        async function geUserNotes() {
            const getAllNotes = await AsyncStorage.getItem("userAllNotes");
            setUserAllNotes(getAllNotes ? JSON.parse(getAllNotes) : []);
        }

        geUserNotes();
    }, [updateAddNotes, deleteNotes, deleteAllNotes]);


    return (
        <>
            <ProjectLayout>
                <View className="h-[20%] pt-10 pb-3 px-8">
                    <Text className="text-xl">𝑯𝒊 ,</Text>
                    <Text className="font-extrabold text-3xl italic pt-2">
                        {userName}
                    </Text>
                    <Text className="font-extrabold text-xl italic pt-2">
                        𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒃𝒂𝒄𝒌 , 𝑻𝒂𝒌𝒆 𝒀𝒐𝒖𝒓 𝑵𝒐𝒕𝒆𝒔 ✒️✒️✒️
                    </Text>
                </View>

                <ScrollView className="flex-1 h-[70%] px-8 py-4 ">
                    {
                        userAllNotes.map((elm) => {
                            const formattedText1 = elm.noteContent.split(" ").slice(0, 5).join(" ");
                            const formattedText2 = elm.noteContent.split(" ").slice(5, 15).join(" ");

                            return (
                                <TabsContainer key={elm.notesId}>
                                    <View className='flex flex-row'
                                        style={{
                                            overflow: 'hidden',
                                            minHeight: 60, // You can increase this as needed
                                            maxHeight: 60, // You can increase this as needed
                                        }}>

                                        <Pressable onPress={() => addEditNotesModelFunc(elm.notesId)} style={{ flex: 6 }}>
                                            <View>
                                                <Text className='font-bold' style={{ fontSize: 15 }}>{formattedText1}</Text>
                                                <Text className='font-semibold mt-2' style={{ fontSize: 10 }}>{formattedText2}.........</Text>
                                            </View>

                                        </Pressable>
                                        <View className="my-auto" style={{ flex: 1 }}>
                                            <Pressable className='mx-auto px-5 py-4 bg-red-600 rounded-full' style={{ elevation: 5 }} onPress={() => deleteNotes(elm.notesId)}>
                                                <FontAwesome name="trash" size={12} color="yellow" />
                                            </Pressable>
                                        </View>
                                    </View>
                                </TabsContainer>
                            )
                        })

                    }
                </ScrollView>



                <Pressable className='px-5 py-4 bg-red-600  absolute bottom-12 right-[5%] rounded-full' style={{ elevation: 5 }} onPress={() => addEditNotesModelFunc('')}>
                    <FontAwesome name="plus" size={20} color="yellow" />
                </Pressable>

                {userAllNotes.length > 0 && <Pressable className='px-5 py-4 bg-red-600  absolute bottom-12 left-[5%] rounded-full' style={{ elevation: 5 }} onPress={deleteAllNotes}>
                    <FontAwesome name="trash" size={20} color="yellow" />
                </Pressable>}
            </ProjectLayout >

            <ModelContainer isVisible={showEditModal} title='Edit Note'>
                <InputBox
                    inputBoxLabel=""
                    placeholder="Edit Notes"
                    multiline
                    scrollEnabled
                    placeholderTextColor="#888"
                    style={{
                        flex: 1, // this allows the TextInput to take up available space
                        fontWeight: "600",
                        borderRadius: 10,
                        textAlignVertical: "top",
                        backgroundColor: "#f0f0f0",
                        elevation: 2,
                        minHeight: 150, // You can increase this as needed
                        maxHeight: 250, // You can increase this as needed
                    }}
                    value={noteText}
                    onChangeText={setNoteText}
                />

                <View className="w-[90%] mx-auto  mt-5 flex-row justify-around">
                    <Pressable className="py-2 bg-red-600 rounded-3xl my-auto mx-2" onPress={updateAddNotes} style={{ flex: 1 }}>
                        <Text className="text-center text-white" style={commonFontSizeStyles.commonButtonSize}>Save Note</Text>
                    </Pressable>
                    <Pressable className="py-2 bg-red-600 rounded-3xl my-auto mx-2" onPress={() => setShowEditModal(false)} style={{ flex: 1 }}>
                        <Text className="text-center text-white" style={commonFontSizeStyles.commonButtonSize}>Close</Text>
                    </Pressable>
                </View>
            </ModelContainer >



        </>
    )
}

export default NotePad
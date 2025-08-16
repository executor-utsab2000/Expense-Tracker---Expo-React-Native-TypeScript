import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import './src/CSS/global.css'
import NameInsert from "./src/Screens/NameInsert";
import WelcomeUser from "./src/Screens/WelcomeUser";
import NotePad from "./src/Screens/NotePad";
import { ToastComponent } from "./src/Component/Common/ToastComponent";
import AddDataForm from "./src/Screens/AddDataForm";
import ExpenseList from "./src/Screens/ExpenseList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dummyDataTodoMonthly } from "./src/DummyData/dummyDataTodoMonthly";
import AllMonthlyRecordDisplay from "./src/Screens/AllMonthlyRecordDisplay";
import { dummyMultipleMonthRecord } from "./src/DummyData/dummyMultipleMonthRecord";






const App = () => {

  useEffect(() => {
    async function conditionallySetRoute() {
      // console.log(await AsyncStorage.getAllKeys());
      // ------------------------------------------------------------------------------------------------------------
      // ------------------------------------------------------------------------------------------------------------
      await AsyncStorage.setItem('allTodoList', JSON.stringify(dummyMultipleMonthRecord))
      // await AsyncStorage.setItem('todoList', JSON.stringify(dummyDataTodoMonthly))
      // await AsyncStorage.setItem('budget', '100000')
      // await AsyncStorage.removeItem("allTodoList");
      // await AsyncStorage.removeItem("userNotes");
      // await AsyncStorage.removeItem("todoList");
      // await AsyncStorage.removeItem("userName");
      // await AsyncStorage.removeItem("gender");
      // await AsyncStorage.removeItem("budget");
    }
    // conditionallySetRoute()
  }, [])

  return (

    <>
      <View className="flex-1">
        {/* <NotePad /> */}
        {/* <NameInsert /> */}
        {/* <AddDataForm /> */}
        {/* <ExpenseList /> */}
        <AllMonthlyRecordDisplay />
      </View>

      <ToastComponent />
    </>
  )
}

export default App
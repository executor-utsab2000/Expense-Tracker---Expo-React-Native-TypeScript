import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import './src/CSS/global.css'
import { ToastComponent } from "./src/Component/Common/ToastComponent";
import AddDataForm from "./src/Screens/AddDataForm";
import ExpenseList from "./src/Screens/ExpenseList";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { dummyDataTodoMonthly } from "./src/DummyData/dummyDataTodoMonthly";
import AllMonthlyRecordDisplay from "./src/Screens/AllMonthlyRecordDisplay";
import { dummyMultipleMonthRecord } from "./src/DummyData/dummyMultipleMonthRecord";
import { monthAllRecords } from "./src/TS Logic/monthAllRecords";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./src/Screens/Loading";
import NameInsert from "./src/Screens/NameInsert";
import WelcomeUser from "./src/Screens/WelcomeUser";
import NotePad from "./src/Screens/NotePad";
import ProfilePage from "./src/Screens/ProfilePage";




const Stack = createNativeStackNavigator();

const App = () => {

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    async function conditionallySetRoute() {
      // await AsyncStorage.clear();
      // await AsyncStorage.setItem("allTodoList", JSON.stringify(dummyMultipleMonthRecord));
      const userName = await AsyncStorage.getItem("userName");
      if (userName == null) {
        setInitialRoute("nameInsert");
      } else {
        setInitialRoute("welcomeUser");
      }
    }

    conditionallySetRoute();
    // ------------------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------
    async function onFirstTheActions() {
      const today = new Date();
      const date = today.getDate();
      // const date = 1;
      // // console.log(date);

      if (date == 1) {
        const monthNumber = today.getMonth();
        const monthDetails = monthAllRecords.find((elm) => monthNumber - 1 == elm.monthCount);
        const getYear = today.getFullYear();

        let getAllRecords;
        let monthRecord;

        const getAllRecordsRaw = await AsyncStorage.getItem("allTodoList");
        const monthRecordRaw = await AsyncStorage.getItem("todoList");

        if (getAllRecordsRaw != null) {
          getAllRecords = JSON.parse(getAllRecordsRaw)
        }
        else {
          getAllRecords = []
        }

        if (monthRecordRaw != null) {
          monthRecord = JSON.parse(monthRecordRaw)
        }
        else {
          monthRecord = []
        }



        let budget = await AsyncStorage.getItem("budget");

        if (monthRecord.length != 0) {
          const total = monthRecord.reduce((result: number, currVal: any) => result + Number(currVal.amount), 0);
          const remaining = Number(budget) - total;

          const newMonthRecord = {
            id: `${monthDetails?.monthAbbr}${getYear}`,
            title: `${monthDetails?.monthName} ${getYear}`,
            todos: [...monthRecord],
            budgetSet: budget,
            remainingAmount: remaining
          };

          let newUpdatedAllTodos;
          if (getAllRecords != null) {
            newUpdatedAllTodos = [newMonthRecord, ...getAllRecords];
          } else if (getAllRecords == null) {
            newUpdatedAllTodos = [newMonthRecord];
          }

          await AsyncStorage.setItem("allTodoList", JSON.stringify(newUpdatedAllTodos));
          await AsyncStorage.removeItem("todoList");
          await AsyncStorage.removeItem("budget");
        }
      }

    }
    onFirstTheActions();

    // console.log(55);

  }, []);

  if (!initialRoute) {
    return <LoadingScreen />; // Or splash screen
  }
  return (

    <>
      <View className="bg-[#dce0e5] flex-1">
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>

            <Stack.Screen
              name="nameInsert"
              component={NameInsert}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="welcomeUser"
              component={WelcomeUser}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="addDataForm"
              component={AddDataForm}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="notepad"
              component={NotePad}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="list"
              component={ExpenseList}
              options={{ headerShown: false }}
            />


            <Stack.Screen
              name="allRecords"
              component={AllMonthlyRecordDisplay}
              options={{ headerShown: false }}
            />



            <Stack.Screen
              name="userProfile"
              component={ProfilePage}
              options={{ headerShown: false }}
            />



          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <ToastComponent />
    </>
  )
}

export default App

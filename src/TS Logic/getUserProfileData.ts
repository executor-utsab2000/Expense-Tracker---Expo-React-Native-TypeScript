import AsyncStorage from "@react-native-async-storage/async-storage";
import { mostSpentCalc } from "./mostSpentCalc";
import { highestSpentCalc } from "./highestSpentCalc";
import { StoredDataInterface } from "./chartData";

export default async function getUserData() {
  //   console.log(await AsyncStorage.getAllKeys());

  const storedName = await AsyncStorage.getItem("userName");
  const storedGender = await AsyncStorage.getItem("gender");

  const storedTodoListRaw = await AsyncStorage.getItem("todoList");
  const storedAllTodoListRaw = await AsyncStorage.getItem("allTodoList");

  const storedTodoList = storedTodoListRaw ? JSON.parse(storedTodoListRaw) : [];
  const storedAllTodoList = storedAllTodoListRaw ? JSON.parse(storedAllTodoListRaw) : [];


  let allTodoLength = 0;
  let totalRecordsThisMonth = 0;

  let thisMonthTillDateSpent = 0;
  let totalSpentLastMonth = 0;

  let mostSpentThisMonth = '';
  let mostSpentLastMonth = '';

  let highestSpentThisMonth = '';
  let highestSpentLastMonth = '';
  // ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------

  // stored todo this month
  if (storedTodoList != null && storedTodoList.length != 0) {
    totalRecordsThisMonth = storedTodoList.length;
    allTodoLength = storedTodoList.length;
    thisMonthTillDateSpent = storedTodoList.reduce((result: number, currVal: StoredDataInterface) => result + Number(currVal.amount), 0);
    mostSpentThisMonth = mostSpentCalc(storedTodoList);
    highestSpentThisMonth = highestSpentCalc(storedTodoList);
  }
  // console.log(allTodoLength); 

  // ------------------------------------------------------------------------------------------------

  if (storedAllTodoList != null && storedAllTodoList.length != 0) {
    // console.log(storedAllTodoList[0].todos.length); 
    // console.log(storedAllTodoList.forEach((elm) => console.log(elm)));

    allTodoLength = storedAllTodoList.reduce((total: number, list: any) => total + list.todos.length, allTodoLength);

    totalSpentLastMonth = storedAllTodoList[0].todos.reduce((result: number, currVal: StoredDataInterface) => result + Number(currVal.amount), 0);
    mostSpentLastMonth = mostSpentCalc(storedAllTodoList[0].todos);
    highestSpentLastMonth = highestSpentCalc(storedAllTodoList[0].todos);
  }
  // console.log(allTodoLength); 
  // ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------

  let genderLogo;
  let userProfilePic;

  if (storedGender == "male") {
    genderLogo = require("../../assets/manlogo.png");
    userProfilePic = require("../../assets/malepic.png");
  }
  //
  else if (storedGender == "female") {
    genderLogo = require("../../assets/femalelogo.png");
    userProfilePic = require("../../assets/femalepic.png");
  }

  // ------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------


  // setting value
  const userDetails = {
    userName: storedName,
    userGender: storedGender,
    userProfilePic: userProfilePic,
    genderLogo: genderLogo,

    totalRecords: allTodoLength,
    totalRecordsThisMonth: totalRecordsThisMonth,

    thisMonthTillDateSpent: thisMonthTillDateSpent,
    totalSpentLastMonth: totalSpentLastMonth,

    mostSpentThisMonth: mostSpentThisMonth,
    mostSpentLastMonth: mostSpentLastMonth,

    highestSpentThisMonth: highestSpentThisMonth,
    highestSpentLastMonth: highestSpentLastMonth,
  };
  return userDetails;
}

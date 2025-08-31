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

  // let userName;
  // let userGender;
  let genderLogo: any;
  let userProfilePic: any;

  let totalRecords: any = 0;
  let totalSpentTillDate;
  let allTodoAmountArray: number[] = []

  let monthlyTotalRecords;
  let monthlyTotalSpent

  let highestSpentThisMonth;
  let mostSpentThisMonth;


  // ===============================================================================================
  // ===============================================================================================

  // monthly record 
  if (storedTodoList != null && storedTodoList.length != 0) {
    monthlyTotalRecords = storedTodoList.length
    monthlyTotalSpent = storedTodoList.reduce((result: number, currentValue: any) => result + Number(currentValue.amount), 0)
    highestSpentThisMonth = highestSpentCalc(storedTodoList)
    mostSpentThisMonth = mostSpentCalc(storedTodoList)
    totalRecords += storedTodoList.length
  }
  // ===============================================================================================
  // ===============================================================================================

  // all time records 
  if (storedAllTodoList != null && storedAllTodoList.length != 0) {
    storedAllTodoList.forEach((elm: any) => {
      totalRecords += elm.todos.length
    })

    storedAllTodoList.forEach((elm: any) => {
      elm.todos.forEach((todo: any) => allTodoAmountArray.push(Number(todo.amount)))
    })

    totalSpentTillDate = allTodoAmountArray.reduce((result: number, currentValue: number) => result + currentValue, 0)
  }

  // ===============================================================================================
  // ===============================================================================================

  // gender select
  if (storedGender == "male") {
    genderLogo = require("../../assets/manlogo.png");
    userProfilePic = require("../../assets/malepic.png");
  }
  //
  else if (storedGender == "female") {
    genderLogo = require("../../assets/femalelogo.png");
    userProfilePic = require("../../assets/femalepic.png");
  }

  const userDetails = {
    userName: storedName,
    userGender: storedGender,
    userProfilePic: userProfilePic,
    genderLogo: genderLogo,

    totalRecords: totalRecords || 0,
    totalSpentTillDate: totalSpentTillDate || 0,

    totalRecordsThisMonth: monthlyTotalRecords || 0,
    totalSpentThisMonth: monthlyTotalSpent || 0,
    highestSpentThisMonth: highestSpentThisMonth || 0,
    mostSpentThisMonth: mostSpentThisMonth || '-',
  }

  return userDetails;



}


//  userName: "",
// userGender: "",
// userProfilePic: "",
// genderLogo: "",

// totalRecords: 0,
// totalSpentTillDate: 0,

// totalRecordsThisMonth: 0,
// totalSpentThisMonth: 0,
// mostSpentThisMonth: 0,
// highestSpentThisMonth: 0,

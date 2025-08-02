import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import './src/CSS/global.css'
import NameInsert from "./src/Screens/NameInsert";
import WelcomeUser from "./src/Screens/WelcomeUser";
import NotePad from "./src/Screens/NotePad";
import { ToastComponent } from "./src/Component/Common/ToastComponent";






const App = () => {

  return (

    <>
      <View className="flex-1">
        <NotePad />
      </View>

      <ToastComponent />
    </>
  )
}

export default App
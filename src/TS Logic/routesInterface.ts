import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
    nameInsert: undefined;
    welcomeUser: undefined;
    addDataForm: undefined;
    notepad: undefined;
    list: undefined;
    allRecords: undefined;
    userProfile: undefined;
};

// general navigation type
export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// custom hook
export const useAppNavigation = () => useNavigation<AppNavigationProp>();

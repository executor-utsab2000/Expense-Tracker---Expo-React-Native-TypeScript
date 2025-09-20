import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Pressable, TextInput } from "react-native";
import ProjectLayout from "../Component/Layout/ProjectLayout";
import ItemTabs from "../Component/UI/ItemTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categoryArray } from "../TS Logic/categoryArray";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import createChartData, { StoredDataInterface } from "../TS Logic/chartData";
import ModelContainer from "../Component/Common/ModalContainer";
import InputBox from "../Component/Common/InputBox";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";
import commonFontSizeStyles from "../CSS/commonStyleSheet";
import { toastHelperCallingFunc } from "../Component/Common/ToastComponent";

const ExpenseList = () => {


    const [userExpenseName, setUserExpenseName] = useState<any>(null);
    const [userExpenseAmount, setUserExpenseAmount] = useState<any>(null);
    const [userCategory, setUserCategory] = useState<any>(null);
    const [userTodoEdit, setUserTodoEdit] = useState<any>()
    const [errorMsg, setErrorMsg] = useState<any>('')

    const [categoryMode, setCategoryMode] = useState<'filter' | 'edit' | null>(null)
    const [todoList, setTodoList] = useState<StoredDataInterface[]>([]);
    const [sum, setSum] = useState(0);
    const [budget, setBudget] = useState(0);
    const [remainingAmount, setRemainingAmount] = useState(0);
    const [category, setCategory] = useState<string>('');
    const [chartDataArray, setChartDataArray] = useState<any>([])
    const [showChart, setShowChart] = useState<boolean>(false)
    const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
    const [openEditTodoModal, setOpenEditTodoModal] = useState<boolean>(false)


    const { width } = Dimensions.get("window");
    const chartSize = width * 0.4;

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label and line color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional
        decimalPlaces: 2, // optional, for value formatting
    };

    // 🔹 Common helper
    async function refreshTodos(categoryName: string | null = null) {
        const storedTodos = await AsyncStorage.getItem("todoList");
        let parsedTodo: StoredDataInterface[] = storedTodos ? JSON.parse(storedTodos) : [];

        let displayTodos = parsedTodo;

        // apply filter if category is given & not "All"
        if (categoryName && categoryName !== "All") {
            displayTodos = parsedTodo.filter((elm) => elm.category === categoryName);
        }

        // calculate total sum
        const totalSpent = displayTodos.reduce((sum, item) => sum + Number(item.amount), 0);

        setTodoList(displayTodos);
        setSum(totalSpent);
        setRemainingAmount(Number(budget) - totalSpent);
    }


    const chartRenderFunc = () => {
        setChartDataArray(createChartData(todoList, Number(budget), Number(remainingAmount)))
        console.log(chartDataArray);
        setShowChart(true)
    }

    async function deleteItem(todoId: any) {
        const storedTodos = await AsyncStorage.getItem("todoList");
        let parsedTodo: StoredDataInterface[] = storedTodos ? JSON.parse(storedTodos) : [];

        // delete from full list
        const updatedTodo = parsedTodo.filter((elm) => elm.id != todoId);

        // save updated full list
        await AsyncStorage.setItem("todoList", JSON.stringify(updatedTodo));

        // refresh UI with current category filter
        refreshTodos(category);
    }



    function editTodo(todoId: any) {
        // console.log(todoId);
        console.log(categoryMode);

        const todo = [...todoList]
        const todoEdit = todo.find((elm: any) => elm.id == todoId)
        setUserExpenseName(todoEdit?.title)
        setUserExpenseAmount(todoEdit?.amount)
        setUserCategory(todoEdit?.category)
        setUserTodoEdit(todoEdit)
        setOpenEditTodoModal(true)

    }


    async function updateSaveTodo() {
        const storedTodos = await AsyncStorage.getItem("todoList");
        let parsedTodo: StoredDataInterface[] = storedTodos ? JSON.parse(storedTodos) : [];

        const updatedTodo = {
            title: userExpenseName,
            amount: userExpenseAmount,
            category: userCategory,
            currentDate: userTodoEdit.currentDate,
            currentTime: userTodoEdit.currentTime,
            id: userTodoEdit.id
        };

        //Keeps the original order of your todos.
        // Only updates the fields you want(title, amount, category) for the matching todo.
        // No need to filter or sort; simpler and safer
        const updatedTodoList = parsedTodo.map((elm) => elm.id === userTodoEdit.id ? { ...elm, title: userExpenseName, amount: userExpenseAmount, category: userCategory } : elm);


        // budget validation
        const totalSpent = updatedTodoList.reduce((result, currVal) => result + Number(currVal.amount), 0);
        if (totalSpent > budget) {
            setErrorMsg('Your Budget is less. Please increase the budget from "Add Todo Page"');
            return;
        }

        // save back
        await AsyncStorage.setItem("todoList", JSON.stringify(updatedTodoList));

        // refresh UI with current category filter
        refreshTodos(category);

        // reset edit modal state
        setOpenEditTodoModal(false);
        setUserExpenseName(null);
        setUserExpenseAmount(null);
        setUserCategory(null);
        setUserTodoEdit(null);
        setErrorMsg('');

        // show message 
        toastHelperCallingFunc({
            type: 'success',
            text1: 'Success',
            text2: 'Data Updated Successfully',
        })
    }





    const setCategoryDeciderFunc = async (categoryName: string) => {
        if (categoryMode == 'edit') {
            setUserCategory(categoryName)
        }
        // ------------------
        else if (categoryMode == 'filter') {
            setCategory(categoryName);

            const storedTodos = await AsyncStorage.getItem("todoList"); //get the items
            if (storedTodos != null) {
                const parsedTodo = JSON.parse(storedTodos);

                if (categoryName === 'All') {
                    const newSum = parsedTodo.reduce((result: number, currVal: any) => result + Number(currVal.amount), 0);
                    setSum(newSum)
                    setTodoList(parsedTodo)
                }
                else {
                    const filteredTodo = parsedTodo.filter((elm: any) => elm.category == categoryName)
                    const newSum = filteredTodo.reduce((result: number, currVal: any) => result + Number(currVal.amount), 0);
                    setSum(newSum)
                    setTodoList(filteredTodo)
                }

            }
            else {
            }
        }
        setShowCategoryModal(false)
    }


    useEffect(() => {
        async function loadData() {
            const storedTodos = await AsyncStorage.getItem("todoList"); //get the items
            const storedBudget = await AsyncStorage.getItem("budget");

            if (storedTodos != null) {
                const parsedTodo = JSON.parse(storedTodos);
                const total = parsedTodo.reduce((result: number, currVal: any) => result + Number(currVal.amount), 0);
                setTodoList(parsedTodo);
                setSum(total);
                const remaining = Number(storedBudget) - total;
                // createChartData(parsedTodo, Number(storedBudget), Number(remaining))
                setRemainingAmount(remaining);

            }

            if (storedBudget != null) {
                setBudget(Number(storedBudget));
            } else if (storedBudget == null) {
                setBudget(0);
            }
        }
        loadData();



    }, []);

    return (
        <>
            <ProjectLayout>
                {/* Header Section */}
                <View className="px-5 pt-10 py-5 flex-row justify-between items-center">
                    <View className="flex-1">
                        <Text className="text-sm font-extrabold text-red-600">
                            Total Monthly Budget : {budget}
                        </Text>
                        <Text className="text-sm font-extrabold text-red-600">
                            Remaining Monthly Budget : {remainingAmount}
                        </Text>
                        <Text className="font-extrabold text-2xl md:text-3xl italic pt-4">
                            𝒀𝒐𝒖𝒓 𝑬𝒙𝒑𝒆𝒏𝒔𝒆𝒔 :
                        </Text>
                    </View>

                    <View className="p-4 bg-[#ffba08] min-w-[80px] max-w-[120px] flex justify-center items-center rounded-2xl border-red-700 border-4">
                        <Text className="font-extrabold" style={commonFontSizeStyles.commonHeaderFontSize}>{sum}</Text>
                    </View>
                </View>



                <View className="px-5 py-4 flex-row">
                    <View className="flex-1 pr-2">
                        <Pressable
                            onPress={() => {
                                setShowCategoryModal(true);
                                setCategoryMode("filter");
                            }}>
                            <InputBox
                                inputBoxLabel="Filter by Category:"
                                placeholder="Select Category"
                                value={category}
                                editable={false}
                                pointerEvents="none"
                            />
                        </Pressable>
                    </View>

                    {
                        todoList.length > 0 ? (
                            <View className="w-[35%] max-w-[150px]">
                                <Pressable
                                    className="rounded-3xl p-2 flex justify-center items-center"
                                    onPress={chartRenderFunc}
                                >
                                    <FontAwesome name="bar-chart" size={22} color="red" />
                                    <Text className="font-extrabold text-center mt-1" style={commonFontSizeStyles.commonButtonSize}>
                                        View Charts
                                    </Text>
                                </Pressable>
                            </View>
                        ) : null
                    }
                </View>

                <ScrollView className="px-10 h-[65%] mt-10">
                    {todoList.length === 0 ? (
                        <Text className="text-center text-gray-500 mt-10">
                            No expenses found 😔😔.
                        </Text>
                    ) : (
                        todoList.map((elm, index) => (
                            <ItemTabs
                                key={index}
                                slNo={(index + 1)}
                                expenseTitle={elm.title}
                                expenseAmount={elm.amount}
                                expenseCategory={elm.category}
                                expenseDateTime={[elm.currentDate, elm.currentTime]}
                                expenseDeleteFunction={() => deleteItem(elm.id)}
                                expenseEditFunction={() => { editTodo(elm.id); setCategoryMode('edit') }}

                            />
                        ))
                    )}
                </ScrollView>
            </ProjectLayout>


            <ModelContainer isVisible={showCategoryModal} title="Select Category">
                <View className="p-5 w-[90%] bg-slate-50 mx-auto rounded-3xl">
                    <View>
                        {categoryMode != 'edit' && <Pressable className="py-3 border-b-2 border-blue-500 flex flex-row justify-center" key={78} onPress={() => setCategoryDeciderFunc('All')}>
                            <Text className="text-center font-bold">All </Text>
                        </Pressable>}
                        {categoryArray.map(
                            ({ categoryLabel, categoryDescription }, index) => (
                                <Pressable className="py-3 border-b-2 border-blue-500 flex flex-row justify-center" key={index} onPress={() => setCategoryDeciderFunc(categoryLabel)}>
                                    <Text className="text-center font-bold" style={commonFontSizeStyles.commonTextContent}>{categoryLabel} -</Text>
                                    <Text className="color-slate-500 px-2" style={commonFontSizeStyles.commonTextContent}>{categoryDescription}</Text>
                                </Pressable>
                            )
                        )}
                    </View>
                    <Pressable className="bg-red-600 py-3 rounded-3xl  my-5" onPress={() => setShowCategoryModal(false)}>
                        <Text className="text-center text-white font-bold" style={commonFontSizeStyles.commonButtonSize}>Close</Text>
                    </Pressable>
                </View>
            </ModelContainer>


            {showChart &&
                <ModelContainer isVisible={showChart} title="Split of Expenses (in % out of 100)">
                    <View className="bg-slate-50 mx-auto flex flex-1 flex-row">
                        <View className="flex flex-row  justify-center items-center mx-auto" style={{ flex: 3 }}>
                            <PieChart
                                data={chartDataArray.chartCreateData}
                                width={chartSize}
                                height={chartSize}
                                chartConfig={chartConfig}
                                accessor={"percentage"}
                                backgroundColor={"transparent"}
                                paddingLeft={width ? String(width * 0.1) : "0"}

                                center={[0, 0]}
                                // absolute
                                hasLegend={false}
                                style={{ marginBottom: 16 }}
                            />
                        </View>
                        <View className="" style={{ flex: 2 }}>
                            {chartDataArray?.chartListData.map((item: any, index: any) => (
                                <View key={index} className="flex flex-row items-center mb-2">
                                    <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                                    <Text style={commonFontSizeStyles.commonTextContent} className="font-bold">{item.percentage}% - {item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Pressable className="bg-red-600 py-3 rounded-3xl mt-8" onPress={() => setShowChart(false)}>
                        <Text className="text-center text-white font-bold" style={commonFontSizeStyles.commonButtonSize}>Close</Text>
                    </Pressable>

                </ModelContainer>}




            <ModelContainer isVisible={openEditTodoModal} title="Edit Todo">
                <View className="mb-5">
                    <InputBox
                        inputBoxLabel="Enter Expense Name"
                        placeholder="Enter Expense Name"
                        value={userExpenseName}
                        onChangeText={setUserExpenseName}
                    />
                </View>

                <View className="mb-5">
                    <InputBox
                        inputBoxLabel="Enter Amount Spent"
                        placeholder="Enter Amount Spent"
                        value={userExpenseAmount}
                        onChangeText={setUserExpenseAmount}
                        keyboardType="numeric"
                    />
                </View>
                <Text className="text-red-500 font-bold  mt-1 mb-3" style={{ fontSize: Math.max(Math.min(RFPercentage(1.2), 20), 10) }}>{errorMsg}</Text>
                <View>
                    <Pressable onPress={() => {
                        setShowCategoryModal(true);
                        setCategoryMode('edit')
                    }}>
                        <InputBox
                            inputBoxLabel="Enter Category"
                            placeholder="Enter Category"
                            value={userCategory}
                            editable={false} // Disable typing
                            pointerEvents="none" // Disable keyboard
                        />
                    </Pressable>
                </View>

                <View className="mt-5 flex flex-row justify-between">
                    <Pressable className="flex-1 mx-1 px-3 py-3 bg-green-700 rounded-2xl">
                        <Text className="text-center font-semibold text-white" onPress={updateSaveTodo} style={commonFontSizeStyles.commonButtonSize}>Edit</Text>
                    </Pressable>
                    <Pressable className="flex-1 mx-1 px-3 py-3 bg-red-500 rounded-2xl">
                        <Text className="text-center font-semibold text-white" style={commonFontSizeStyles.commonButtonSize}
                            onPress={() => {
                                setOpenEditTodoModal(false);
                                setErrorMsg('')
                            }
                            }>
                            Close
                        </Text>
                    </Pressable>
                </View>
            </ModelContainer>


        </>
    )
}

export default ExpenseList;





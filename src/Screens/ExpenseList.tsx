import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Pressable, TextInput } from "react-native";
import ProjectLayout from "../Component/Layout/ProjectLayout";
import ItemTabs from "../Component/UI/ItemTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categoryArray } from "../TS Logic/categoryArray";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import createChartData, { ChartDataArray, StoredDataInterface } from "../TS Logic/chartData";
import ModelContainer from "../Component/Common/ModalContainer";
import InputBox from "../Component/Common/InputBox";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";

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
    const [chartDataArray, setChartDataArray] = useState<ChartDataArray[]>([])
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
        // console.log(todoEdit);
        // setUserTodo(todoEdit)
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
            id: userTodoEdit.id,
        };

        // remove old entry, add updated one
        const arrayWithoutEditElm = parsedTodo.filter((elm) => elm.id != userTodoEdit.id);
        const updatedTodoList = [updatedTodo, ...arrayWithoutEditElm].sort((a, b) => Number(a.id) - Number(b.id));

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

    // useEffect(() => {
    //     console.log(categoryMode);

    // }, [setCategoryMode, categoryMode])

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
                        <Text className="font-extrabold text-lg">{sum}</Text>
                    </View>
                </View>



                <View className="px-5 py-4 flex-row bg-yellow-300">
                    <View className="flex-1 pr-2">
                        <Text className="text-sm font-bold mb-2">Filter by Category:</Text>
                        <Pressable
                            onPress={() => {
                                setShowCategoryModal(true);
                                setCategoryMode("filter");
                            }}>
                            <InputBox
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
                                    <Text className="text-xs font-extrabold text-center mt-1">
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
                    <Text className="mb-6 pt-3 pb-5 font-bold text-xl">Select Category</Text>
                    <View>
                        {categoryMode != 'edit' && <Pressable className="py-3 border-b-2 border-blue-500 flex flex-row justify-center" key={78} onPress={() => setCategoryDeciderFunc('All')}>
                            <Text className="text-center font-bold">All </Text>
                        </Pressable>}
                        {categoryArray.map(
                            ({ categoryLabel, categoryDescription }, index) => (
                                <Pressable className="py-3 border-b-2 border-blue-500 flex flex-row justify-center" key={index} onPress={() => setCategoryDeciderFunc(categoryLabel)}>
                                    <Text className="text-center font-bold" style={{ fontSize: Math.max(Math.min(RFPercentage(1.2), 20), 10) }}>{categoryLabel} -</Text>
                                    <Text className="color-slate-500 px-2" style={{ fontSize: Math.max(Math.min(RFPercentage(1.2), 20), 10) }}>{categoryDescription}</Text>
                                </Pressable>
                            )
                        )}
                    </View>
                    <Pressable className="bg-red-600 py-3 rounded-3xl  my-5" onPress={() => setShowCategoryModal(false)}>
                        <Text className="text-center text-white font-bold text-md">Close</Text>
                    </Pressable>
                </View>
            </ModelContainer>


            <ModelContainer isVisible={showChart} title="Split of Expenses (in % out of 100)">
                <View className="bg-slate-50 mx-auto flex flex-1 flex-row">
                    <View className="flex flex-row  justify-center items-center mx-auto" style={{ backgroundColor: 'yellow', flex: 3 }}>
                        <PieChart
                            data={chartDataArray}
                            width={chartSize}
                            height={chartSize}
                            chartConfig={chartConfig}
                            accessor={"percentage"}
                            backgroundColor={"transparent"}
                            paddingLeft={String(width * 0.1)}
                            center={[0, 0]}
                            absolute
                            hasLegend={false}
                            style={{ marginBottom: 16, elevation: 5 }}
                        />
                    </View>
                    <View className="" style={{ flex: 2 }}>
                        {chartDataArray.map((item, index) => (
                            <View key={index} className="flex flex-row items-center mb-2">
                                <View className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                                <Text style={{ fontSize: Math.max(Math.min(RFPercentage(1.2), 20), 10) }} className="font-bold">{item.percentage}% - {item.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Pressable className="bg-red-600 py-3 rounded-3xl mt-8" onPress={() => setShowChart(false)}>
                    <Text className="text-center text-white font-bold text-md">Close</Text>
                </Pressable>

            </ModelContainer>




            <ModelContainer isVisible={openEditTodoModal} title="Edit Todo">
                <View>
                    <Text className="text-md font-bold mb-2">Enter Item Name : </Text>
                    <InputBox
                        placeholder="Enter Expense Name"
                        value={userExpenseName}
                        onChangeText={setUserExpenseName}
                    />
                </View>

                <View>
                    <Text className="text-md font-bold mb-2">Enter Amount Spent : </Text>
                    <InputBox
                        placeholder="Enter  Amount Spent"
                        value={userExpenseAmount}
                        onChangeText={setUserExpenseAmount}
                        keyboardType="numeric"
                    />
                </View>
                <Text className="text-red-500 font-bold text-sm mt-1">{errorMsg}</Text>
                <View>
                    <Text className="text-md font-bold mb-2">Enter Category:</Text>
                    <Pressable onPress={() => {
                        setShowCategoryModal(true);
                        setCategoryMode('edit')
                    }}>
                        <InputBox
                            placeholder="Enter Category"
                            value={userCategory}
                            editable={false} // Disable typing
                            pointerEvents="none" // Disable keyboard
                        />
                    </Pressable>
                </View>

                <View className="mt-5 flex flex-row justify-between">
                    <Pressable className="w-[48%] px-3 py-3 bg-green-700 rounded-2xl">
                        <Text className="text-center font-semibold text-white" onPress={updateSaveTodo}>Edit</Text>
                    </Pressable>
                    <Pressable className="w-[48%] px-3 py-3 bg-red-500 rounded-2xl">
                        <Text className="text-center font-semibold text-white"
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





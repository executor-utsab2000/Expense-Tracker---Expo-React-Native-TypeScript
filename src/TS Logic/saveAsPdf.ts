import { categoryArray } from "./categoryArray";
import { getPercentage } from "./chartData";

const saveAsPdf = (modelData: any) => {
    // console.log(modelData);
    let todoArray: any = []

    categoryArray.forEach((category: any) => {
        const todoCategoryArray = modelData.todos.filter((elm: any) => elm.category == category.categoryLabel)
        const categoryTotal = todoCategoryArray.reduce((result: number, currVal: any) => result + Number(currVal.amount), 0);
        const categoryPercentage = getPercentage(modelData.budgetSet, categoryTotal);
        // console.log(todoCategoryArray);

        const todoObject = {
            categoryName: category.categoryLabel,
            categoryDescription: category.categoryDescription,
            categoryTodos: todoCategoryArray,
            categoryTotal: categoryTotal,
            categoryPercentage: categoryPercentage
        }

        todoArray.push(todoObject)
    })

    const pdfGenerateJson = {
        title: modelData.title,
        totalRecordCount: modelData.todos.length,
        totalBudget: modelData.budgetSet,
        totalExpenses: modelData.todos.reduce((sum: number, elm: any) => sum + Number(elm.amount), 0),
        remainingAmount: modelData.remainingAmount,
        todos: todoArray
    }

    console.log(JSON.stringify(pdfGenerateJson));
    return pdfGenerateJson;


}

export default saveAsPdf
import { categoryArray } from "./categoryArray";

export interface StoredDataInterface { //declaring the structure of the object comes as todo param
    id: string | number
    title: string,
    amount: string,
    category: string,
    currentDate: string,
    currentTime: string,
}


export interface ChartDataArray { //declaring the structure of the object made by the function
    name: string,
    amountSpent: string,
    percentage: number,
    color: string,
    legendFontColor: string,
    legendFontSize: number,

}

function getPercentage(total_budget: number, amountSpent: number): number {
    let percentage_spent = (amountSpent / total_budget) * 100
    return parseFloat(percentage_spent.toFixed(2));

}


export default function createChartData(todo: StoredDataInterface[], budget: number, remainingAmount: number): ChartDataArray[] {

    let chartDataArray: any = []

    categoryArray.map((category: any) => {

        const productCategoryArray = todo.filter((todoElm: StoredDataInterface) => todoElm.category == category.categoryLabel)
        const categoryTotalExpense = productCategoryArray.reduce((result: number, currentValue: any) => result + Number(currentValue.amount), 0)

        const newObj = {
            name: category.categoryLabel,
            amountSpent: `₹ ${categoryTotalExpense} /-`,
            percentage: getPercentage(Number(budget), Number(categoryTotalExpense)),
            color: category?.categoryColor,
            legendFontColor: 'black',
            legendFontSize: 15
        }

        chartDataArray.push(newObj)
    })


    const remainingAmountObj = {
        name: 'Remaining',
        amountSpent: `₹ ${remainingAmount} /-`,
        percentage: getPercentage(Number(budget), Number(remainingAmount)),
        color: '#d00000',
        legendFontColor: 'black',
        legendFontSize: 15
    }
    chartDataArray.push(remainingAmountObj)

    // console.log(chartDataArray);

    return chartDataArray

}


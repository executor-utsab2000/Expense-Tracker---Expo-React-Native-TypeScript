import { categoryArray } from "./categoryArray";

export  interface StoredDataInterface { //declaring the structure of the object comes as todo param
    title: string,
    amount: string,
    category: string,
    currentDate: string,
    currentTime: string,
}


interface ChartDataArray { //declaring the structure of the object made by the function
    name: string,
    amountSpent: string,
    percentage: number,
    color: string,
    legendFontColor: string,
    legendFontSize: number,

}

function getPercentage(total_budget: number, amountSpent: number): number {
    // total_budget = 100;
    let percentage_spent = (amountSpent / total_budget) * 100
    return percentage_spent;

}


export default function createChartData(todo: StoredDataInterface[], budget: number, remainingAmount: number): ChartDataArray[] {

    let chartDataArray = []
    todo.forEach((element: any) => {
        const matchedCategory = categoryArray.find(elm => element.category == elm.categoryLabel);

        const newObj = {
            name: element.category,
            amountSpent: `₹ ${element.amount} /-`,
            percentage: getPercentage(budget, Number(element.amount)),
            color: matchedCategory?.categoryColor,
            legendFontColor: 'black',
            legendFontSize: 15
        }

        chartDataArray.push(newObj)
    });

    const remainingAmountObj = {
        name: 'Remaining',
        amountSpent: `₹ ${remainingAmount} /-`,
        percentage: getPercentage(budget, Number(remainingAmount)),
        color: '#a7c957',
        legendFontColor: 'black',
        legendFontSize: 15
    }
    chartDataArray.push(remainingAmountObj)
    return chartDataArray
}


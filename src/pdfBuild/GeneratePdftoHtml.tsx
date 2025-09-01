import React, { useEffect, useState } from 'react'
import { formatAmount } from '../TS Logic/formatAmount'
import { Asset } from "expo-asset";
import AsyncStorage from '@react-native-async-storage/async-storage';
const logo = Asset.fromModule(require("../../assets/adaptive-icon.png")).uri;


const GeneratePdftoHtml = (data: any) => {

    const [userName, setUserName] = useState<any>('')

    useEffect(() => {
        async function getUserName() {
            const userNameData = await AsyncStorage.getItem("userName");
            setUserName(userNameData)
        }
    }, [])

    return `

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
        .mainContainer {
            margin-top: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 90%;
        }

        .topDiv {
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
        }

        .topDiv .imageLogo img {
            min-height: 100px;
            height: 12vh;
            max-height: 120px;
        }

        .topDiv .userDetails {
            text-align: center;
            width: 100%;
            font-weight: 700;
            /* letter-spacing: 1px; */
        }

        .topDiv .userDetails .appName {
            font-size: 3rem;
            font-weight: 800 !important;
        }

        .topDiv .userDetails .userName {
            font-size: 1.2rem;
        }

        .topDiv .userDetails .monthName {
            margin-top: 10px;
            font-size: 1.5rem;
        }

        .summaryDiv {
            margin-bottom: 50px;
            border-bottom: 2px solid gray;
            padding-bottom: 30px;

        }

        .summaryDiv table {
            font-size: 1rem;
            text-align-last: left;
        }

        .summaryDiv table td:first-of-type {
            padding-left: 10px;
            padding-right: 10px;
            font-weight: 800;
        }

        .summaryDiv table td:last-of-type {
            font-weight: 800;
            color: red;
        }

        .expenseDiv table {
            width: 100%;
            font-size: 13px;
            font-weight: 600;
        }

        .expenseDiv table .tableHeader {
            padding-top: 20px;
            padding-bottom: 20px;
            background-color: #353535;
            color: white;
        }

        .expenseDiv table td {
            padding-top: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid gray;
            text-align: center;
        }

        .categoryName {
            text-align-last: left;
            padding-left: 20px;
            font-size: 15px;
            padding-top: 13px;
            padding-bottom: 13px;
            background-color: #dad7cd;
        }

        .categoryTotal {
            font-weight: 600;
        }

        .grandTotal {
            padding-top: 20px;
            padding-bottom: 20px;
            background-color: #979dac;
            font-size: 1.1rem;
            font-weight: 800;
        }

        .footer {
            margin-top: 50px;
            background-color: #353535;
            color: white;
            text-align: center;
            font-weight: 700;
            font-size: 14px;
            padding-top: 20px;
            padding-bottom: 20px;
        }
    </style>
</head>

<body>
    <div class="mainContainer">
        <div class="container">

            <div class="topDiv">
                <div class="imageLogo">
                    <img src="${logo}" alt="">
                </div>
                <div class="userDetails">
                    <div class="appName">Expense Tracker</div>
                    <div class="userName">${userName}</div>
                    <div class="monthName">Expenses for the Month of ${data.title}</div>
                </div>
            </div>
            <div class="summaryDiv">
                <table>
                    <tr>
                        <th>Total Record Count</th>
                        <td> : </td>
                        <td>${data.totalRecordCount}</td>
                    </tr>
                    <tr>
                        <th>Total Budget Set</th>
                        <td> : </td>
                        <td>${formatAmount(data.totalBudget)}</td>
                    </tr>
                    <tr>
                        <th>Total Expenses</th>
                        <td> : </td>
                        <td>${formatAmount(data.totalExpenses)}</td>
                    </tr>
                    <tr>
                        <th>Total Remaining Budget</th>
                        <td> : </td>
                        <td>${formatAmount(data.remainingAmount)}</td>
                    </tr>
                </table>
            </div>

            <div class="expenseDiv">
                <table>
                    <tr>
                        <th class="tableHeader">Sl No.</th>
                        <th class="tableHeader">Expense Name</th>
                        <th class="tableHeader">Category Total Amount (₹)</th>
                        <th class="tableHeader">Date Spend on</th>
                        <th class="tableHeader">Time Spend on</th>
                        <th class="tableHeader">Expense Amount (₹)</th>
                        <th class="tableHeader">Grand Total Amount (₹)</th>
                    </tr>

                    ${data.todos.map((elm: any, index: any) => {
        return `
                    <tr>
                        <th class="categoryName">${index + 1}</th>
                        <th colspan="6" class="categoryName">${elm.categoryName} - ${elm.categoryDescription}</th>
                    </tr>

                    ${elm.categoryTodos.map((categoryData: any, innerIndex: any) => {
            return `
                    <tr>
                        <td>${index + 1}.${innerIndex + 1}</td>
                        <td>${categoryData.title}</td>
                        <td>${formatAmount(categoryData.amount)}</td>
                        <td>${categoryData.currentDate}</td>
                        <td>${categoryData.currentTime}</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    `
        })
            }


                    <tr>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>
                            <div class="categoryTotal">${formatAmount(elm.categoryTotal)}</div>
                            <div class="categoryTotal">( ${elm.categoryPercentage}% of budget )</div>
                        </td>
                        <td>-</td>
                    </tr>
                    `
    })
        }

                    <tr>
                        <td class="grandTotal">-</td>
                        <td class="grandTotal">-</td>
                        <td class="grandTotal">-</td>
                        <td class="grandTotal">-</td>
                        <td class="grandTotal">-</td>
                        <td class="grandTotal">-</td>
                        <td class="grandTotal">${formatAmount(data.totalExpenses)}</td>
                    </tr>

                </table>
            </div>
        </div>

    </div>
    <div class="footer">Generated on ${new Date().toLocaleDateString()}</div>
</body>

</html>

`
}

export default GeneratePdftoHtml
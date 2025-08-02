import React from 'react'
import { Pressable, Text, View } from 'react-native'

interface BudgetDisplay {
    budget: number
    remainingAmount: number
}

const TopBudgetRemainingDisplay = ({ budget, remainingAmount }: BudgetDisplay) => {
    return (
        <>
            <View className="my-auto">
                <Text className="text-sm font-extrabold color-red-600">Total Monthly Budget : {budget}</Text>
                <Text className="text-sm font-extrabold color-red-600">Remaining Monthly Budget : {remainingAmount}</Text>
            </View>
        </>
    )
}

export default TopBudgetRemainingDisplay
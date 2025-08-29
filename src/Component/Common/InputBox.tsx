import React from 'react'
import { Text, TextInput, TextInputProps } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import commonInputFontSize from '../../CSS/commonStyleSheet'

// The purpose of TextInputProps is to inherit all the built-in props that React Native’s <TextInput> component supports — so you don’t have to redefine them manually in your InputBox component

// This interface extends TextInputProps to include custom properties for the InputBox component
interface InputTextBoxInterface extends TextInputProps {
    placeholder: string
    inputBoxLabel: string,
    value: any
    editable?: boolean
    pointerEvents?: 'auto' | 'none'
    onChangeText?: (text: string) => void;
}

const InputBox = ({
    inputBoxLabel,
    placeholder,
    value,
    editable = true,
    pointerEvents = 'auto',
    onChangeText,
    ...props
}: InputTextBoxInterface) => {
    return (
        <>
            <Text className="font-bold mb-2" style={commonInputFontSize.commonHeaderFontSize}>{inputBoxLabel}</Text>
            <TextInput
                className="w-full border border-gray-300 rounded-md px-4  text-base bg-slate-50 font-semibold"
                placeholder={placeholder}
                value={value}
                editable={editable}
                pointerEvents={pointerEvents}
                onChangeText={onChangeText}
                {...props}
                style={[
                    commonInputFontSize.commonInputFontSize, // base style
                    props.style, // allow overriding from parent
                ]}
            />
        </>
    )
}

export default InputBox

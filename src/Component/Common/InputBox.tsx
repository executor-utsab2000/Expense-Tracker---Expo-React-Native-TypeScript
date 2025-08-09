import React from 'react'
import { TextInput, TextInputProps } from 'react-native'


// The purpose of TextInputProps is to inherit all the built-in props that React Native’s <TextInput> component supports — so you don’t have to redefine them manually in your InputBox component

// This interface extends TextInputProps to include custom properties for the InputBox component
interface InputTextBoxInterface extends TextInputProps {
    placeholder: string
    value: any
    editable?: boolean
    pointerEvents?: 'auto' | 'none'
    onChangeText?: (text: string) => void;
}

const InputBox = ({
    placeholder,
    value,
    editable = true,
    pointerEvents = 'auto',
    onChangeText,
    ...props
}: InputTextBoxInterface) => {
    return (
        <TextInput
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-slate-50 font-semibold"
            placeholder={placeholder}
            value={value}
            editable={editable}
            pointerEvents={pointerEvents}
            onChangeText={onChangeText}
            {...props}
        />
    )
}

export default InputBox

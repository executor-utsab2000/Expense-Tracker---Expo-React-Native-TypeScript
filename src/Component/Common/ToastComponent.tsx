import React from 'react'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


interface ToastLibraryProps {
    type: 'success' | 'error' | 'info',
    text1: string,
    text2: string,
}

const toastHelperCallingFunc = ({ type, text1, text2 }: ToastLibraryProps) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
    });
}


const ToastComponent = () => {

    const toastConfig = {
        error: (props: any) => (
            <ErrorToast
                {...props}
                text1NumberOfLines={2}
                text2NumberOfLines={10}
                text1Style={{ fontSize: 14 }}
                text2Style={{
                    fontSize: 12,
                    flexWrap: 'wrap',
                    color: '#333',
                    marginTop: 5,
                }}
                style={{
                    minHeight: 100, // ✅ Increase height here
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    borderLeftColor: 'red',
                    borderLeftWidth: 5,
                }}
            />
        ),
    };

    return (

        <>
            <Toast
                config={toastConfig}
                position="top" // or "top"
                topOffset={100} // keeps it above gesture bar
                visibilityTime={1500} //  1.5s then auto‑hide
            />
        </>
    )
}




export { ToastComponent, toastHelperCallingFunc }
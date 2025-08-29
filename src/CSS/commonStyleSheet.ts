import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const commonFontSizeStyles = StyleSheet.create({
    commonInputFontSize: {
        fontSize: Math.max(Math.min(RFPercentage(1.2), 20), 10)
    },

    commonButtonSize: {
        fontSize: Math.max(Math.min(RFPercentage(1.2), 20), 10),
        fontWeight: 700,
        letterSpacing: 1
    },

    commonTextContent: {
        fontSize: Math.max(Math.min(RFPercentage(1.2), 20), 10)
    },
    commonHeaderFontSize: {
        fontSize: Math.max(Math.min(RFPercentage(1.5), 20), 10)
    },

    chartFont: {
        fontSize: Math.max(Math.min(RFPercentage(1), 20), 10)
    }


});


export default commonFontSizeStyles


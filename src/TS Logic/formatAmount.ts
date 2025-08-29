export const formatAmount = (num: any) => {
    let formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formatted
}
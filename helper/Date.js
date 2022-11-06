export const ChangeCuDate = (date) => {
    const dateNo = new Date(date);
    return dateNo.toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2");
};
export const ChangeAm = (data) => {
    return new Date('7/10/2013 20:12:34').toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3").split(" ")[1] === "AM" ? "12:01" : "4:30"
}
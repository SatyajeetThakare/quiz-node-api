module.exports.groupByKey = function (communications) {

    let array = JSON.parse(JSON.stringify(communications));
    letFinalArray = [];
    array = array.map((item) => {
        return {
            ...item,
            content: [].concat(item.content)
        }
    }) // Converting the createdBy key from object to array

    let temp = [];

    for (let i = 0; i < array.length; i++) {
        const index = temp ? temp.findIndex(element => element.createdBy._id === array[i].createdBy._id
            && element.topic._id === array[i].topic._id) : -1; // Checking if the object id is already present
        if (index >= 0) {
            letFinalArray[index].content = [...letFinalArray[index].content, ...array[i].content] // If present then append the createdBy to the createdBy of that object
        } else {
            let obj = { createdBy: { '_id': array[i].createdBy._id }, topic: { _id: array[i].topic._id } };
            temp.push(obj); // Push the checked object id
            letFinalArray.push({ ...array[i] }) // Push the object
        }
    }
    // const result = letFinalArray.map(m => m);
    let result = JSON.parse(JSON.stringify(letFinalArray));
    return result;
}
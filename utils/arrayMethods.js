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
        const index = temp.indexOf(array[i].createdBy._id) // Checking if the object id is already present
        if (index >= 0) {
            letFinalArray[index].content = [...letFinalArray[index].content, ...array[i].content] // If present then append the createdBy to the createdBy of that object
        } else {
            temp.push(array[i].createdBy._id); // Push the checked object id
            letFinalArray.push({ ...array[i] }) // Push the object
        }
    }
    // const result = letFinalArray.map(m => m);
    let result = JSON.parse(JSON.stringify(letFinalArray));
    return result;
}
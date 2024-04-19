const sequentilSearch = (arr, target) => {
    const lowercaseTarget = target.toLowerCase();
    const result = [];
    
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].nama.toLowerCase() === lowercaseTarget) {
            result.push(arr[i]);
        }
    }
    return result;
}

module.exports = {sequentilSearch}
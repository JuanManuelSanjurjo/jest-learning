function sum(a, b){
    if(isNaN(a) || isNaN(b)) return NaN
    return a + b;
}

function myFunction(input){
    if(typeof input !== 'number'){
        throw new Error('Invalid Input');
    }
}

function fetchData(callbackFunc){
    setTimeout(()=> {
        callbackFunc("apple")
    },1000)
}

function fetchDataWithPromise(outcome){
    return new Promise((resolve,rejects) => {
        setTimeout(()=> {
            if(outcome === "resolve"){
                resolve("apple")
            }else{
                rejects(new Error("Fetch operation failed"))
            }
        }, 1000)
    })
}


module.exports = { sum, myFunction, fetchData, fetchDataWithPromise }




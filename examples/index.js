// let counter = 0
// for (let i=30;i>=counter;i--){
//     console.log(i);
// }


function calTime(){

    console.time()
    setTimeout(callTime, 1000)
}

function callTime(){
      console.timeEnd()
}

calTime()
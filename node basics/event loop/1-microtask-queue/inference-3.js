process.nextTick(()=>console.log("This is nextTick 1")) // call back 1
process.nextTick(()=>{            //callback 2
  console.log("This is nextTick 2")                  
  process.nextTick(()=>{          //callback 4
    console.log("this is inner nexttick in nexttick 2")
  })
})
process.nextTick(()=>console.log("This is nextTick 3")) //callback 3


// first callback 1,2,3 goes in nexttick queue and when call back one is done executing callback 2 starts and put the inner callback to nexttick queue behind the callback 3
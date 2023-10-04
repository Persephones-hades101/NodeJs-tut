// callbacks in microtask queue are executed in between the execution of callbacks in the timer queue

setTimeout(() => {
  console.log("settime out 1")
}, 0);


setTimeout(() => {
  console.log("settime out 2")

  process.nextTick(()=>{
    console.log("next tick within the second settimeout")
  })

  Promise.resolve().then(()=>{console.log("promise within the second setimeout")})

  setTimeout(()=>{
    console.log("settime out inside  settimeout 2")
  },0)
}, 0);

setTimeout(() => {
  console.log("settime out 3")
}, 0);

//  why this happend because after execution of every callback in timer-queue it goesback and check the microtask queue, if there is any callback then it executes it.
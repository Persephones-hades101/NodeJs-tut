// microtask queue has 2 types of queue namely the nextTick queue and the promise queue 
// nextTick queue  has higher priority than promise queue ie all the call backs in nextTick queue are execute before the callbacks in the promise queue


Promise.resolve().then(() => {
  console.log("promise 1");
})
process.nextTick(() => {
  console.log("nextTick 1");
})


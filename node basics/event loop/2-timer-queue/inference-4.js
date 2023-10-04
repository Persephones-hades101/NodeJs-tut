// timer-queues stores the callbacks of settimeout and and settimeinterval
// callback in microtask queue are executed before the timer-ques


setTimeout(() => {
  console.log("settime out 1")
}, 0)

Promise.resolve().then(() => {
  console.log("promise 1");
})

process.nextTick(() => {
  console.log("nextTick 1");
})

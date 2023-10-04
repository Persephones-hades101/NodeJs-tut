// javascript gives priority to sync codes over async codes. all async codes and call backs are made to sit in event loop (in various queues) untill all the user code has gone through the call stack and its empty

console.log("Message 1");
process.nextTick(()=>{
  console.log("Message 2");
})
console.log("Message 3")


// you can see js first executes the sync codes ie message 1 and 3.

// step by step execution.
// js reads line 3 ,it puts the console.log(message 1) in call stack ,executes it and pops it out 
// then it reads process.nextTick, puts it in call stack ,and then puts it callback to the nextTick queue (Which is a microtask queue in event loop),then it pops out nextTick. now the callback in nextTick queue has to wait for the rest of the program to execute .
//  now js reads line 7 and repeats step 1 and now there is no more user command to be executed and call stack is empty,so  now the callbacks in the queue are executed .  
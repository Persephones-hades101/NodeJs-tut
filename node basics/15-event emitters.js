const EventEmitter=require('events');
const eventEmitter=new EventEmitter();



eventEmitter.on("start",()=>{
  console.log("Started");
})
eventEmitter.emit('start')


// eventEmitter with parameters 
eventEmitter.on("started with parameters",(name,age)=>{
  console.log(`Started with the name ${name} and age ${age}`);
})
eventEmitter.emit('started with parameters',"sudhanshu",19)


// same event with two different listeners
const listener1=()=>{
  console.log(`called listener1`)
}
const listener2=()=>{
  console.log(`called listener2`)
}

eventEmitter.on("myevent",listener1)
eventEmitter.on("myevent",listener1)
eventEmitter.on("myevent",listener2)

eventEmitter.emit("myevent");
eventEmitter.removeListener("myevent",listener1)
eventEmitter.emit("myevent");
eventEmitter.removeAllListeners("myevent")
console.log("hello")

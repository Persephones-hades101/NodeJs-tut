const {createReadStream}=require('fs')
const stream=createReadStream('./content/big-file.txt',{
  highWaterMark:1000
})

stream.on("data",(chunk)=>{
  console.log(chunk);
})
stream.on("error",(err)=>{
  console.log(err);
})
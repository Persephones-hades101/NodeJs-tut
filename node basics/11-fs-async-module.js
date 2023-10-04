const { readFile, writeFile } = require('fs');


// const fs=require('fs');
// console.log(fs);


console.log("start")
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  const first=result;
  readFile('./content/second.txt','utf8',(err,result)=>{
    if(err)
    {
      console.log(err);
      return;
    }
    const second=result;
    writeFile('./content/write-on-this-async.txt',
`fisrt:${first}
second:${second}`,
    (err,result)=>{
      if(err){
        console.log(err);
        return;
      }
      console.log("Done with this task");
    }
    )
  })
})

console.log("Starting new task");
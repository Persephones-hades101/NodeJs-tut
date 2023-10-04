const { log } = require('console');
const fs=require('fs');


// Reading from the file
console.log("Start")
const first=fs.readFileSync('./content/first.txt','utf8')
const second=fs.readFileSync('./content/second.txt','utf8')

// log(first,second)

// writing on the file
// fs.writeFileSync('./content/write-on-this.txt',
//                     `This file is written on by first.txt and second.txt:${first},${second}`);

// appending on the file . just pass 3rd argument as object with a properth flag:'a'.

fs.writeFileSync('./content/write-on-this-sync.txt',
                    `This file is written on by first.txt and second.txt:${first},${second}`,{
                      flag:'a'
                    });


console.log("done with the task")
console.log("Starting a new one")
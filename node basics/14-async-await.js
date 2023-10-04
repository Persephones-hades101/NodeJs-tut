const { readFile, writeFile } = require('fs')
const util = require('util') // util is built-in module containing the method promisify
const readFilePromise = util.promisify(readFile);
const wriiteFilePromise = util.promisify(writeFile);

const start = async () => {
  try {
    console.log('Before readFilePromise first.txt');
    const first = await readFilePromise('./content/first.txt', 'utf8');
    console.log('After readFilePromise first.txt');
    
    console.log('Before readFilePromise second.txt');
    const second = await readFilePromise('./content/second.txt', 'utf8');
    console.log('After readFilePromise second.txt');
    
    console.log(first, second);
    
    
  }
  catch(error){
    console.log(error);
  }
}

start()


// console.log("apple banana")
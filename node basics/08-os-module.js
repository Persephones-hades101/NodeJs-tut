
// os is a built-in module in node js and we do not use ./ in require to tell thats its a built-in module

const os = require('os')

console.log(os.userInfo());// gives user info
console.log(os.uptime())

const osData={
  type:os.type(),
  release:os.release(),
  memInfo:[os.totalmem(),os.freemem()]
}
console.log(osData);
const http = require('http')

// console.log(http)

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end("Welcome to our homePage");
  }
  else if (req.url === '/about') {
    res.end("This is our about page")
  }
  else {
    res.end(`
      <h1>OOPS!</h1>
      <P>I guess There is no such resource you are looking for</P>
      <a href='/'>Back Home</a>`)
  }



  // res.end("This is our homePage")

})

server.listen(5000)
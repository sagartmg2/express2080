
http.createServer((req,res) =>{
  console.log(req.url);
  console.log(req.method);

  if(req.url == "/todos" && req.method == "GET"){
    res.write(JSON.stringify(["react","express"])); //write a response to the client
    res.end(); 
  }
  else if(req.url == "/todos" && req.method == "POST"){
    res.write('create new todos..'); //write a response to the client
    res.end(); 
  }
  else if(req.url == "/signup" && req.method == "POST"){
    // auth.signup("ram", "ram@gmailcom", "Password");
    res.write('create new todos..'); //write a response to the client
    res.end(); 
  }
  else if(req.url == "/login" && req.method == "POST"){
    // auth.login("ram", "ram@gmailcom", "Password");
    res.write('create new todos..'); //write a response to the client
    res.end(); 
  }
}).listen(8000)
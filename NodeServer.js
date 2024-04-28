/*
Sanquez Heard
Hangman Project
04/27/2024
*/

//Node modules required to serve website on server
let http = require('http');
let fs = require('fs');
let url = require('url');

//Utilized the modules above to create a server.
http.createServer(function (req, res) {
  let parsedUrl = url.parse(req.url, true);
  let filePath = "";
  if (parsedUrl.pathname === '/') { //If the user visits the main page,
    filePath = './index.html'; //provide them with the homepage HTML file in this current directory.
  } 
  else { //Otherwise,
    filePath = '.' + parsedUrl.pathname; //handle requests dynamically.
  }

  fs.readFile(filePath, function(err, data) {
    if (err) { //If a direcory requested does not exist,
      res.writeHead(404, { 'Content-Type' : 'text/html' }); //send the user an error message.
      res.end("Page not found. Please revisit the previous page or go to homepage.");
    } 
    
    else { //Otherwise, serve the directory requested by the user based on the content types accounted for.
      let contentType = "";
      if (filePath.endsWith('.html'))
        contentType = 'text/html';

      else if (filePath.endsWith('.js'))
        contentType = 'text/javascript';

      else if (filePath.endsWith('.css'))
        contentType = 'text/css';

      else if (filePath.endsWith('.png'))
        contentType = 'image/png';
      
      else if (filePath.endsWith('.jpg'))
        contentType = 'image/jpeg';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    }
  });
}).listen(8080); //Listening on port 8080 as localhost

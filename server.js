const http = require('http');
const fs = require('fs'); 
const _ = require('lodash');

const sever = http.createServer((request, response)=>{
     //lodash
     const num = _.random(0, 20);
     console.log(num)
     const greet = _.once(()=>{
         console.log('greet')
     })
     greet();
     greet()
    //Set response
    response.setHeader('Content-Type', 'text/html');
    //set routing 
    let path = './views/';
    switch (request.url) {
        case '/': path+= 'index.html';
        response.statusCode = 200;
            break;
            
        case '/about': path+= 'about.html';
        response.statusCode = 200;
            break;

        default: path+= '404.html';
        response.statusCode = 404;
            break;
    }
    //returning an html file
    fs.readFile(path, (err, file)=>{
        if (err){
            console.log(err)
            response.end()
        }
        else{
            response.write(file)
            response.end()
        }
    })
});

sever.listen('2000', 'localhost', ()=>{
    console.log('Listening for request')
})
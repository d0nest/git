import { createServer } from 'node:http'
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs'
import {Formidable} from 'formidable';


let server = new createServer();
let file = fileURLToPath(import.meta.url);
let __dirname = dirname(file);
let filePath = path.join(__dirname, 'center', 'main.html');
let content;

server.on('request', (req, res) =>{
    if(req.method === 'POST' && req.url === '/files/upload'){
        let form = new Formidable();
        form.keepExtensions = true;
        form.uploadDir = './uploads';
        form.parse(req, (err, fields, files) =>{
            if(err){
                res.writeHead(500, {'content-type': 'text/plain'})
                res.end('Error parsing the upload!')
            }
            try{
                let pathToFile = path.join(__dirname, 'uploads')
                fs.writeFile('pathToFile', files, () =>{
                    
                })
            }
            catch(err){
                console.log('error is thrown while writing the file in the upload directory:', err);
            }
        });
    }
    else if(req.url === '/' && req.method === 'GET'){
        try{
            fs.readFile(filePath, 'utf8', (err, data)=>{
                if(!err){
                    content = data;
                }
                else{
                    throw err;
                }
            })
        }
        catch(err){
            console.error('error is caught', err);
        }
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(content);
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log(`server is listening to http://localhost:3000`)
});


import { createServer } from 'node:http'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url';
import path from 'node:path'
import { AppDataSource } from './build/data-source.js';
import { User } from './build/entity/User.js';

let server = new createServer();
// server is a instance of event emmiter.
server.on('request', (req, res) =>{

    const filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(filename);
    const filepath = path.join(__dirname, 'signup.html')
    
    if(req.url === '/'){    
        fs.readFile(filepath, (err, content)=>{                
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(content)
        });
    }
    else if(req.url === '/create/user'){
        let body = '';
        
        req.on('data', (chunk)=>{
            body += chunk;
        });
        
        req.on('end', async () =>{
            let contentType = req.headers['content-type'];
              if(contentType === 'application/json'){
                    const user = JSON.parse(body);
                    try{
                        AppDataSource.initialize().then(async ()=>{
                            const dataSource =  AppDataSource.getRepository(User);
                            await dataSource.save(user);
                            console.log('user is created!')
                            
                        }).catch((err)=>{
                            console.error('error initializing appDataSource',err)
                        })
                    }
                    catch(err){
                        console.error('error creating user, ', err);
                    }
                    
                }
              else if(contentType === 'text/plain'){
                console.log('is it a string?')
              }
        })
    }
});

server.listen('3000', 'localhost', ()=>{
    console.log('server is listening on http://localhost:3000');
})
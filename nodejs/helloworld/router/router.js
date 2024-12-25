// a centralized place to map urls to files/handlers;
// it may need access to urls and all the files or handlers;
// main file the file which is responsible for listening needs to access this file.
// i saw a statement export which is needed to make it available.
import path from 'node:path';
import fs from 'node:fs/promises';
import http from 'node:http';

async function router(req,res,__dirname){ 
const routes = JSON.parse(await fs.readFile(path.join(__dirname, "router", 'routes.json')))
const filePath = routes[req.url] ? path.join(__dirname, "public", routes[req.url]): null;
const metaType = {
    'html': 'text/html',
    'txt': 'text/plain'
}
function getContentType(){
    const fileName = routes[req.url];
    let contentType;
    if(fileName.includes('html')){
         contentType = metaType['html'];
    }
    else if(fileName.includes('txt')){
         contentType = metaType['txt'];
    }
    return contentType;
}
    
if(filePath){
    try{   
            const content = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, { "content-type": getContentType() });
            res.end(content);
        }
    catch(err){
            res.writeHead(500, {"content-type": "text/plain"});
            res.end('internal server error');
        }

    }
    else{
        res.writeHead(404, {"content-type": "text/plain"})
        res.end("404, not found")
    }
}

export default router;
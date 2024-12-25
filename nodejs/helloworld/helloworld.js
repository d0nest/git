import  {createServer} from "node:http"
import * as path from 'node:path'
import * as fs from "node:fs/promises"
import { fileURLToPath} from 'node:url'
import routes from './router/router.js'
import router from "./router/router.js"

const hostname = '127.0.0.1'
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer();


server.on("request", async (req, res) => {
    const {method, url} = req;
    res.setHeader('Access-Control-Allow-Origin', '*')
    router(req, res, __dirname);
})

server.listen(port, hostname, () => {
    console.log('server is connected to http://127.0.0.1:3000')
})

class Hello {
     sayHelloTo(name){
        return `Hello, ${name}`;
    }
}
export default Hello;
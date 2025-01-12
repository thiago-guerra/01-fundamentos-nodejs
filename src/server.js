import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";


const server = http.createServer(async (req, res) =>{
   const { method, url } = req;

   await json(req, res);

   const route = routes.find(x => {
    return x.method === method && x.path.test(url);
   });

   if (route) {
        const routeParams = req.url.match(route.path);
        const groups =  routeParams.groups;
        req.params = groups;
       return route.handler(req, res);
   }

   return res.writeHead(404).end();
});

server.listen(3333,
    () => console.log("Server is running http://localhost:3333")
);

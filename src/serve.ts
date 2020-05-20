import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
import { Logger } from "./handlers/logger.ts";
import { Router } from './handlers/router.ts';
import { readConfig } from "./handlers/read_conf.ts";
const Config = await readConfig('./config.json');
const { port } = Config;


const router = new Router('./router.json');
const s = serve({ port: port });
Logger.log(`Starting Server on https://localhost:${port}`)


for await (const req of s) {
  router.route(req);
}
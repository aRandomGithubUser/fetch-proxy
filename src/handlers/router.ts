import { readFileStr } from 'https://deno.land/std@0.50.0/fs/read_file_str.ts';
import { ServerRequest } from 'https://deno.land/std@0.50.0/http/server.ts';
import { Logger } from './logger.ts';

export class Router {
  public configurationContents: RouterConfiguration = {};
  constructor(path: string) {
    readFileStr(path).then(data => {
      this.configurationContents = JSON.parse(data);
    })
  }

  public async route(req: ServerRequest) {
    const fetchURL = this.configurationContents[req.url];
    if (fetchURL) {
      const res = await fetch(fetchURL).catch(Logger.err);
      
      if (res && res.body) {
        const data = JSON.stringify(await res.json().catch(Logger.err));
        
        req.respond({
          headers: res.headers,
          status: res.status,
          body: data
        }).catch(Logger.err)
      }

    }
    else 
    {
      
      req.respond({ status: 404, body: 'Not Found' })
    }
  }
}

export type RouterConfiguration = Record<string, string>;
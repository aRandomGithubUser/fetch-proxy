import { readFileStr } from 'https://deno.land/std/fs/read_file_str.ts';
import { Logger } from './logger.ts';

export async function readConfig(path: string): Promise<Config> {
  const file = await readFileStr(path).catch(Logger.err)
  if (file) {
    return JSON.parse(file)
  }
  else
  {
    return { port: 8080 }
  }
}

export interface Config {
  port: number;
}
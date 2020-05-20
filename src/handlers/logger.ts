export namespace Logger {
  export async function log(msg: any) {
    console.log(`[SERVER]: ${msg}`);
  }
  export async function err(msg: any) {
    console.error(`[ERROR] ${msg}`);
  }
  export async function info(msg: any) {
    console.info(`[INFO]; ${msg}`);
  }
}
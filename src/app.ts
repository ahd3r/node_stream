import * as http from 'http';
import { Controller } from './controller';

export class App {
  private static app: App | null = null;

  private constructor() {}

  public static getApp(): App {
    if (!this.app) {
      this.app = new App();
    }
    return this.app;
  }
  private send(res: http.ServerResponse, msg: {}): void {
    res.end(Buffer.from(JSON.stringify(msg)));
  }
  public async routes(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      if (req.method === 'GET') {
        if (req.url === '/') {
          await Controller.backAllVideoList(req, res);
        } else if (
          /^\/media\//.test(String(req.url)) &&
          req.url !== '/media/'
        ) {
          await Controller.backVideo(req, res);
        } else {
          this.send(res, { err: '404: Page Not Found (Wrong url)' });
        }
      } else if (req.method === 'POST') {
        await Controller.createVideo(req, res);
      } else {
        this.send(res, { err: '404: Page Not Found (Wrong method)' });
      }
    } catch (err) {
      this.send(res, err);
    }
  }
}

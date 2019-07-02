// import { Readable, Writable, Duplex, Transform } from 'stream';
import * as http from 'http';
// import * as fs from 'fs';
// import { promisify } from 'util';
// import { VideoSchema } from '../helper/schema';
import * as validator from 'validator';
// import { IVideo } from './interfaces';
import { Video } from './service';

export class Controller {
  private static Service: Video = Video.getService();

  private static send(res: http.ServerResponse, msg: [] | {}): void {
    res.end(Buffer.from(JSON.stringify(msg)));
  }

  public static async backAllVideoList(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): Promise<void> {
    try {
      this.send(res, await this.Service.getAll());
    } catch (err) {
      throw new Error(err.message);
    }
  }
  public static async backVideo(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): Promise<void> {
    try {
      const VideoId: string = String(req.url).slice('/media/'.length);
      if (validator.isMongoId(VideoId)) {
        this.send(res, await this.Service.getOne(VideoId));
      } else {
        throw new Error('Wrong id');
      }
    } catch (err) {
      throw new Error(err.message);
    }
    // const { size } = await promisify(fs.stat)();
    // if (req.headers.range) {
    //   const parts: string[] = req.headers.range
    //     .replace(/bytes=/, '')
    //     .split('-');
    //   const start: number = parseInt(parts[0]);
    //   const end: number = parts[1] ? parseInt(parts[1]) : size - 1;
    //   const chunksize: number = end - start + 1;
    //   res.writeHead(206, {
    //     'Content-Range': `bytes ${start}-${end}/${size}`,
    //     'Accept-Ranges': 'bytes',
    //     'Content-Length': chunksize,
    //     'Content-Type': 'video/mp4',
    //   });
    //   fs.createReadStream(path, { start, end }).pipe(res);
    // } else {
    //   res.writeHead(200, {
    //     'Content-Length': size,
    //     'Content-Type': 'video/mp4',
    //   });
    //   fs.createReadStream(path).pipe(res);
    // }
  }
  public static async createVideo(
    req: http.IncomingMessage,
    res: http.ServerResponse,
  ): Promise<void> {
    try {
      this.send(res, req);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

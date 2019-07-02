// import { IVideo } from '../helper/interfaces';
import { VideoSchema } from '../helper/schema';
import { VideoDto } from '../helper/dto';

export class Video {
  private static Service: Video | null = null;

  private constructor() {}

  public static getService(): Video {
    if (!this.Service) {
      this.Service = new Video();
    }
    return this.Service;
  }

  public async getAll() {
    try {
      return await VideoSchema.find();
    } catch (err) {
      throw new Error(err);
    }
  }
  public async getOne(id: string) {
    try {
      const video: {} | null = await VideoSchema.findById(id);
      if (video) {
        return video;
      } else {
        throw new Error('This video does not exist');
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  public async create(data: VideoDto) {
    try {
      return await VideoSchema.create(data);
    } catch (err) {
      throw new Error(err);
    }
  }
  public async delete(id: string) {
    try {
      const video: {} | null = await VideoSchema.findById(id);
      if (video) {
        await VideoSchema.findByIdAndDelete(id);
        return video;
      } else {
        throw new Error('This Id does not exist');
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

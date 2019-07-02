import { ObjectId } from 'bson';
import { FormatInputPathObject } from 'path';

export interface IVideo {
  _id?: ObjectId;
  url: FormatInputPathObject;
  upload: number;
}

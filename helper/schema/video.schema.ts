import { model, Schema, Model, Document } from 'mongoose';

export const VideoSchema: Model<Document, {}> = model(
  'video',
  new Schema({
    url: { type: String, required: true },
    upload: { type: Number, required: true, default: Date.now() },
  }),
);

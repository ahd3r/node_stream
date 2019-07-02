import * as http from 'http';
import { App } from './app';
import { connect } from 'mongoose';

const server: http.Server = http.createServer();

server.on('request', App.getApp().routes);

server.listen(3000, () => {
  connect(
    'mongodb+srv://admin:1111@cluster0-frrcg.mongodb.net/video_stream?retryWrites=true&w=majority',
    { useNewUrlParser: true },
  )
    .then(() => {
      console.log('Running on 3000...');
    })
    .catch(console.log);
});

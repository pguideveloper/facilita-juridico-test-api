import { app } from '@/frameworks/fastify/app';
import { env } from '@/app/config/env';
import { connect } from './data/dbConnection';

connect()
  .then(() => {
    app
      .listen({
        host: '0.0.0.0',
        port: env.SERVER_PORT,
      })
      .then(() => {
        console.log('API HTTP Server is running!');
      });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

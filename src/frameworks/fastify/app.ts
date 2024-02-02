import { users } from '@/app/http/routes/customer';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from '@/app/config/env';
import cors from '@fastify/cors';

export const app = fastify();

app.register(cors, {
  origin: (origin, cb) => {
    const hostname = new URL(origin!).hostname;
    if (hostname === 'localhost') {
      cb(null, true);
      return;
    }

    cb(new Error('Not allowed'), false);
  },
});

//Routes
app.register(users);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  console.error(error);

  return reply.status(500).send({ message: 'Internal server error.' });
});

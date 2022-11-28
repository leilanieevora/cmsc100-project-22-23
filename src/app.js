import Fastify from 'fastify';

// const prefix = '/api';

export async function build () {
  const fastify = Fastify({ looger: true });

  fastify.get('/api', async (request, reply) => {
    return { success: true };
  });

  return fastify;
}

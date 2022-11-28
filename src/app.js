import Fastify from 'fastify';
import { getDB, saveDB } from './utils/db/index.js';
import { v4 } from 'uuid';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ looger: true });

  fastify.get('/api', async (request, reply) => {
    return { success: true };
  });

  fastify.post(`${prefix}/blog`, async (request, reply) => {
    const { body } = request;
    const { title, comment } = body;
    const db = await getDB();

    const id = v4();

    const blog = {
      title,
      comment,
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime()
    };
    db.blogs[id] = blog;

    await saveDB(db);

    return {
      id,
      ...blog
    };
  });
  // fastify.get(prefix, general);
  // fastify.get(`${prefix}/todo`, getManyTodo);
  // fastify.get(`${prefix}/todo/:todoId`, getTodo);
  // fastify.put(`${prefix}/todo/:todoId`, updateTodo);
  // fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}

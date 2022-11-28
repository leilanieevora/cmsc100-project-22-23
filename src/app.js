import Fastify from 'fastify';
import { general } from './services/general/index.js';
import { createBlog } from './services/blogs/create_blog.js';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ looger: true });

  fastify.get(prefix, general);
  fastify.post(`${prefix}/blog`, createBlog);
  // fastify.get(`${prefix}/todo`, getManyTodo);
  // fastify.get(`${prefix}/todo/:todoId`, getTodo);
  // fastify.put(`${prefix}/todo/:todoId`, updateTodo);
  // fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}

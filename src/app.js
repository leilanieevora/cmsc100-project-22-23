import Fastify from 'fastify';
import { general } from './services/general/index.js';
import { createBlog } from './services/blogs/create_blog.js';
import { getManyBlog } from './services/blogs/get-many-blogs.js';
import { getBlog } from './services/blogs/get-blog.js';

const prefix = '/api';

export async function build () {
  const fastify = Fastify({ looger: true });

  fastify.get(prefix, general);
  fastify.post(`${prefix}/blog`, createBlog);
  fastify.get(`${prefix}/blog`, getManyBlog);
  fastify.get(`${prefix}/blog/:blogId`, getBlog);
  // fastify.put(`${prefix}/todo/:todoId`, updateTodo);
  // fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}

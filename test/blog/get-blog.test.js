import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Get a blog should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object given an ID', async () => {
    const newBlog = {
      title: 'New blog for get',
      comment: 'comment'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'GET',
      url: `${prefix}/blog/${id}`
    });
    response.statusCode.must.be.equal(200);
    const result = await response.json();
    result.id.must.be.equal(id);
    result.title.must.be.equal(newBlog.title);
    result.comment.must.be.equal(newBlog.comment);
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});

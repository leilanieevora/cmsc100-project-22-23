import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Create blog should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object that was created with ID', async () => {
    const newBlog = {
      title: 'New Blog',
      comment: 'Comment'

    };
    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/blog`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    });
    response.statusCode.must.be.equal(200);
    const result = await response.json();
    result.id.must.not.be.null();
    result.title.must.be.equal(newBlog.title);
    result.comment.must.be.equal(newBlog.comment);
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});

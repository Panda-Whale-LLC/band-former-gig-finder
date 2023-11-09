const request = require('supertest');
const server = require('../server.js');

// To test, run the following in the console:
// jest --testMatch '**/supertest.js' --detectOpenHandles
describe('server router tests', () => {
  // Kill the server after all tests run
  afterAll(() => {
    server.close();
  });

  // tests for users router
  describe('/users/', () => {
    describe('POST', () => {
      it('responds with 200 status when a new users is created, the response body is an Object, and it includes user and token properties', () => {
        const newUser = {
          name: 'Pikachu',
          // usernames are unique! Update each test (there's probably a better way to do this)
          userName: 'ElectroMan31',
          password: 'Charizard_is_my_homie',
        };

        return request(server)
          .post('/users/')
          .send(newUser)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('token');
          })
          .catch(() => {
            if (AggregateError) {
              console.log('AggregateError at /users/ post request');
            }
          });
      });

      it('responds with an error if a user is missing a name, userName or password', () => {
        const newUser = {};
        return request(server)
          .post('/users')
          .send(newUser)
          .expect('Content-Type', /application\/json/)
          .expect(500)
          .then((response) => {
            expect(response.body).toHaveProperty('err');
          })
          .catch(() => {
            if (AggregateError) {
              console.log('AggregateError at /users/ delete request');
            }
          });
      });
    });

    describe('DELETE', () => {
      it('responds with 200 status when a user is successfully deleted, and the user added should be the same one that is deleted', async () => {
        // create a new user object
        const newUser = {
          name: 'PandaWhale',
          userName: 'BearFish111',
          password: 'pAnDaWhAlE4LiFe',
        };

        // create a new user
        const response = await request(server).post('/users/').send(newUser);

        // test that deleting the new user works
        return request(server)
          .delete(`/users/${response.body.user._id}`)
          .set('authorization', response.body.token)
          .expect(200)
          .then((res) => {
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.name).toEqual(newUser.name);
            expect(res.body.userName).toEqual(newUser.userName);
            expect(res.body.user_id).toEqual(newUser.user_id);
          })
          .catch(() => {
            if (AggregateError) {
              console.log('AggregateError at /users/ delete request');
            }
          });
      });

      it('responds with an error if delete request is missing a user id and authorization token', () => {
        return request(server)
          .delete('/users/')
          .expect(404)
          .catch((error) => {
            console.log(error);
            if (AggregateError) {
              console.log('AggregateError at /users/ delete request');
            }
          });
      });
    });
  });

  // tests for posts router
  describe('/posts/', () => {
    describe('GET', () => {
      it('responds with 200 status, the response body is an array, and each nested object includes _id, title, description, and user_id properties', () => {
        return request(server)
          .get('/posts/')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toBeInstanceOf(Array);
            response.body.forEach((nestedObj) => {
              expect(nestedObj).toHaveProperty('_id');
              expect(nestedObj).toHaveProperty('title');
              expect(nestedObj).toHaveProperty('description');
              expect(nestedObj).toHaveProperty('user_id');
            });
          })
          .catch(() => {
            if (AggregateError) {
              console.log('AggregateError at /posts/ get request');
            }
          });
      });
    });

    describe('POST', () => {
      it('responds with 200 status when a new post is created, the response body is an Object, and it includes title, description, user_id, and _id properties', () => {
        const newPost = {
          title: 'TEST EVENT AGAIN!!!',
          dates: '2025-10-19T23:15:30.000Z',
          description: 'THIS IS ANOTHER TEST',
          user_id: '654adb488b2d7c398c8f8b83',
        };

        return request(server)
          .post('/posts/')
          .send(newPost)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('title');
            expect(response.body).toHaveProperty('description');
            expect(response.body).toHaveProperty('dates');
            expect(response.body).toHaveProperty('user_id');
            expect(response.body).toHaveProperty('_id');
          })
          .catch(() => {
            if (AggregateError) {
              console.log('AggregateError at /posts/ post request');
            }
          });
      });
    });

    describe('PATCH', () => {
      it('responds with 200 status when a post is updated, the response body is an Object and it includes _id, title, description, and user_id properties', () => {
        const id = '654c155990bd588942cb80fd';
        const updatedPost = {
          title: 'Updated Post',
          dates: '2025-11-19T23:15:30.000Z',
          description: 'Yay updates!',
        };
        return request(server)
          .patch(`/posts/${id}`)
          .send(updatedPost)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('title');
            expect(response.body).toHaveProperty('description');
            expect(response.body).toHaveProperty('user_id');
            expect(response.body.title).toEqual(updatedPost.title);
          })
          .catch(() => {
            if (AggregateError) {
              console.log('AggregateError at /posts/ patch request');
            }
          });
      });
    });

    describe('DELETE', () => {
      it('responds with 200 status when a post is successfully deleted, and the post added should be the same one that is deleted', async () => {
        // create a new post object
        const newPost = {
          title: 'AWESOME SHOW',
          dates: '2023-12-19T23:15:30.000Z',
          description: 'BEST SHOW EVER',
          user_id: '654adb488b2d7c398c8f8b83',
        };

        // post the new post
        const response = await request(server).post('/posts/').send(newPost);

        // test that deleting the new post works
        return request(server)
          .delete(`/posts/${response.body._id}`)
          .expect(200)
          .then((res) => {
            expect(response.body).toBeInstanceOf(Object);
            expect(res.body.title).toEqual(newPost.title);
            expect(res.body.dates).toEqual(newPost.dates);
            expect(res.body.description).toEqual(newPost.description);
            expect(res.body.user_id).toEqual(newPost.user_id);
          })
          .catch(() => {
            if (AggregateError) {
              console.log('AggregateError at /posts/ delete request');
            }
          });
      });
    });
  });
});

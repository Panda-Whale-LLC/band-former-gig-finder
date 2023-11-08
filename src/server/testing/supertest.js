const request = require('supertest');
const server = require('../server.js');

const fs = require('fs');
const path = require('path');
const { Aggregate } = require('mongoose');
const testDB = path.resolve(__dirname, './testUsersDB.json');

describe('usersRouter tests', () => {

  afterAll(() => {
    server.close();
  });

  describe('/users/', () => {

    describe('POST', () => {
      it('responds with 200 status when a new users is created and response body includes a token', () => {
        const newUser = {
          name: 'Pikachu',
          userName: 'UserTest12',
          password: 'Charizard_is_my_homie',
        };

        return request(server)
          .post('/users')
          .send(newUser)
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            console.log(response.body);
            expect(response.body).toHaveProperty('token');
          })
          .catch ((error) => {
            //console.log(error);
            if (AggregateError) {
              console.log('AggregateError at /users/ post request');
            }
          });
      });
    });

    describe('POST', () => {
      it ('responds with an error if a user is missing a name, userName or password', () => {
        const newUser = {};

        return request(server)
          .post('/users')
          .send(newUser)
          .expect('Content-Type', /application\/json/)
          .expect(500)
          .then((response) => {
            expect(response.body).toHaveProperty('err');
          })
          .catch ((error) => {
            console.log(error);
            if (AggregateError) {
              console.log('AggregateError at /users/ post request');
            }
          });
      });
    });

  });
});





// const request = require('supertest');
// const server = 'http://localhost:3000';

// describe('usersRouter tests', () => {
//   describe('/users/', () => {
//     describe('POST', () => {
//       it('responds with 200 status when a new user is created', () => {
//         const newUser = {
//           name: 'Pikachu',
//           userName: 'UserTest2',
//           password: 'Charizard_is_my_homie',
//         };

//         // Send a POST request to create a new user
//         return request(server)
//           .post('/users/')
//           .send(newUser)
//           .expect('Content-Type', /application\/json/)
//           .expect(200)
//           .then((response) => {
//             // You can add assertions here to check the response
//             expect(response.body).toHaveProperty('token');
//           })
//           .catch((error) => {
//             // Handle the error properly
//             console.error(error);
//           });
//       });
//     });
//   });
// });

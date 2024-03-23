const request = require('supertest');
const app = require('../app');
const { expect } = require('@jest/globals');
const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();

let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await connection.db();
});

// beforeEach(async () => {
//   await db.collection("exercises").deleteMany({});
// });

// I added jest --forcedExit to the dependencies because it would not stop running the tests when they were done.
afterAll(async () => {
  await connection.close();
});

describe('Your tests here', () => {

    // GET all Exercises
    it('Test API Exercise Endpoint', async () => {
        const response = await request(app).get('/exercises');
        // console.log(response.body)
        expect(response.status).toBe(200);
    });

    // GET all Workouts
    it('Test API Workout Endpoint', async () => {
        const response = await request(app).get('/workouts');
        // console.log(response.body)
        expect(response.status).toBe(200);
    });


    // POST / Create a new Exercise and then delete it
    it('Create and Delete an Exercise', async () => {
        // Create a new exercise
        const createRes = await request(app)
            .post('/exercises')
            .send({ name: 'test', description: 'UNIT CREATING TESTING' });

        expect(createRes.statusCode).toEqual(201);
        expect(createRes.body).toBeDefined(); // Check if res.body is defined

        // Checks if the response acknowledge is true because that is what is returned
        expect(createRes.body.acknowledged).toBe(true);
        // console.log(createRes.body.acknowledged);


        // Delete the created exercise
        const exerciseId = createRes.body.insertedId;
        const deleteRes = await request(app)
            .delete(`/exercises/${exerciseId}`);

        expect(deleteRes.statusCode).toEqual(204);
        // console.log(deleteRes.body)
        
    });


});

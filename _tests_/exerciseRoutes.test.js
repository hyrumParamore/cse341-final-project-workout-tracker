const request = require('supertest');
const app = require('../app');
const { expect } = require('@jest/globals');
const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();

let connection;
// let db; // Undo this and the one in the function below to use the beforeEach method.

beforeAll(async () => {
  connection = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // db = await connection.db();
});

// This would delete all the items in the database exercise collection. Would be good to use in a test collection.
// beforeEach(async () => {
//   await db.collection("exercises").deleteMany({});
// });

// I added jest --forcedExit to the dependencies because it would not stop running the tests when they were done.
afterAll(async () => {
  await connection.close();
});



describe('Exercise Routes Tests: ', () => {
  let exerciseId; // Stores the ID of an exercise to allow for multiple tests on the same exercise.

  // GET all Exercises
  it('Test GET All Exercises', async () => {
    const response = await request(app)
      .get('/exercises');

    // console.log(response.body)
    expect(response.status).toBe(200);
  });

  // Create a new exercise
  it('Create a new exercise', async () => {
    const createData = {
      name: 'Create Test Exercise',
      description: 'Create Test Description',
      muscleGroup: 'Create Group',
      equipment: 'Create Test Equipment',
      reps: 15,
      weight: 25,
      sets: 4,
    };

    const createRes = await request(app)
      .post('/exercises')
      .send(createData);

    expect(createRes.statusCode).toEqual(201);
    expect(createRes.body).toBeDefined();
    expect(createRes.body.acknowledged).toBe(true);

    exerciseId = createRes.body.insertedId;
    console.log(exerciseId)
  });

  // Update the created exercise
  it('Update the created exercise', async () => {
    const updateData = {
      name: 'Updated Test Exercise',
      description: 'Updated Test Description',
      muscleGroup: 'Updated Group',
      equipment: 'Updated Test Equipment',
      reps: 15,
      weight: 25,
      sets: 4,
    };
  
    console.log('Exercise ID:', exerciseId); // Ensure exerciseId is defined and correct
  
    const updateRes = await request(app)
      .put(`/exercises/${exerciseId}`)
      .send(updateData);
  
    // Log the update response for debugging
    console.log('Update Response:', updateRes.body);
  
    expect(updateRes.statusCode).toEqual(204);
  });
  

  // Delete the created exercise
  it('Delete the created exercise', async () => {
    const deleteRes = await request(app)
      .delete(`/exercises/${exerciseId}`);

    expect(deleteRes.statusCode).toEqual(204);
  });
});

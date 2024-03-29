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



describe('\nExercise Routes Tests: ', () => {
  let exerciseId; // Stores the ID of an exercise to allow for multiple tests on the same exercise.
  let exercise;

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

    exercise = createData;

    const createRes = await request(app)
      .post('/exercises')
      .send(createData);

    expect(createRes.statusCode).toEqual(201);
    expect(createRes.body).toBeDefined();
    expect(createRes.body.acknowledged).toBe(true);

    exerciseId = createRes.body.insertedId;
    // console.log(exerciseId)
  });

  // GET Exercise By ID
  it('Test GET Exercise by Exercise ID', async () => {
    const response = await request(app)
      .get(`/exercises/${exerciseId}`);

      // console.log(response.body.name)
      // console.log(exercise.name)

    expect(response.status).toBe(200);
    // Checks if the Request Body Name is the same as the created Exercise Name
    expect(response.body.name).toEqual(exercise.name)  
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
  
    // console.log('Exercise ID:', exerciseId); // Ensure exerciseId is defined and correct
  
    const updateRes = await request(app)
      .put(`/exercises/${exerciseId}`)
      .send(updateData);
  
    // Log the update response for debugging
    // console.log('Update Response:', updateRes.body);
  
    expect(updateRes.statusCode).toEqual(204);
  });
  

  // Delete the created exercise
  it('Delete the created exercise', async () => {
    const deleteRes = await request(app)
      .delete(`/exercises/${exerciseId}`);

    expect(deleteRes.statusCode).toEqual(204);
  });
});



// ****************** WORKOUT ROUTES ******************
describe('\nWorkout Routes Tests: ', () => {
  let workoutId;
  let workout;  // Saves the created workout to be compared to later.

  // GET all Workout
  it('Test GET All Workout', async () => {
    const response = await request(app)
      .get('/workouts');

    // console.log(response.body)
    expect(response.status).toBe(200);
  });

  // Create a new workout
  it('Create a new Workout', async () => {
    const createData = {
      title: 'Create Test Workout',
      description: 'Create Workout Test Description',
      muscleGroup: 'Create Workout Muscle Group',
      exercises: [
        'Exercise ID #1',
        'Exercise ID #2',
        'Exercise ID #3'
      ],
    };

    workout = createData;

    const createRes = await request(app)
      .post('/workouts')
      .send(createData);

    expect(createRes.statusCode).toEqual(201);
    expect(createRes.body).toBeDefined();
    expect(createRes.body.acknowledged).toBe(true);

    workoutId = createRes.body.insertedId;
    // console.log(workoutId)
  });

  // GET Workout By ID
  it('Test GET Workout by Workout ID', async () => {
    const response = await request(app)
      .get(`/workouts/${workoutId}`);

      // console.log(response.body.title)
      // console.log(workout.title)

    expect(response.status).toBe(200);
    // Checks if the Request Body Name is the same as the created Workout Name
    expect(response.body.title).toEqual(workout.title)  
  });

  // Update the created exercise
  it('Update the created Workout', async () => {
    const updateData = {
      title: 'Update Test Workout',
      description: 'Update Workout Test Description',
      muscleGroup: 'Update Workout Muscle Group',
      exercises: [
        'Update Exercise ID #1',
        'Update Exercise ID #2',
        'Update Exercise ID #3'
      ],
    };
  
    // console.log('Workout ID:', workoutId); // Ensure workoutId is defined and correct
  
    const updateRes = await request(app)
      .put(`/workouts/${workoutId}`)
      .send(updateData);
  
    // Log the update response for debugging
    // console.log('Update Response:', updateRes.body);
  
    expect(updateRes.statusCode).toEqual(204);
  });
  

  // Delete the created workout
  it('Delete the created Workout', async () => {
    const deleteRes = await request(app)
      .delete(`/workouts/${workoutId}`);

    expect(deleteRes.statusCode).toEqual(204);
  });

});





// ****************** LOG ROUTES ******************
describe('\nLog Routes Tests: ', () => {
  let logId;
  let userId; // Saves the created userId to be compared to later.

  // GET all Log
  it('Test GET All Log', async () => {
    const response = await request(app)
      .get('/logs');

    // console.log(response.body)
    expect(response.status).toBe(200);
  });

  // Create a new Log
  it('Create a new Log', async () => {
    const createData = {
      userId: 'Create Test Log',
      date: 'Create Log Test Description',
      workoutId: 'Create Log Test Muscle Group',
      duration: 'Create Log Test Duration',
      notes: 'Create Log Test Notes'
    };

    userId = createData.userId

    const createRes = await request(app)
      .post('/logs')
      .send(createData);

    expect(createRes.statusCode).toEqual(201);
    expect(createRes.body).toBeDefined();
    expect(createRes.body.acknowledged).toBe(true);

    logId = createRes.body.insertedId;
  });

  
  // GET Log By ID
  it('Test GET Log by Log ID', async () => {
    const response = await request(app)
      .get(`/logs/${userId}`);

    // This will just test the response because it is not returning anything in the body.
    // It was just how I decided to make the logs work.
    expect(response.status).toBe(200);
    
  });

  // Update the created Log
  it('Update the created Log', async () => {
    const updateData = {
      userId: 'Update Test Log',
      date: 'Update Log Test Description',
      workoutId: 'Update Log Test Muscle Group',
      duration: 'Update Log Test Duration',
      notes: 'Update Log Test Notes'
    };
  
    // console.log('Log ID:', logId); // Ensure logId is defined and correct
  
    const updateRes = await request(app)
      .put(`/logs/${logId}`)
      .send(updateData);
  
    // Log the update response for debugging
    // console.log('Update Response:', updateRes.body);
  
    expect(updateRes.statusCode).toEqual(204);
  });
  

  // Delete the created Log
  it('Delete the created Log', async () => {
    const deleteRes = await request(app)
      .delete(`/logs/${logId}`);

    expect(deleteRes.statusCode).toEqual(204);
  });
  
});



// ****************** USER ROUTES ******************
describe('\nUser Routes Tests: ', () => {

  // GET all Users
  it('Test GET All Users Route', async () => {
    const response = await request(app)
      .get('/users');

    expect(response.status).toBe(200);
  });

  // Not too sure how to test the creation of a new user. It is all ran through the passport
  // that is pretty complex when it comes to testing that.
  
});




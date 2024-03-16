const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Workout Tracker API',
        description: "Workout and Exercise Tracker \n To create an account, go to this link (https://cse341-final-project-workout-tracker.onrender.com) to get the account to be created through OAuth. It will create an account based off of your google credentials. \n It will only use Profile First Name, Last Name, and Email. You will only need to create an account once. \n Once that is created, then return to the swagger documentation and then authorize by pressing the authorize button, Passing in the required Client ID, selecting all the options, and then following the OAuth instructions.",
    },
    host: 'cse341-final-project-workout-tracker.onrender.com', // cse341-final-project-workout-tracker.onrender.com
    schemes: ['https'],
    securityDefinitions: {
        GoogleOAuth: {
            type: 'oauth2',
            flow: 'implicit',
            authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
            scopes: {
                email: 'Access user email address',
                profile: 'Access user profile information',
            }
        }
    },
    security: [
        {
            GoogleOAuth: ['email', 'profile']
        }
    ],
    tags: [ // Tags to help organize everything
        { 
            name: "Users",
            description: "User Routes"
        },
        { 
            name: "Exercises",
            description: "Exercise Routes"
        
        },
        { 
            name: "Workouts",
            description: "Workout Routes"
        },
        { 
            name: "Logs",
            description: "Log Routes" 
        },
        { 
            name: "Auth",
            description: "Authentication Routes"
        },
        

    ]
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
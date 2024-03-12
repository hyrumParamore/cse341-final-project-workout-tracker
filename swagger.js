const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Recipe API'
    },
    host: 'cse341-final-project-workout-tracker.onrender.com', // cse341-final-project-workout-tracker.onrender.com
    schemes: ['https'],
    securityDefinitions: {
        GoogleOAuth: {
            type: 'oauth2',
            flow: 'implicit',
            authorizationUrl: 'https://cse341-final-project-workout-tracker.onrender.com/auth/google',
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
    ]
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
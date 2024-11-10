import express from 'express'    // Importing the Express framework for creating the server
import mongoose from 'mongoose'    // Importing Mongoose for MongoDB connection and schema handling
import dotenv from 'dotenv'            // Importing dotenv to manage environment variables
import bodyParser from 'body-parser'             // Importing body-parser to handle JSON request bodies
import route from './routes/patientRoutes.js'   // Importing routes for handling patient-related API requests
import swaggerJSDoc from 'swagger-jsdoc'       // Importing swagger-jsdoc for API documentation generation
import swaggerUI from 'swagger-ui-express'    // Importing swagger-ui-express to serve Swagger documentation UI


const app = express()

//interceptor
app.use(bodyParser.json());

//how to access .env file stuff
dotenv.config()

//how to use swagger
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Patient data API",
      version: "1.0.0",
      description: "API documentation for managing patient data",
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:5000",  // Your local server URL
      },
    ],
  };

  //now that you have a swagger definition, create an options object
  const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./controller/*.js"], // Files containing annotations
  };



const swaggerSpec = swaggerJSDoc(options);

//Swagger UI route
app.use("/api-docs", swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
)



const PORT = process.env.PORT || 8000;

const mongoURL = process.env.MONGO_URL

//use mongoose to connect to the server, if it resolves, log something to the console adn start server or go to error block
mongoose.connect(mongoURL).then(() => {

    console.log('connection is successful :)')
     // Log if the server is running on localhost or Render
     if (process.env.SERVER_URL) {
      console.log(`Server is live on Render at: ${process.env.SERVER_URL}`);
  } else {
      console.log(`Server is running locally at: http://localhost:${PORT}`);
  }


    app.listen(PORT, () => {

        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)

})

app.use("/api/patient", route)


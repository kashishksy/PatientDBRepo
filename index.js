import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import route from './routes/patientRoutes.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'


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
        url: "http://localhost:5000",  // Your local server URL
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

    app.listen(PORT, () => {

        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)

})

app.use("/api/patient", route)


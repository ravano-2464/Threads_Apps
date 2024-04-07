import * as express from 'express'
import * as cors from 'cors'
import * as swaggerUi from "swagger-ui-express"
import { AppDataSource } from "./data-source"
import CloudinaryConfig from "./libs/cloudinary"
import router from './route'
import "dotenv/config"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const port = 5000
 
        CloudinaryConfig.upload()
        app.use(cors())
        app.use(express.json())
        app.use("/api/v1", router) 
        app.use(express.static("public"));

        app.use("/docs",
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: "/swagger.json"
                }
            })
        )

        app.listen(port, () => {
            console.log("Server running on port: " + port)
        })
    })
.catch(error => console.log(error))

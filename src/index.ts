import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

import { AppDataSource } from "./data-source"
import routes from './routes'

AppDataSource.initialize().then(()=> {
    const app = express()

    app.use(express.json())

    app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.use(routes);
    
    return app.listen(process.env.PORT);

}).finally(()=> console.log('Server started'))
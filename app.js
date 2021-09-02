const express = require("express");
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const dbConnect = require('./src/db/dbConnection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const userRouter = require('./src/routes/userRouter');
const checkPointRouter = require('./src/routes/checkPointRouter');
const reportRouter = require('./src/routes/reportRouter');
const checkPointController = require('./src/controllers/reportController');


const app = express();
dbConnect();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/api/users', userRouter);
app.use('/api/checkPoints', checkPointRouter);
app.use('/api/reports', reportRouter);
app.use('/uptime-server-monitor-system-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const port= process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
    // this function should get started as soon as the server starts
    checkPointController.automatically_check_every_active_checkPoint;
});

const express = require("express");
const dbConnect = require('./src/db/dbConnection');
const userRouter = require('./src/routes/userRouter');


const app = express();
dbConnect();


app.use(express.json());
app.use('/api/users', userRouter);


const port= process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})

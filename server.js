const express = require('express');
const { dbConnection } = require('./config/databseConnect');
const { usersRoutes } = require('./routes/users/usersRoute');
dbConnection();

const app = express();

//MIDDLEWARE
app.use(express.json());
//USERS
app.use('/api/users', usersRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.table(`Server is runing on port ${PORT}`));

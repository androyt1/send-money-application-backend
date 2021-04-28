const express = require('express');
const { dbConnection } = require('./config/databseConnect');

const app = express();

dbConnection();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.table(`Server is runing on port ${PORT}`));

const mongoose = require('mongoose');

//mongodb+srv://inovotek:MYJmX4htfWqV1l37@cluster0.4ttt9.mongodb.net/demo-db?retryWrites=true&w=majority

// mongodb+srv://atom:XZfsqELdXjmC3ELn@clients-project-demo-db.nfutd.mongodb.net/clients-project-demo-db

// mongodb+srv://atom:XZfsqELdXjmC3ELn@clients-project-demo-db.nfutd.mongodb.net/projects-demo-db?retryWrites=true&w=majority
const dbConnection = async () => {
  try {
    const connected = await mongoose.connect(
      'mongodb+srv://inovotek:MYJmX4htfWqV1l37@cluster0.4ttt9.mongodb.net/demo-db?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );

    console.log(`MongoDB Connected ${connected.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = { dbConnection };

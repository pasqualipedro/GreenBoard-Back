/**
 * API / DB Config and settings
 */

const mongoose = require(`mongoose`);

const MONGO_PASS = `VYn69YEHQOKI`
const DBNAME = `greenboardDB`;
const MONGO_URI = `mongodb+srv://admin:${MONGO_PASS}@cluster0.mlab8.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;

const connect = async () => {
    const connection = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(
        `DataBase connected Successfuly: ${connection.connections[0].name} `
    );
    };

    /* import axios from `axios`;
    
    const api = axios.create({
        baseURL: process.env
    
    }) */
            
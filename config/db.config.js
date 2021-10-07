/**
 * API / DB Config and settings
 */
const mongoose = require(`mongoose`);

const MONGO_PASS = `VYn69YEHQOKI`
const DBNAME = `greenboardDB`;
const MONGO_URI = `mongodb://admin:${MONGO_PASS}@cluster0-shard-00-00.mlab8.mongodb.net:27017,cluster0-shard-00-01.mlab8.mongodb.net:27017,cluster0-shard-00-02.mlab8.mongodb.net:27017/${DBNAME}?ssl=true&replicaSet=atlas-37km2k-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connect = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log( `DataBase connected Successfuly: ${connection.connections[0].name}`);
    } catch (error) {
        console.log( { msg: `Not able to connect:`, error } );
    }
};

connect();
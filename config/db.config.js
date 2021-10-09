/**
 * API / DB Config and settings
 */
const mongoose = require(`mongoose`);

const connect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,
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
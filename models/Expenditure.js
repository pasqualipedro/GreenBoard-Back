const { Schema, model } = require(`mongoose`);

const userSchema = new Schema (
    {
        username: { type: String, unique: true, required: true },
        favoritesToDos: [{ type: Schema.Types.ObjectId, ref: `ToDo` }]
    },
    {
        timestamps: true,
    }
    
);	

module.exports = model( `User`, userSchema );
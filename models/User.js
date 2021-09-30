//
// HERE WE ADD THE SCHEMA OF OUR DB DOCUMENT(S) - "SKELETON ON THE OBJECT"
//
const { Schema, model } = require(`mongoose`);

const toDoSchema = new Schema(
    {
        title: {type: String, required: true},
        status: {type: Boolean, default: false},
        dueDate: Date,
        assignee: String
    },
    {
        timestamps: true,
    }
);

module.exports = model('ToDo', toDoSchema);
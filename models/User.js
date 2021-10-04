/**
 * User schema
 */
const { Schema, model } = require(`mongoose`);

const userSchema = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        profileImg: { type: String, required: false, default: exampleUrl } /** ??------>>>> NOT SURE ABOUT THIS */
    },
    {
        timestamps: true,
    }
);

module.exports = model('User', userSchema);
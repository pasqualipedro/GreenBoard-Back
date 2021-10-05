/**
 * User_Categories schema
 */
const { Schema, model } = require(`mongoose`);

const categoriesUser = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        budget: { type: Number, required: true }, /** [ { value: Number, date: Number } ] --->> maybe implement after the MVP is done */ 
        inUse: { type: Boolean, default: true },
        userID: { type: Schema.Types.ObjectId, ref: `User`, required: true }
        },
    {
        timestamps: true,
    }
);

module.exports = model('UserCat', categoriesUser);
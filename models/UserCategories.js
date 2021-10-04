/**
 * Categories User schema
 */
const { Schema, model } = require(`mongoose`);

const categoriesUser = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true },
        description: { type: String, required: true },
        budget: [{ type: Number, required: true }], /**??NOT SURE ABOUT THIS */
        log: [{ type: Date, required: true }], /**??NOT SURE ABOUT THIS */
        userID: { type: Schema.Types.ObjectId, ref: `User`, required: true }
        },
    {
        timestamps: true,
    }
);

module.exports = model('UserCat', categoriesUser);
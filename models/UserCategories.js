/**
 * Categories User schema
 */
const { Schema, model } = require(`mongoose`);

const categoriesUser = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        budget: [ { value: Number, date: Number } ],
        type: { type: Boolean, default: true },
        userID: { type: Schema.Types.ObjectId, ref: `User`, required: true }
        },
    {
        timestamps: true,
    }
);

module.exports = model('UserCat', categoriesUser);
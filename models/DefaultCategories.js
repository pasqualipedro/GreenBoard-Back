/**
 * Categories Default schema
 */
const { Schema, model } = require(`mongoose`);

const categoriesDefault = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true },
        description: { type: String, required: true },
        userID: [{ type: Schema.Types.ObjectId, ref: `User` , default: null, required: false }]
        },
    {
        timestamps: true,
    }
);

module.exports = model('DefaultCat', categoriesDefault);
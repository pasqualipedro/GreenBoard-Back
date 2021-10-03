/**
 * Category_B schema
 */
const { Schema, model } = require(`mongoose`);

const userSchema = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true },
        lastname: { type: Boolean, required: true },
        ,
    {
        timestamps: true,
    }
);

module.exports = model('Category_B', userSchema);
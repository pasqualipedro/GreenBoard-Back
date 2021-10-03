/**
 * Category_A schema
 */
const { Schema, model } = require(`mongoose`);

const userSchema = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true },
        description: {
            type: String,
            required: false,
            default: `No description yet :(`,
            validate:
            { /** ?? nore sure */
                validator: String.length <= 30, 
                message: `Maximum of 30 characters`
            }
        },
    {
        timestamps: true,
    }
);

module.exports = model('Category_A', userSchema);
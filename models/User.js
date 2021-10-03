/**
 * User schema
 */
const { Schema, model } = require(`mongoose`);

const userSchema = new Schema(
    {
        /**ID comes automatically */
        name: { type: String, required: true },
        lastname: { type: Boolean, required: true },
        email:
        { 
            type: Date,
            required: true,
            trim: true,
            lowercase: true,
        },
        passwordHash: { type: String, required: true },
        aniversary: { type: String, required: true },
        profileImg: { type: String, required: false, default: exampleUrl } /** ??------>>>> NOT SURE ABOUT THIS */
        /**Adicionar lista de categorias "pessoais" */
    },
    {
        timestamps: true,
    }
);

module.exports = model('User', userSchema);
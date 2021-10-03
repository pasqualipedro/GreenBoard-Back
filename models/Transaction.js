/**
 * Transaction schema
 */
const { Schema, model } = require(`mongoose`);

const transactionSchema = new Schema(
    {
        /**ID comes automatically */
        type: { 
            type: String, 
            required: true,
            enum: [`Income`, `Expenditure`]
        },
        amount: {
            type: Number,
            required: true,
            min: [1], /** ?? This represent 0.01 cents as a minimum for transaction, and always a "positive" value as input */
            validate:
            { /** ?? not sure */
                validator: Number.isInteger,
                message: `{VALUE} is not an integer value`
            }
        },
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
        categorization: Date,
        user: String,
        transDate: Date
    },
    {
        timestamps: true,
    }
);

module.exports = model('Transaction', transactionSchema);
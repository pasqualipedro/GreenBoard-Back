/**
 * Transaction schema
 */
const { Schema, model } = require(`mongoose`);

const transactionSchema = new Schema(
    {
        /**ID comes automatically */
        startDate: { type: Date, required: true},
        endDate: { type: Date},
        type:
        {
            type: String,
            required: true,
            enum: [`Income`,`Expenditure`]
        },
        description: { type: String, required: true },
        label: { type: String },
        category_id: { type: Schema.Types.ObjectId, ref: `UserCat` },
        value: { type: Number, required: true, min: [1] },
        frequency:
        {
            type: String,
            enum: [`Single Time`,`Installment`,`Daily`,`Weekly`,`Monthly`,`Year`,`Weekdays`,`Weekends`,`By 2 Months`,`By 3 Months`,`By 4 Months`,`By 6 Months`] 
        },
        userID: { type: Schema.Types.ObjectId, ref: `User`, required: true }
    },
    {
        timestamps: true,
    }
);

module.exports = model('Transaction', transactionSchema);
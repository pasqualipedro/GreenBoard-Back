/**
 * TRANSACTION Routes
*/
const { Router, request } = require(`express`);
const router = Router();

/** importing models */
const Transaction = require(`../models/Transaction`);
const UserCat = require(`../models/UserCategories`);


/**REQUESTS */
/**Create new transaction for one specific user */
router.post(`/transaction/add`, async (request, response) => {
    const { id } = request.user;
    const { startDate, endDate, type, description, label, category_id, value, frequency } = request.body;
    const allCategoriesFromUser = await UserCat.find({ userID: id });
    const payload = {
        startDate: startDate,
        endDate: endDate,
        type: type,
        description: description,
        label: label,
        category_id: category_id,
        value: value,
        frequency: frequency,
        userID: id
    };
    if( payload.startDate === "") {
        return response.status(400).json({ msg: `Please select a date for your transaction` });
    };
    if( !(payload.type === "Expenditure" || payload.type === "Income") ) {
        return response.status(400).json({ msg: `Please select your transaction type as Expenditure or Income` });
    };
    if( payload.description === "") {
        return response.status(400).json({ msg: `Please add some description to your transaction`});
    };
    if( !(allCategoriesFromUser.includes(id)) ) {
        return response.status(400).json({ msg: `The selected category does not belong to this user`})
    };
    if(payload.value === 0) {
        return response.status(400).json({ msg: `Please add a value to your transaction`});
    };
    try {
        console.log(payload);
        const addNewTransaction = await Transaction.create(payload);
        response.status(200).json({ msg: `New transaction created successfuly`, addNewTransaction})
        console.log(addNewTransaction);
    } catch (error) {
        response.status(400).json({ msg: `Error while creating new transaction:`, error });
    };
});





module.exports = router;
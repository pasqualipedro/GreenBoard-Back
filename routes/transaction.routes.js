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
    const { startDate, endDate, description, type, group, item, value, frequency } = request.body;
    const allCategoriesFromUser = await UserCat.find({ userID: id });
    const payload = {
        startDate: startDate,
        endDate: endDate,
        description: description,
        type: type,
        group: group,
        item: item,
        value: value,
        frequency: frequency,
        userID: id
    };
    if( payload.startDate === "") {
        return response.status(400).json({ msg: `Please select a date for your transaction` });
    };
    if( !(payload.type === "Expenditure" || payload.type === "Income" || payload.type === "Savings" ) ) {
        return response.status(400).json({ msg: `Please select your transaction type as Expenditure, Income or Savings` });
    };
    if( payload.description === "") {
        return response.status(400).json({ msg: `Please add some description to your transaction`});
    };
    if( payload.group === "" || payload.item === "" ) {
        return response.status(400).json({ msg: `Please attribute some category name and item to your transaction`});
    };
    if( !allCategoriesFromUser.some(element => element.userID == id) ) {
        return response.status(400).json({ msg: `The selected category does not belong to this user`});
    };
    if(payload.value === 0) {
        return response.status(400).json({ msg: `Please add a value to your transaction`});
    };
    try {
        const addNewTransaction = await Transaction.create(payload);
        response.status(200).json({ msg: `New transaction created successfuly`, addNewTransaction})
    } catch (error) {
        response.status(400).json({ msg: `Error while creating new transaction:`, error });
    };
});

/**Fetching all transactions from one specific user */
router.get(`/transaction/all`, async (request, response) => {
    const { id } = request.user;
    try {
        const allTransactionsFromUser = await Transaction.find();
        response.status(200).json({ msg: `All transactions are:`, allTransactionsFromUser });        
    } catch (error) {
        response.status(400).json({ msg: `Not able to return user transactions`, error });
    };
});

/**Delete one transaction for one specific user */
router.delete(`/transaction/delete/:transId`, async (request, response) => {
    const { id } = request.user;
    const { transId } = request.params;
    try {
        const deleteUserTransaction = await Transaction.findOneAndDelete({ "_id": transId, userID: id });
        response.status(200).json({ msg: `Transaction deleted successfuly` });
    } catch (error) {
        response.status(500).json({ msg: `Not able to delete this transaction`, error });
    };
});

/**Update a category from one specific user */
router.put(`/transaction/update/:transId`, async (request, response) => {
    const { id } = request.user;
    const { transId } = request.params;
    const payload = request.body;
    try {
        const updateUserTransaction = await Transaction.findByIdAndUpdate({ "_id": transId, userID: id }, payload, { new: true });
        response.status(200).json({ msg: `Transaction updated successfuly`, updateUserTransaction });
    } catch (error) {
        response.status(400).json({ msg: `Error while updating transaction:`, error });
    };
});


module.exports = router;
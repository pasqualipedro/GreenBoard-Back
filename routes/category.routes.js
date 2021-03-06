/**
 * CATEGORY Routes
*/
const { Router, request } = require(`express`);
const router = Router();

/** importing models */
const UserCat = require(`../models/UserCategories`);

/**REQUESTS */
/**Create new category for one specific user */
router.post(`/category/add/`, async (request, response) => {
    const { id } = request.user;
    const { item, description, type, group, budget } = request.body;
    const payload = {
        item: item,
        description: description,
        type: type,
        group: group,
        budget: budget,
        userID: id
    };
    if(payload.item === "" || payload.description === "" || payload.group === "" ) {
        return response.status(400).json({ msg: `Missing category item name and/or description and/or group` });
    };
    if( !(payload.type === "Expenditure" || payload.type === "Income" || payload.type === "Savings" ) ) {
        return response.status(400).json({ msg: `Please select your category type as Expenditure, Income or Savings` });
    };
    if(payload.budget === 0 || payload.budget < 0 ) {
        return response.status(400).json({ msg: `Category budget must be greater than 0` });
    };
    try {
        const newUserCategory = await UserCat.create(payload);
        response.status(201).json({ msg: `>${newUserCategory.group}< was added to user categories` });
    } catch (error) {
        response.status(500).json({ msg: `Server error:`, error });
        console.log(error);
    }
});

/**Fetching all categories from one specific user */
router.get(`/category/all`, async (request, response) => {
    const { id } = request.user;
    try {
        const allCategoriesFromUser = await UserCat.find({ userID: id });
        response.status(200).json({ msg: `All categories are:`, allCategoriesFromUser });
    } catch (error) {
        response.status(500).json({ msg: `Not able to retrieve User Categories`, error });
    }
});

/**Delete one existing category from one specific user */
router.delete(`/category/delete/:catId`, async (request, response) => {
    const { id } = request.user; 
    const { catId } = request.params;
    try {
        const deleteUserCategory = await UserCat.findOneAndDelete({ "_id": catId, userID: id });
        response.status(200).json({ msg: `>${deleteUserCategory.name}< was deleted successfuly` });
    } catch (error) {
        response.status(500).json({ msg: `Not able to delete`, error });
    }
});


/**Update a category from one specific user */
router.put(`/category/update/:catId`, async (request, response) => {
    const { id } = request.user; 
    const { catId } = request.params;
    const payload = request.body;
    if(payload.name === "" || payload.description === "" ) {
        return response.status(400).json({ msg: `Missing category name and/or description` });
    };
    if( !(payload.type === "Expenditure" || payload.type === "Income" || payload.type === "Savings" ) ) {
        return response.status(400).json({ msg: `Please select your category type as Expenditure, Income or Savings` });
    };
    if(payload.budget === 0 || payload.budget < 0 ) {
        return response.status(400).json({ msg: `Category budget must be greater than 0` });
    };
    try {
        const updateUserCategory = await UserCat.findOneAndUpdate({ "_id": catId, userID: id }, payload, { new: true });
        response.status(200).json({ msg: `>${updateUserCategory.name}< updated succesfuly` });
    } catch (error) {
        response.status(500).json({ msg: `Not able to update`, error });
        console.log(error);
    }
});


module.exports = router;
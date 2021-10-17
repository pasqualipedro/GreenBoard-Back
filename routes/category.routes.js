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
    const { name, description, type, budget, /* inUse */ } = request.body;
    const payload = {
        name: name,
        description: description,
        type: type,
        budget: budget,
        /* inUse: inUse, */
        userID: id
    };
    if(payload.name === "" || payload.description === "" ) {
        return response.status(400).json({ msg: `Missing category name and/or description` });
    };
    if( !(payload.type === "Expenditure" || payload.type === "Income") ) {
        return response.status(400).json({ msg: `Please select your category type as Expenditure or Income` });
    };
    if(payload.budget === 0 ) {
        return response.status(400).json({ msg: `Category budget must be greater than 0` });
    };
    if( !(payload.type === "Expenditure" || payload.type === "Income") ) {
        return response.status(400).json({ msg: `Please select category type as Expenditure or Income` });
    };
    try {
        console.log(payload);
        const newUserCategory = await UserCat.create(payload);
        response.status(201).json({ msg: `>${newUserCategory.name}< was added to user categories` });
    } catch (error) {
        response.status(500).json({ msg: `Server error:`, error });
        console.log(error);
    }
});

/**Fetching all categories from one specific user */
router.get(`/category/all`, async (request, response) => {
    const { id } = request.user;
    try {
        console.log(id)
        const allCategoriesFromUser = await UserCat.find({ userID: id });
        console.log(allCategoriesFromUser);
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
        const delUserCategory = await UserCat.findOneAndDelete({ "_id": catId, userID: id });
        response.status(200).json({ msg: `>${delUserCategory.name}< was deleted successfuly` });
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
    if( !(payload.type === "Expenditure" || payload.type === "Income") ) {
        return response.status(400).json({ msg: `Please select your category type as Expenditure or Income` });
    };
    if(payload.budget === 0 ) {
        return response.status(400).json({ msg: `Category budget must be greater than 0` });
    };
    if( !(payload.type === "Expenditure" || payload.type === "Income") ) {
        return response.status(400).json({ msg: `Please select category type as Expenditure or Income` });
    };
    try {
        const getOneCategoryFromUser = await UserCat.findOneAndUpdate({ userID: id, "_id": catId }, payload, { new: true });
        console.log(getOneCategoryFromUser);
        response.status(200).json({ msg: `>${getOneCategoryFromUser.name}< updated succesfuly` });
    } catch (error) {
        response.status(500).json({ msg: `Not able to update`, error });
        console.log(error);
    }
});


module.exports = router;
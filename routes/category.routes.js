/** Criando um roteador */
const { Router, request } =  require(`express`);
const User = require("../models/User");
const router = Router();

/** importing models */
const UserCat = require(`../models/UserCategories`);

/**REQUESTS */
/**Create new category for one specific user */
router.post(`/category/add/`, async (request, response) => {
    /* const { userId } = request.params; */ /** ?? DOUBTS ABOUT THIS */
    const payload = request.body;
    if(!payload) {
        return response.status(400).json({ msg: `Missing category information` });
    }
    try {
        console.log(payload);
        const newUserCategory = await UserCat.create(payload);
        response.status(201).json({ msg: `>${newUserCategory.name}< was added to user categories` });
    } catch (error) {
        response.status(500).json({ msg: `Server error:`, error });
        console.log(error);
    }
});

/**Delete one existing category from one specific user */
router.delete(`/category/delete/:catId`, async (request, response) => {
    const { catId } = request.params;
    try {
        const delUserCategory = await UserCat.findByIdAndDelete(catId);
        response.status(200).json({ msg: `>${delUserCategory.name}< was deleted successfuly` });
    } catch (error) {
        response.status(500).json({ msg: `Not able to delete`, error });
    }
});

/**Fetching all categories from one specific user */
router.get(`/category/all/:userId`, async (request, response) => {
    const { userId } = request.params;
    try {
        console.log(userId)
        const allCategoriesFromUser = await UserCat.find({ userID: userId });
        console.log(allCategoriesFromUser);
        response.status(200).json({ msg: `All categories from >${userId}< are:`, allCategoriesFromUser });
    } catch (error) {
        response.status(500).json({ msg: `Not able to retrieve User Categories`, error });
    }
});

/**Update a category from one specific user */
router.put(`/category/update/:userId/:catId`, async (request, response) => {
    const { catId, userId } = request.params;
    const payload = request.body;
    if(!payload) {
        return response.status(400).json({ msg: `Missing updated information` });
    }
    try {
        const getOneCategoryFromUser = await UserCat.findOneAndUpdate({ userID: userId, "_id": catId }, payload, { new: true });
        console.log(getOneCategoryFromUser);
        response.status(200).json({ msg: `>${getOneCategoryFromUser.name}< updated succesfuly` });
    } catch (error) {
        response.status(500).json({ msg: `Not able to update`, error });
        console.log(error);
    }
});


module.exports = router;
/** Criando um roteador */
const { Router } =  require(`express`);
const router = Router();

/** importing models */
const UserCat = require(`../models/UserCategories`);

/**REQUESTS */
/**Create new category for user */
router.post(`/newcategory`, async (request, response) => {
    const payload = request.body;
    if(!payload) {
        return response.status(400).json({ msg: `missing category information` });
    }
    try {
        console.log(payload);
        const newUserCategory = await UserCat.create(payload);
        response.status(201).json({ msg: payload.name `was added to user categories` });
    } catch (error) {
        response.status(500).json({ msg: `Server error:`, error });
    }
});

module.exports = router;
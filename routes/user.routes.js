/** Criando um roteador */
const { Router, request } =  require(`express`);
const router = Router();

/** importing models */
const User = require(`../models/User`);

/**REQUESTS */
/**Get logged user information */
router.get(`/userinfo/get`, async (request, response) => {
    const { id } = request.user;
    try {
        const userFullInfo = await User.findById(id);
        response.status(200).json({ msg: `User info is:`, userFullInfo });
    } catch (error) {
        response.status(400).json({ msg: `Not able to fetch user info`, error });
    };
});

/**Update logged user information */
router.put(`/userinfo/update`, async (request, response) => {
    const { id } = request.user;
    const payload = request.body;
    try {
        const updatedUserInfo = await User.findByIdAndUpdate({ "_id": id }, payload, { new: true });
        response.status(200).json({ msg: `"${updatedUserInfo.name}" information updated successfuly:`, updatedUserInfo });
    } catch (error) {   
        response.status(400).json({ msg: `Not able to update user info`, error });
    };
});


module.exports = router;
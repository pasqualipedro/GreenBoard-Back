/** Criando um roteador */
const { Router } =  require(`express`);
const router = Router();

/** importing models */
const User = require(`../models/User`);

/**REQUESTS */
/**Create new user */
router.post(`/auth/signup`, async (request, response) => {
    const payload = request.body;
    if(!payload) {
        return response.status(400).json({ msg: `missing user information for signup` });
    }
    try {
        const newUser = await User.create(payload);
        response.status(201).json({ msg: `user created successfuly`, newUser });
    } catch (error) {
        response.status(500).json({ msg: `Server error:`, error });
    }
});


module.exports = router;
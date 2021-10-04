/**
 * Start SERVER + DB connection
 */
const express = require(`express`);
require(`./config/db.config`);

const User = require(`./models/User`);
const UserCat = require(`./models/UserCategories`);
/* const DefaultCat = require(`./models/DefaultCategories`); */
const Transaction = require(`./models/Transaction`);


const PORT = 5000;

const app = express();

/**MIDDLEWARE (pass-through function) */
app.use(express.json()); /** allows json inside req.body */


/**REQUESTS - USERS */
/**Create new user */
app.post(`/auth/signup`, async (request, response) => {
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

/**Show default categories */
/* app.get(`/user/intro`, async (request, response) => {
    try {
        const arrDefaultCat = await DefaultCat.schema.path(`name`).enumValues;
        response.status(201).json({ msg: `Here are the default categories`, arrDefaultCat });
    } catch (error) {
        response.status(500).json({ msg: `Server error:`, error });
    }
}); */


/* const payload = DefaultCat.schema.path(`name`).enumValues[0]; */ /** ?? Not sure about this */



app.listen( PORT, () => console.log(`Server listen on Port ${PORT}`));


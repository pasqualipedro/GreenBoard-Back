/**
 * LOGIN / SIGNUP Routes
 */
const { Router } = require('express');
const router = Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** importing models */
const User = require('../models/User')

/**REQUESTS */
/**User logIn */
router.post('/login', async (request,response) =>{
    const { email, password } = request.body;
    console.log(request.body)
    try {
        const user = await User.findOne({ email });
        if(!user){
            throw new Error ('Email not found'); 
        };
        const compareHash = bcrypt.compareSync(password, user.passwordHash);
        if(!compareHash) {
            throw new Error ('Email or password incorrect');
        };

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {expiresIn: '1day'},
        );
        console.log(token);
        response.status(200).json({ ...payload, token });
    } catch (error) {
        response.status(400).json({msg: error.message});
        console.log(error);
    };
});

/**User signUp */
router.post('/signup', async (request, response) => {
    const { name, lastname, age, email, password } = request.body;
    console.log(request.body)
    try {
        const user = await User.findOne({ name }); 
        if(user){
            throw new Error('User already exists');
        };
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            lastname,
            age,
            email,
            passwordHash
        });
        response.status(201).json({
            name: newUser.name,
            lastname: newUser.lastname,
            msg: `Usuario criado com sucesso`
        });
    } catch (error) {
        response.status(500).json({ msg:'Erro ao criar novo usuário', error: error.message });
    }
});


module.exports = router
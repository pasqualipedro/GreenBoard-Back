const {Router, request} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken');

const router = Router()

router.post('/auth/signup', async (request, response) => {
    const {name, lastname, age, email, password} = request.body;
    console.log(request.body);
    try {
        const user= await User.findOne({name}); 
        if(user){
            throw new Error('User already exists')
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            lastname,
            age,
            email,
            passwordHash
        });
        console.log(newUser)
        response.status(201).json({
            msg:`${newUser.name} criado com sucesso`,
            newUser
        })
    } catch (error) {
        response.status(500).json({
            msg:'Erro ao criar novo usuário', 
            error
        });
        console.log(error)
    }
});

router.post('/auth/login', async (request,response) =>{
    const {email, password} = request.body;
    console.log(request.body)
    try {
        const user = await User.findOne({email});
        if(!user){
            throw new Error ('email not found'); 
        }
        const compareHash = bcrypt.compareSync(password, user.passwordHash);
        if(!compareHash) {
            throw new Error ('email or password incorrect');
        }

        const payload = {
            id: user.id,
            email: user.email,
        }

        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {expiresIn: '1day'},
        )
        response.status(200).json({ ...payload, token });
    } catch (error) {
        response.status(400).json({msg: error.message});
        console.log(error);
    }
})

module.exports = router
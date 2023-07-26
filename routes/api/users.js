var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../src/models/user.model');
const { createToken } = require('../../src/helpers/utils');
const { checkToken } = require('../../src/helpers/middlewares');


router.get('/', async (req,res) => {
    try {
        const users = await User.find().populate('cart');
        res.json(users);
    } catch (error) {
        res.json({fatal:error.message});
    }
})

router.get('/:userId', async (req,res) => {

    const {userId} = req.params;

    try {
        const user = await User.findById(userId).populate('cart');// populate nos ayuda a obtener la informacion de esa propiedad
        res.json(user);
    }catch(error){
        res.json({fatal:error.message});
    }
    
    
})

router.post('/register', async (req,res) => {

    // encriptamos la password

    req.body.password = bcrypt.hashSync(req.body.password,8);

    try {
        // crear el user en la BD

        const nuevoUsuario = await User.create(req.body);
        res.json(nuevoUsuario);

    } catch (error) {
        res.json({fatal:error.message});
    }

    
});

router.post('/login', async (req,res)=>{

    //mirar si el usuario con el mail recibido está en la BD
   const user = await User.findOne({email: req.body.email});
   if(!user){
    return res.json({fatal: "error en el email y/o contraseña"});
   }
   // compruebo la igualdad de las password
   const eq = bcrypt.compareSync(req.body.password,user.password);
   if(!eq) {
    return res.json({fatal: "error en el email y/o contraseña"});
   }

   res.json({success:'Login correcto', token:createToken(user),user});

});

// modificamos el put para que solo el usuario logado pueda meter productos en su carrito


router.put('/product/:productId',checkToken, async (req,res) => {

    const { productId } = req.params;

    try {

        const user = await User.findById(req.user._id);
        user.cart.push(productId);
        await user.save(); // actualizo el usuario con los nuevos valores

        res.json(user);
    } catch(error) {
        res.json({fatal:error.message});
    }

    


})

// actualizar datos de usuario

router.put('/:userId', async (req,res)=> {

    const {userId} = req.params;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(userId,req.body);
        res.json(updatedUser);

    } catch(error) {
        res.json ({fatal:error.message});
    }
    
});


module.exports = router;
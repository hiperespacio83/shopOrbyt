const jwt = require('jsonwebtoken');

const User = require('../../src/models/user.model')
const Product = require('../../src/models/product.model')

const checkToken = async (req,res,next) => {

    // compruebo si el token viene en la cabecera
    if(!req.headers['authorization']) {
        return res.json({fatal: 'Debes incluir la cabecera de Authorization'});
    }

    const token = req.headers['authorization'];

    // se comprueba la validez del token, hay 2 metodos verify y decode

    let payload;
    try {
        payload = jwt.verify(token,'pongo una frase');
    } catch(error) {
        return res.json({fatal:'El token es incorrecto'});
    }

    // payload (user_id,user_role,user_name,iat)
   req.user = await User.findById(payload.user_id).populate('cart');

  

    
    
    next();

}

const checkProductId = async (req,res,next) => {

    const {productId} = req.params;

    try {
        const product = await Product.findById(productId);

        if(!product) {
                return res.json({fatal:'El producto no existe en la BD'});
            }
    } catch(error) {
        return res.json({fatal:'El id del producto tiene un formato incorrecto'});
    }

    
    

    next();

}

module.exports = {checkToken,checkProductId};
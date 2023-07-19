const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
        user_id: user._id,
        user_role: user.role,
        user_name: user.username
    }
    return jwt.sign(payload,'pongo una frase')
}

module.exports = {createToken};
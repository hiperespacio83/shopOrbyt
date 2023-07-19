const { model, Schema} = require('mongoose');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email: String,
    role: {
        type: String,
        default: 'regular'
    },
    password: String,
    cart: [{type: Schema.Types.ObjectId, ref: 'product'}]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('user', userSchema);
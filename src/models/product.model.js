const { model, Schema} = require ('mongoose');

const productSchema = new Schema ({
    nombre: String,
    descripcion: String,
    precio: Number,
    categoria: String,
    stock: Number,
    disponible: Boolean,
    comprador: [{type: Schema.Types.ObjectId, ref: 'user'}]
},{
    timestamps: true,
    versionKey: false
});

module.exports = model('product',productSchema);
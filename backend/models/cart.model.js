module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        uid: String,
        products: Array,
    }, {
        timestamps: true,
    });

    schema.method("toJSON", function() {
        const { _v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Cart = mongoose.model("cart", schema);
    return Cart;
};
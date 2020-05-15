module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        uid: String,
        products: Array,
        totamount: Number,
        status: String,
    }, {
        timestamps: true,
    });

    schema.method("toJSON", function() {
        const { _v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Checkout = mongoose.model("checkout", schema);
    return Checkout;
};
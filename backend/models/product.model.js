module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      desc: String,
      price: Number,
      qty: Number,
      discount: Number,
      catid: String,
      uid: String,
      status: String,
      images: { type: String, default: null },
    },
    {
      timestamps: true,
    }
  );

  schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};

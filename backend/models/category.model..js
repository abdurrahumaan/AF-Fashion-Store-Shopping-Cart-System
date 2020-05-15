module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      status: String,
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

  const Category = mongoose.model("category", schema);
  return Category;
};

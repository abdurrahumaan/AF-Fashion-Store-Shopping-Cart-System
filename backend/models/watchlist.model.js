module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      uid: String,
      products: Array,
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

  const Watchlist = mongoose.model("watchlist", schema);
  return Watchlist;
};

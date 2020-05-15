module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        pid: String,
        uid: String,
        comment: String,
        rating: Number,
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
  
    const Comment = mongoose.model("comment", schema);
    return Comment;
  };
  
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    likeNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const LikeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const ItemModel =
  mongoose.models.Item || mongoose.model('Item', ItemSchema);
export const LikeModel =
  mongoose.models.Like || mongoose.model('Like', LikeSchema);
export const UserModel =
  mongoose.models.User || mongoose.model('User', UserSchema);

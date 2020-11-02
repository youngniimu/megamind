import mongoose from 'mongoose';

interface UserAttrs {
  username: string;
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  friends: string[]; // populate this with existing users
  stats: {
    gamesPlayed: number;
    gamesWon: number;
  };
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    friends: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

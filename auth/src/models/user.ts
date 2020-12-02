import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {
  username: string;
  password: string;
  color: string;
}

interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  // friends: string[]; // populate this with existing users
  color: string;
  gamesPlayed: number;
  gamesWon: number;
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
    color: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    // friends: {
    //   default: [],
    //   type: mongoose.Types.ObjectId,
    //   ref: 'User',
    // },
    gamesPlayed: {
      default: 0,
      type: Number,
    },
    gamesWon: {
      default: 0,
      type: Number,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id, delete ret.password, delete ret.__v;
      },
    },
  }
);

// before saving we hash the password to our database
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

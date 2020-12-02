import mongoose from 'mongoose';

interface PlayerAttrs {
  username: string;
  color: string;
}

export interface PlayerDoc extends mongoose.Document {
  username: string;
  color: string;
}

interface PlayerModel extends mongoose.Model<PlayerDoc> {
  build(attrs: PlayerAttrs): PlayerDoc;
}

const playerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
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

playerSchema.statics.build = (attrs: PlayerAttrs) => {
  return new Player(attrs);
};

const Player = mongoose.model<PlayerDoc, PlayerModel>('Player', playerSchema);

export { Player };

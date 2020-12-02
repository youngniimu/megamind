import mongoose from 'mongoose';
import { PlayerDoc } from './player';

interface RoomAttrs {
  admin: PlayerDoc;
  players: PlayerDoc[];
  password: string;
  publicRoom: boolean;
}

interface RoomDoc extends mongoose.Document {
  roomName: string;
  admin: PlayerDoc;
  players: PlayerDoc[];
  password: string;
  publicRoom: boolean;
  active: boolean;
  inGame: boolean;
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
}

const roomSchema = new mongoose.Schema(
  {
    roomName: {
      required: false,
      type: String,
    },
    admin: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    players: {
      required: true,
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Player',
    },
    password: {
      required: false,
      type: String,
    },
    publicRoom: {
      required: true,
      type: Boolean,
    },
    active: {
      required: true,
      type: Boolean,
      default: true,
    },
    inGame: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.publicRoom;
        delete ret.active;
        delete ret.password;
      },
    },
  }
);

// roomSchema.pre('save', async function (done) {
//   const roomName = Math.floor(1000 + Math.random() * 9000).toString();
//   this.set('roomName', roomName);
//   done();
// });

roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room(attrs);
};

const Room = mongoose.model<RoomDoc, RoomModel>('Rooms', roomSchema);

export { Room };

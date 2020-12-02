import { currentUser } from '@megamindgame/common';
import { Router, Request, Response } from 'express';
import { Room } from '../models/room';
import { Player } from '../models/player';

const router = Router();

router.post('/api/rooms', async (req: Request, res: Response) => {
  const { password, publicRoom } = req.body;
  const { id } = req.currentUser!;
  const player = await Player.findById(id);

  if (!player) {
    throw new Error('player not found');
  }

  const room = Room.build({
    admin: player,
    players: [player],
    password,
    publicRoom,
  });
  await room.save();
  res.status(201).send(room);
});

export { router as newRoomRouter };

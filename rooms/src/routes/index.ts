import { Router, Request, Response } from 'express';
import { Room } from '../models/room';

const router = Router();

router.get('/api/rooms', async (req: Request, res: Response) => {
  const rooms = await Room.find({
    publicRoom: true,
    inGame: false,
    active: true,
  });
  res.status(200).send(rooms);
});

export { router as indexRoomRouter };

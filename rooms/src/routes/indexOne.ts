import { Router, Request, Response } from 'express';
import { Room } from '../models/room';

const router = Router();

router.get('/api/rooms/:roomId', async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const rooms = await Room.findById(roomId);
  res.status(200).send(rooms);
});

export { router as indexRoomRouter };

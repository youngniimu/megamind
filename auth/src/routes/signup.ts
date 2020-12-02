import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@megamindgame/common';
import { body } from 'express-validator';
import { PlayerCreatedPublisher } from '../events/publishers/playerCreatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('username')
      .exists()
      .isAlphanumeric()
      .isLength({ min: 2, max: 8 })
      .withMessage(
        'Username must be between 2 and 8 letters, and contain only characters and numbers'
      ),
    body('password')
      .exists()
      .isLength({ min: 6 })
      .withMessage('Password must be atleast 6 characters long'),
    body('color').exists().isRgbColor().withMessage('Give valid rgb color'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password, color } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError('Username already in use');
    }

    const user = User.build({
      username,
      password,
      color,
    });
    await user.save();
    console.log('user saved');
    // new PlayerCreatedPublisher(natsWrapper.client).Publish({
    //   username: user.username,
    //   color: user.color,
    //   id: user._id,
    // });
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      'asdf'
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };

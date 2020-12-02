import Router, { Request, Response } from 'express';
import { BadRequestError, validateRequest } from '@megamindgame/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/api/users/signin',
  [
    body('username').exists().withMessage('Provide username'),
    body('password').exists().withMessage('Provide password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log('here');
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      throw new BadRequestError('Invalid username');
    }

    const rightPassword = await Password.compare(
      existingUser.password,
      password
    );
    if (!rightPassword) {
      throw new BadRequestError('Invalid password');
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      'asdf'
    );

    req.session = { jwt: userJwt };
    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };

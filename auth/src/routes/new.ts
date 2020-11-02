import { Router } from 'express';
import { updateLanguageServiceSourceFile } from 'typescript';
import { User } from '../models/user';

const router = Router();

router.post('/api/users/new', async (req, res) => {
  const { username, email, password } = req.body;
  console.log;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = User.build({
    username,
    email,
    password,
  });
  await user.save();

  res.send(user);
});

export { router as newUserRouter };

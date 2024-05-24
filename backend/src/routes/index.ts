import { Router } from 'express';

import authRoutes from './auth.routes';

const router = Router();

router.use('/api', authRoutes);
router.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

export default router;

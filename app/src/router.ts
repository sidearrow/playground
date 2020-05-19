import { Router } from 'express';
import loginController from './controllers/loginController';

const router = Router();

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.post('/login', loginController);

router.get('/', (req, res) => {
  res.render('pages/index');
});

export default router;

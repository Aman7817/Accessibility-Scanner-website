import { Router } from 'express';
import chatController from '../controllers/chatBot.controllers.js';

const router = Router();

router.route('/').post(chatController.sendMessage);
router.route('/health').get(chatController.healthCheck)

export default router;
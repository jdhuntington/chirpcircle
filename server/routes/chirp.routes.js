import { Router } from 'express';
import * as ChirpController from '../controllers/chirp.controller';
const router = new Router();

router.route('/getChirps').get(ChirpController.getChirps);
router.route('/getChirp').get(ChirpController.getChirp);
router.route('/addChirp').post(ChirpController.addChirp);

export default router;

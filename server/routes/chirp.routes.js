import { Router } from 'express';
import * as ChirpController from '../controllers/chirp.controller';
const router = new Router();

router.route('/getChirps').get(ChirpController.getChirps);
router.route('/getNearbyChirps').get(ChirpController.getNearbyChirps);
router.route('/getChirp').get(ChirpController.getChirp);
router.route('/nop').get(ChirpController.nop);
router.route('/addChirp').post(ChirpController.addChirp);

export default router;

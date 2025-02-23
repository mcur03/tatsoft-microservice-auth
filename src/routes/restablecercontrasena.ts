import { Router } from 'express';
import { requestResetCode, validateResetCode, resetPassword } from '../controllers/restablecerContrasenaController';
import {validateRequest} from '../Middleware/validate'

const router: Router = Router();

router.post('/request-reset-code', (req, res, next) => {
    requestResetCode(req, res).catch(next);
  });
  router.post('/validate-reset-code',  validateRequest, validateResetCode);
router.post('/reset-password', validateRequest, resetPassword);

export default router;

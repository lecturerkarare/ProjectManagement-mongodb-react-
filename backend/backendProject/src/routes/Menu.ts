import { Router } from 'express';
import {
getAllMenus
} from "../controller/Menu"
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types/role';


const router = Router();


router.route('/all').get(protect, authorize([Role.SYSADMIN]),getAllMenus);






export { router as MenuRoutes };

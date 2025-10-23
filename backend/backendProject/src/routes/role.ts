import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { RoleUpdated, createRole, deleteRoleId, getAllRoles, getRoleById } from '../controller/roles';
import { Role } from '../types';

const router = Router();


//route  admin routes\

router.route('/create-role').post(protect,authorize([Role.SYSADMIN]),createRole)
router.route('/allRoles').get(protect, authorize([Role.SYSADMIN,]),  getAllRoles);
router.route('/:id').get(protect, authorize([Role.SYSADMIN]),  getRoleById);
router.route('/delete/:id').delete(protect, authorize([Role.SYSADMIN]),deleteRoleId)
router.route('/update/:id').patch(protect, authorize([Role.SYSADMIN]),RoleUpdated)



export { router as roleRoutes };

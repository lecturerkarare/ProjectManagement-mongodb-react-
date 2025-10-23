import { Router } from 'express';
import { CreateWorkspace,getAllWorkspace,deleteWorkspace,UpdateWorkspace,getWorkspaceById, AddmemberToWorkspace, } from '../controller/workspace';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';

const router = Router();
router.route('/create').post(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),CreateWorkspace)
router.route('/all').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),  getAllWorkspace);
router.route('/:id').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),  getWorkspaceById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), deleteWorkspace);
router.route('/add-member/:id').patch(protect, authorize([Role.SYSADMIN]),AddmemberToWorkspace)
router.route('/:id').patch(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), UpdateWorkspace);
export { router as workspaceRoutes };

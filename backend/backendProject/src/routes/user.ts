import { Router } from "express";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  AssignUserRole,
  UnssignUserRole,
} from "../controller/user";
import { authorize, protect } from "../middleware/auth";
import { Role } from "../types";

const router = Router();


router.route("/all").get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), getAllUsers);
/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/:id")
  .get(protect, authorize([Role.SYSADMIN, Role.USER,Role.PROJECTMANAGER]), getUserById);
/**
 * @openapi
 * /api/user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/:id")
  .delete(protect, authorize([Role.SYSADMIN, Role.USER]), deleteUser);
/**
 * @openapi
 * /api/user/{id}:
 *   patch:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/:id")
  .patch(protect, authorize([Role.SYSADMIN, Role.USER]), updateUser);
/**
 * @openapi
 * /api/user/assign/{id}:
 *   patch:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/assign/:id")
  .patch(protect, authorize([Role.SYSADMIN]), AssignUserRole, UnssignUserRole);
/**
 * @openapi
 * /api/user/unassign/{id}:
 *   patch:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/unassign/:id")
  .patch(protect, authorize([Role.SYSADMIN]), UnssignUserRole);

export { router as userRoutes };

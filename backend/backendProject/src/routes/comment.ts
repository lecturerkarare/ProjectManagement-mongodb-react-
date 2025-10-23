import { Router } from "express";
import { authorize, protect } from "../middleware/auth";
import { Role } from "../types";
import {
  UpdateComment,
  createComment,
  deleteComment,
  getAllCommentsByProjectId,
  getCommentById,
} from "../controller/comment";

const router = Router();
/**
 * @openapi
 * /api/comment/create:
 *   post:
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - type
 
 *             properties:
 *               comment:
 *                 type: string
 *                 default: test
 *               type:
 *                 type: string
 *                 default: PROJECTCOMMENT
*     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router
  .route("/create")
  .post(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    createComment
  );
  /**
 * @openapi
 * /api/comment/all/{moduleId}:
 *   get:
 *     tags:
 *       - Comment
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
  .route("/all/:moduleId")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    getAllCommentsByProjectId
  );
  /**
 * @openapi
 * api/comment/{id}:
 *   get:
 *     tags:
 *       - Comment
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
  .route("/:commentId")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    getCommentById
  );
    /**
 * @openapi
 * api/comment/{id}:
 *   delete:
 *     tags:
 *       - Comment
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
  .route("/:commentId")
  .delete(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    deleteComment
  );
    /**
 * @openapi
 * api/comment/{id}:
 *   patch:
 *     tags:
 *       - Comment
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
  .route("/:commentId")
  .patch(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    UpdateComment
  );

export { router as CommentSRoute };

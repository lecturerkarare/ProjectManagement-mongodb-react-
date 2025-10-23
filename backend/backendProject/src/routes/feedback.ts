import { Router } from 'express';
import {authorize, protect } from "../middleware/auth"
import { createFeedback, deleteFeedback, getAllfeedback, getFeedbackById, updateFeedBack } from '../controller/feedback';
import { Role } from '../types';

const router = Router();

/**
 * @openapi
 * /api/feedback/create:
 *   post:
 *     tags:
 *       - Feedback
 *    
 *     security:
 *       - bearerAuth: []   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - raisedBy
 *             properties:
 *               title:
 *                 type: string
 *                 default: test
 *               description:
 *                 type: string
 *                 default: test yes
 *               raisedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router.route('/create').post(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),createFeedback)
/**
 * @openapi
 * /api/feedback/all:
 *   post:
 *     tags:
 *       - Feedback
 *    
 *     security:
 *       - bearerAuth: []   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
      responses:
 *       200:
 *         description: get
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router.route('/all').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), getAllfeedback)
/**
 * @openapi
 * /api/feedback/{id}:
 *   get:
 *     tags:
 *       - Feedback
 *    
 *     security:
 *       - bearerAuth: []   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
      responses:
 *       200:
 *         description: get
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router.route('/:id').get(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), getFeedbackById);
/**
 * @openapi
 * /api/feedback/{id}:
 *   delete:
 *     tags:
 *       - Feedback
 *    
 *     security:
 *       - bearerAuth: []   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
      responses:
 *       200:
 *         description: get
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), deleteFeedback);
/**
 * @openapi
 * /api/feedback/{id}:
 *   patch:
 *     tags:
 *       - Feedback
 *    
 *     security:
 *       - bearerAuth: []   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
      responses:
 *       200:
 *         description: get
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/:id').patch(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), updateFeedBack);

export { router as FeedbackRoute };

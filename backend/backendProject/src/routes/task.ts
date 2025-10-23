import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';
import { AssignTask, UpdateTask, createTask, deleteTask, getAllMyTasks, getAllTasks, getTaskById } from '../controller/task';

const router = Router();
/**
 * @openapi
 * /api/task/create/{ticketId}:
 *   post:
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - startDate
 *               - endDate
 *               - dueDate  
 *               - issue
 *             properties:
 *               name:
 *                 type: string
 *                 default: test
 *               description:
 *                 type: string
 *                 default: test yes
 *               startDate:
 *                 type: string  
 *               endDate:
 *                 type: string  
 *               dueDate:
 *                 type: string  
 *               issue:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/create/:issueId').post(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),createTask)
/**
 * @openapi
 * /api/task/all/mytask:
 *   get:
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - ticketId: 1
 *                 task: ticketId 1
 *                 description: ticketId 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31

 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router.route('/all/mytask').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),  getAllMyTasks);
/**
 * @openapi
 * /api/task/all:
 *   get:
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - ticketId: 1
 *                 task: ticketId 1
 *                 description: ticketId 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31

 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/all').get(protect,authorize([Role.SYSADMIN]),getAllTasks)
/**
 * @openapi
 * api/task/{id}:
 *   get:
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - task: 1
 *                 title: task 1
 *                 description: titaskket 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/:id').get(protect, authorize([Role.SYSADMIN,Role.USER,Role.PROJECTMANAGER]), getTaskById );
/**
 * @openapi
 * api/task/{id}:
 *   delete:
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - ticketId: 1
 *                 title: ticket 1
 *                 description: ticket 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), deleteTask);
/**
 * @openapi
 * api/task/{id}:
 *   patch:
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - ticketId: 1
 *                 title: ticket 1
 *                 description: ticket 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/:id').patch(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),UpdateTask);
/**
 * @openapi
 * api/task/assignTo{id}:
 *   patch:
 *     tags:
 *       - Task
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - ticketId: 1
 *                 title: ticket 1
 *                 description: ticket 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route('/assignTo/:id').patch(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),AssignTask)
export { router as TaskRoutes };

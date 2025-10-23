import { Router } from "express";
import { authorize, protect } from "../middleware/auth";

import {
  CreateIssue,
  UpdateIssue,
  deleteIssue,
  getAllIssues,
  getAllIssuesAssigneTome,
} from "../controller/issue";
import { Role } from "../types";

const router = Router();
/**
 * @openapi
 * /api/ticket/create:
 *   post:
 *     tags:
 *       - Ticket
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
 *               - startDate
 *               - endDate
 *               - dueDate  
 *               - project
 *             properties:
 *               title:
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
 *               project:
 *                 type: string
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
    CreateIssue
  );
/**
 * @openapi
 * /api/ticket/all:
 *   get:
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - ticketId: 1
 *                 title: ticketId 1
 *                 description: ticketId 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *               - ticketId: 2
 *                 title: ticketId 2
 *                 description: ticketId 2 description
 *                 startDate: 2022-04-01
 *                 endDate: 2022-04-30
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router
  .route("/all")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    getAllIssues
  );
/**
 * @openapi
 * /api/ticket/mine:
 *   get:
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - ticketId: 1
 *                 title: ticketId 1
 *                 description: ticketId 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *               - ticketId: 2
 *                 title: ticketId 2
 *                 description: ticketId 2 description
 *                 startDate: 2022-04-01
 *                 endDate: 2022-04-30
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/mine")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    getAllIssuesAssigneTome
  );
/**
 * @openapi
 * api/ticket/{id}:
 *   delete:
 *     tags:
 *       - Ticket
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
router
  .route("/:id")
  .delete(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    deleteIssue
  );
/**
 * @openapi
 * /api/ticket/{id}:
 *   patch:
 *     tags:
 *       - Ticket
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
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 default: test
 *               description:
 *                 type: string
 *                 default: test yes
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

router
  .route("/:id")
  .patch(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    UpdateIssue
  );

export { router as IssuesRoute };

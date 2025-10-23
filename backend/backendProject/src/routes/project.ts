import { Router } from "express";
import { authorize, protect } from "../middleware/auth";
import { Role } from "../types";
import {
  AssignProject,
  CreateProject,
  UpdateProject,
  deleteProject,
  getAllProject,
  getProjectById,
  getAllProjectStatus,
  getAllProjectsAssigneTome,

} from "../controller/Project";
import { ProjectService } from "../services/project";
import { Request, Response, NextFunction } from "express";
const router = Router();
/**
 * @openapi
 * tags:
 *   name: Project
 *   
 */
/**
 * @openapi
 * /api/project/create:
 *   post:
 *     tags:
 *       - Project
 *     summary: Create project
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
  .route("/create")
  .post(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),
    CreateProject
  );

/**
 * @openapi
 * /api/project/all:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get projects
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - projectId: 1
 *                 title: Project 1
 *                 description: Project 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *               - projectId: 2
 *                 title: Project 2
 *                 description: Project 2 description
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
    // protect,
    // authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER,Role.DEVELOPER]),
    getAllProject
  );

  router
  .route("/status/count")
  .get(
    protect,
    authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),
    getAllProjectStatus
  );
  /**
 * @openapi
 * api/project/all/myprojects:
 *   get:
 *     tags:
 *       - Project
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - projectId: 1
 *                 title: Project 1
 *                 description: Project 1 description
 *                 startDate: 2022-03-01
 *                 endDate: 2022-03-31
 *               - projectId: 2
 *                 title: Project 2
 *                 description: Project 2 description
 *                 startDate: 2022-04-01
 *                 endDate: 2022-04-30
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/all/myprojects")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    getAllProjectsAssigneTome
  );

  /**
 * @openapi
 * api/project/{id}:
 *   get:
 *     tags:
 *       - Project
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - projectId: 1
 *                 title: Project 1
 *                 description: Project 1 description
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
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.USER, Role.PROJECTMANAGER]),
    getProjectById
  );
    /**
 * @openapi
 * api/project/{id}:
 *   delete:
 *     tags:
 *       - Project
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - projectId: 1
 *                 title: Project 1
 *                 description: Project 1 description
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
    deleteProject
  );
  /**
 * @openapi
 * /api/project/{id}:
 *   patch:
 *     tags:
 *       - Project
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
    UpdateProject
  );
    /**
 * @openapi
 * /api/project/assignTo/{id}:
 *   patch:
 *     tags:
 *       - Project
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
  .route("/assignTo/:id")
  .patch(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    AssignProject
  );


 /**
 * @openapi
 * api/project/dashboard/totals:
 *   get:
 *     tags:
 *       - Project
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 
 *              
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
  router.get("/dashboard/totals", protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), async (req:Request, res:Response,next:NextFunction) => {
    try {
      const result = await ProjectService.dashboardSummary(req,res,next);
      res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
    } catch (error) {
      res.status(500).json({ msg:error });
    }
    next()
  });
 /**
 * @openapi
 * api/project/dashboard/user/totals:
 *   get:
 *     tags:
 *       - Project
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 
 *              
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
  router.get("/dashboard/user/totals", protect, authorize([Role.USER]), async (req:Request, res:Response,next:NextFunction) => {
    try {
      const result = await ProjectService.getUserDashboardSummary(req,res,next);
      res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
    } catch (error) {
      res.status(500).json({ msg:error });
    }
    next()
  });


  // router.get("/user/total", protect, authorize(['user']), async (req, res) => {
  //   try {
  //     const result = await getUserTotals(req);
  //     res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
  //   } catch (error) {
  //     res.status(500).json({ msg:error });
  //   }
  // });

export { router as projectRoutes };

import { Router } from "express";

import {
  validate,
  loginValidation,
  signUpValidation,
  changePasswordValidation,
} from "../validation/index";
import { changedPassword, login, signUp } from "../controller/auth";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: auth
 *   description: Authentication APIs
 */

/**
 * @openapi
 * /api/auth/signUp:
 *   post:
 *     tags:
 *       - auth
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 default: john
 *               lastname:
 *                 type: string
 *                 default: doe
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route("/signUp").post(signUpValidation(), validate, signUp);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router.route("/login").post(loginValidation(), validate, login);

/**
 * @openapi
 * /api/auth/change-password:
 *   post:
 *     tags:
 *       - auth
 *     summary: Change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: johndoe@mail.com
 *               password:
 *                 type: string
 *                 default: johnDoe20!@
 *     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
router
  .route("/change-password")
  .patch(changePasswordValidation(), validate, changedPassword);

export { router as authRoutes };

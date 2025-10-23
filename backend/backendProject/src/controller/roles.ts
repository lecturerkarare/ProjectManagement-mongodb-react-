import { NextFunction, Request, Response } from "express";
import { RoleService } from "../services/roles";

const RolesController = {
  createRole(req: Request, res: Response, next: NextFunction) {
    RoleService.CreateRole(req, res, next);
  },
  createDefaultRoles(req: Request, res: Response, next: NextFunction) {
    RoleService.createDefaultRoles(req, res, next);
  },
  getAllRoles(req: Request, res: Response, next: NextFunction) {
    RoleService.getAllRoles(req, res, next);
  },

  getRoleById(req: Request, res: Response, next: NextFunction) {
    RoleService.getRoleById(req, res, next);
  },
  deleteRoleId(req: Request, res: Response, next: NextFunction) {
    RoleService.deleteRole(req, res, next);
  },
  RoleUpdated(req: Request, res: Response, next: NextFunction) {
    RoleService.updateRole(req, res, next);
  },
};
export const {
  getAllRoles,
  createRole,
  getRoleById,
  deleteRoleId,
  RoleUpdated,
} = RolesController;

export enum Role {
  USER = "USER",
  SYSADMIN = "SYSADMIN",
  PROJECTMANAGER='PROJECT MANAGER',
  DEVELOPER='DEVELOPER'
}
export interface Roles {
  _id: any;
  name: any;
  role?: Role;
}

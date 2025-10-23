import { Role } from "./role";

export type User = {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role:Role[]
};

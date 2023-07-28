export enum ROLES {
  TECHNIQUE = "TECHNIQUE",
  EMPLOYEE = "EMPLOYEE",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export interface Register {
  name: string;
  phone: string;
  password: string;
  roleCode:ROLES
}

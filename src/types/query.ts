import { ROLES } from "./global";

export interface Quer_User {
    page?: string,
    pageSize?: string,
    roleName?: ROLES | '',
    search?: string
}
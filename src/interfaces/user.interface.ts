import {Auth} from "./auth.interface";
import {Role} from "./role.interface";

export interface User extends Auth {
     id?: string;
     name: string;
     description: string;
     role: Role[]
}
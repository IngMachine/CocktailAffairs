import {Auth} from "./auth.interface";
import {Role} from "./role.interface";

export interface User extends Auth {
     name: string;
     description: string;
     role: Role[]
}
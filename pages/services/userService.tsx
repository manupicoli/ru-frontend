import { UserRole } from "../utils/enums/userRole";

export interface UserDTO {
    id?: number,
    username?: string,
    email?: string,
    role?: UserRole
}
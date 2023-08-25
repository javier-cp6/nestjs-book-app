import { Role } from "../enums/role.enum";

export class UserDto {
  readonly username: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly role: Role;
}

export class ChangePasswordDto {
  readonly username: string;
  readonly currentPassword: string;
  readonly newPassword: string;
}
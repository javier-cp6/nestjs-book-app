export class UserDto {
  readonly username: string;
  readonly password: string;
}

export class ChangePasswordDto {
  readonly username: string;
  readonly currentPassword: string;
  readonly newPassword: string;
}
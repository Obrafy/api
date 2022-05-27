import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsMongoId, IsString } from 'class-validator';
import { TransformEnums } from 'src/common/helpers/enum.helpers';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';
import { Role as InternalRole } from 'src/auth/enums/role.enum';
import { Status as InternalStatus } from 'src/auth/enums/status.enum';

export class UserDto implements PROTO.User {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  id: string;
  email: string;

  @Transform(({ value }) => TransformEnums(InternalRole, PROTO.Role, value))
  roles: PROTO.Role[];

  @Transform(({ value }) => TransformEnums(InternalStatus, PROTO.Status, value))
  status: PROTO.Status;

  @Transform(({ value }) => new Date(Number(value)))
  lastLogin?: number;

  @Transform(({ value }) => new Date(Number(value)))
  createdAt: number;

  @Transform(({ value }) => new Date(Number(value)))
  updatedAt: number;
}

export class RegisterRequestDto implements PROTO.RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class LoginRequestDto implements PROTO.LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class ActivateUserRequestDto implements PROTO.ActivateUserByIdRequest {
  @IsMongoId()
  public readonly userId: string;
}

export class DeactivateUserRequestDto implements PROTO.DeactivateUserByIdRequest {
  @IsMongoId()
  public readonly userId: string;
}

export class FindUserRequestDto implements PROTO.FindUserByIdRequest {
  @IsMongoId()
  public readonly userId: string;
}

export class FindAllUsersRequestDto implements PROTO.FindAllUsersRequest {}

export class FindAllUsersForRolesRequestDto implements PROTO.FindAllUsersForRolesRequest {
  @Transform(({ value }) => TransformEnums(InternalRole, PROTO.Role, value))
  @IsEnum(InternalRole)
  roles: PROTO.Role[];
}

export class AddRoleToUserRequestDto implements PROTO.AddRoleToUserRequest {
  @IsMongoId()
  userId: string;

  @Transform(({ value }) => TransformEnums(InternalRole, PROTO.Role, value))
  @IsEnum(InternalRole)
  role: PROTO.Role;
}

export class RemoveRoleFromUserRequestDto implements PROTO.RemoveRoleFromUserRequest {
  @IsMongoId()
  userId: string;

  @Transform(({ value }) => TransformEnums(InternalRole, PROTO.Role, value))
  @IsEnum(InternalRole)
  role: PROTO.Role;
}

export class RemoveUserRequestDto implements PROTO.RemoveUserByIdRequest {
  @IsMongoId()
  userId: string;
}

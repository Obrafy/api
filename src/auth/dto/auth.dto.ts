import { Transform } from 'class-transformer';
import { IsEmail, IsMongoId, IsString } from 'class-validator';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';

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

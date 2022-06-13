import { SetMetadata } from '@nestjs/common';
import { Role as InternalRoleEnum } from 'src/auth/enums/role.enum';
import { TransformEnums } from 'src/common/helpers/enum.helpers';
import { Role as ProtoRoleEnum } from 'src/common/proto/authentication-service/auth.pb';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: InternalRoleEnum[]) => {
  const transformedRoles = roles.map((r) => TransformEnums(ProtoRoleEnum, InternalRoleEnum, r));
  return SetMetadata(ROLES_KEY, transformedRoles);
};

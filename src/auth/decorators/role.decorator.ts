import { SetMetadata } from '@nestjs/common';
import { Role as InternalRoleEnum } from 'src/auth/enums/role.enum';
import { Role as ProtoRoleEnum } from 'src/common/proto/authentication-service/auth.pb';

const TransformEnums = <T, G>(OuterEnum: T, InnerEnum: G, value: any) => {
  if (Array.isArray(value)) {
    const transformedArray = [];
    for (const v of value) {
      transformedArray.push(OuterEnum[InnerEnum[v]]);
    }

    return transformedArray;
  }

  return OuterEnum[InnerEnum[value]];
};

export const ROLES_KEY = 'roles';
export const Roles = (...roles: InternalRoleEnum[]) => {
  const transformedRoles = roles.map((r) => TransformEnums(ProtoRoleEnum, InternalRoleEnum, r));
  return SetMetadata(ROLES_KEY, transformedRoles);
};

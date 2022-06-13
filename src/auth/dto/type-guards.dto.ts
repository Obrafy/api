import * as DTO from 'src/auth/dto/auth.dto';

export const isFindAllUsersForRolesRequestDto = (
  pet: DTO.FindAllUsersForRolesRequestDto | DTO.FindAllUsersRequestDto,
): pet is DTO.FindAllUsersForRolesRequestDto => {
  return (pet as DTO.FindAllUsersForRolesRequestDto).roles !== undefined;
};

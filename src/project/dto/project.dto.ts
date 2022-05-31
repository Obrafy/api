import { plainToClass, Transform } from 'class-transformer';
import { IsMongoId, IsString, ValidateNested } from 'class-validator';
import { TransformEnums } from 'src/common/helpers/enum.helpers';

import * as PROTO from 'src/common/proto/project-service/project.pb';
import { Status as InternalStatus } from 'src/project/enums/status.enum';
import { LevelType as InternalLevelType } from 'src/project/enums/level-type.enum';
import { UnityType as InternalUnityType } from 'src/project/enums/unity-type.enum';

// Base Types
export class FieldsOverridesDto implements PROTO.FieldsOverrides {
  @IsString()
  activity?: string;

  @IsString()
  category?: string;

  @IsString()
  description?: string;

  @Transform(({ value }) => TransformEnums(InternalLevelType, PROTO.LevelType, value))
  dirtLevel?: PROTO.LevelType;

  @Transform(({ value }) => TransformEnums(InternalLevelType, PROTO.LevelType, value))
  noiseLevel?: PROTO.LevelType;

  @Transform(({ value }) => TransformEnums(InternalUnityType, PROTO.UnityType, value))
  unity?: PROTO.UnityType;
}

export class ProjetTaskDto implements PROTO.ProjectTask {
  @IsMongoId()
  task: string;

  @IsMongoId({ each: true })
  laborers: string[];

  fieldsOverrides?: PROTO.FieldsOverrides;
}

export class AddressDto implements PROTO.Address {
  @IsString()
  zipCode: string;

  @IsString()
  city: string;

  @IsString()
  neighborhood: string;

  @IsString()
  number: string;

  @IsString()
  state: string;

  @IsString()
  street: string;
}

export class ProjectDto implements PROTO.Project {
  constructor(partial: Partial<ProjectDto>) {
    Object.assign(this, partial);
  }

  @IsMongoId()
  id: string;

  @IsString()
  responsible: string;

  @Transform(({ value }) => plainToClass(AddressDto, value))
  @ValidateNested()
  address: AddressDto;

  @Transform(({ value }) => value.map((v: any) => plainToClass(ProjetTaskDto, v)))
  projectTask: PROTO.ProjectTask[];

  @Transform(({ value }) => TransformEnums(InternalStatus, PROTO.Status, value))
  status: PROTO.Status;

  @Transform(({ value }) => new Date(Number(value) * 1000)) // This seconds to milliseconds needs to be handled by the service
  startDate: number;

  @Transform(({ value }) => new Date(Number(value) * 1000)) // This seconds to milliseconds needs to be handled by the service
  expectedFinishedDate: number;
}

// Input Types
export class CreateProjectDto implements PROTO.ProjectCreateRequest {
  @IsString()
  responsible: string;

  @IsString()
  startDate: string;

  @IsString()
  expectedFinishedDate: string;

  @Transform(({ value }) => plainToClass(AddressDto, value))
  @ValidateNested()
  address: PROTO.Address;

  @IsMongoId({ each: true })
  tasks: string[];

  @Transform(({ value }) => TransformEnums(InternalStatus, PROTO.Status, value))
  status: PROTO.Status;
}

export class FindAllProjectsDto implements PROTO.ProjectFindAllRequest {}

export class FindProjectDto implements PROTO.ProjectFindOneRequest {
  @IsMongoId()
  id: string;
}

export class RemoveProjectDto implements PROTO.ProjectRemoveRequest {
  @IsMongoId()
  id: string;
}

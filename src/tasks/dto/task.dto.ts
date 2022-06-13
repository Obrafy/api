import { plainToClass, Transform, Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsString, ValidateNested } from 'class-validator';
import { TransformEnums } from 'src/common/helpers/enum.helpers';
import * as PROTO from 'src/common/proto/project-service/project.pb';

import { Status as InternalStatus } from '../../common/enums/status.enum';
import { LevelType as InternalLevelType } from '../../common/enums/level-type.enum';
import { UnityType as InternalUnityType } from '../../common/enums/unity-type.enum';

export class PossibleSkillsDto implements PROTO.PossibleSkills {
  @IsNumber()
  requiredSkillLevel: number;

  @IsString()
  skillId: string;
}

export class TaskDto implements PROTO.Task {
  constructor(partial: Partial<TaskDto>) {
    Object.assign(this, partial);
  }

  @IsMongoId()
  id: string;

  @Transform(({ value }) => TransformEnums(InternalLevelType, PROTO.LevelType, value))
  dirtLevel: PROTO.LevelType;

  @Transform(({ value }) => TransformEnums(InternalLevelType, PROTO.LevelType, value))
  noiseLevel: PROTO.LevelType;

  @Transform(({ value }) => TransformEnums(InternalUnityType, PROTO.UnityType, value))
  unity: PROTO.UnityType;

  @Transform(({ value }) => TransformEnums(InternalStatus, PROTO.Status, value))
  status: string;

  @IsString()
  activity: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsNumber()
  priority: number;

  @Transform(({ value }) => value.map((v: any) => plainToClass(PossibleSkillsDto, v)))
  possibleSkills: PROTO.PossibleSkills[];
}

export class FindTaskDto implements PROTO.TaskFindOneRequest {
  @IsMongoId()
  taskId: string;
}

export class RemoveTaskDto implements PROTO.TaskRemoveRequest {
  @IsMongoId()
  taskId: string;
}

export class TaskStatustDto implements PROTO.ActivateTaskRequest, PROTO.DeactivateTaskRequest {
  @IsMongoId()
  taskId: string;
}

export class SkillDto implements PROTO.SkillRequest {
  @IsMongoId()
  id: string;

  @IsNumber()
  requiredSkillLevel: number;
}

export class AddSkillToTaskDto implements PROTO.AddSkillToTaskRequest {
  @IsMongoId()
  taskId: string;

  @Type(() => SkillDto)
  @ValidateNested()
  skills: SkillDto[];
}

export class RemoveSkillToTaskDto implements PROTO.RemoveSkillToTaskRequest {
  @IsMongoId()
  taskId: string;

  @IsMongoId({ each: true })
  skillIds: string[];
}

export class CreateTaskDto implements PROTO.TaskCreateRequest {
  activity: string;
  category: string;
  description: string;
  dirtLevel: PROTO.LevelType;
  noiseLevel: PROTO.LevelType;
  possibleSkills: PROTO.PossibleSkills[];
  priority: number;
  unity: PROTO.UnityType;
}

export class FindAllTasksDto implements PROTO.TaskFindAllRequest {}

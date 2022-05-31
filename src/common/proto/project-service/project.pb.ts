/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'project';

/** All Enums */
export enum Status {
  INVALID = 0,
  ACTIVE = 1,
  INACTIVE = 2,
  IN_PROGRESS = 3,
  FINISHED = 4,
  DELETED = 5,
  UNRECOGNIZED = -1,
}

export enum LevelType {
  LOW = 0,
  HIGH = 1,
  UNRECOGNIZED = -1,
}

export enum UnityType {
  VB = 0,
  M2 = 1,
  UNID = 2,
  UNRECOGNIZED = -1,
}

export interface ProjectResponseData {
  project: Project | undefined;
}

/**
 * Create Project
 * Request
 */
export interface ProjectCreateRequest {
  startDate: string;
  expectedFinishedDate: string;
  responsible: string;
  address: Address | undefined;
  tasks: string[];
}

/** Response */
export interface ProjectCreateResponse {
  status: number;
  error: string[];
  data: ProjectResponseData | undefined;
}

/** FindAll Project */
export interface ProjectFindAllRequest {}

export interface ProjectFindAllResponse {
  status: number;
  error: string[];
  data: ProjectResponseData[];
}

export interface ProjectFindOneRequest {
  id: string;
}

export interface ProjectFindOneResponse {
  status: number;
  error: string[];
  data: ProjectResponseData | undefined;
}

/**
 * Update Project
 * Request
 */
export interface ProjectUpdateRequest {
  id: string;
  data: UpdateProjectData | undefined;
}

/** Response */
export interface ProjectUpdateResponse {
  status: number;
  error: string[];
  data: ProjectResponseData | undefined;
}

export interface UpdateProjectData {
  status?: Status | undefined;
  startDate?: string | undefined;
  expectedFinishedDate?: string | undefined;
  responsible?: string | undefined;
}

/**
 * Remove Project
 * Request
 */
export interface ProjectRemoveRequest {
  id: string;
}

/** Response */
export interface ProjectRemoveResponse {
  status: number;
  error: string[];
  data: RemoveData | undefined;
}

export interface RemoveData {}

/**
 * FindAllTaskOfProjectRequest
 * Request
 */
export interface FindAllTaskOfProjectRequest {
  id: string;
}

/** Response */
export interface FindAllTaskOfProjectResponse {
  status: number;
  error: string[];
  data: FindAllTaskOfProjectData[];
}

export interface FindAllTaskOfProjectData {
  category: string;
  activity: string;
  noiseLevel: LevelType;
  dirtLevel: LevelType;
  description: string;
  unity: UnityType;
  possibleSkills: PossibleSkills[];
}

/**
 * FieldsOverwriters
 * Request
 */
export interface FieldsOverridesRequest {
  projectId: string;
  taskId: string;
  data: FieldsOverrides | undefined;
}

/** Response */
export interface FieldsOverridesResponse {
  status: number;
  error: string[];
  data: FieldsOverrides | undefined;
}

export interface FieldsOverrides {
  category?: string | undefined;
  activity?: string | undefined;
  noiseLevel?: LevelType | undefined;
  dirtLevel?: LevelType | undefined;
  description?: string | undefined;
  unity?: UnityType | undefined;
}

export interface Project {
  id: string;
  startDate: number;
  expectedFinishedDate: number;
  responsible: string;
  address: Address | undefined;
  projectTask: ProjectTask[];
  status: Status;
}

export interface ProjectTask {
  task: string;
  laborers: string[];
  fieldsOverrides?: FieldsOverrides | undefined;
}

export interface Address {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Task {
  category: string;
  activity: string;
  noiseLevel: LevelType;
  dirtLevel: LevelType;
  description: string;
  unity: UnityType;
  possibleSkills: PossibleSkills[];
  laborers: string[];
}

export interface PossibleSkills {
  skillId: string;
  requiredSkillLevel: number;
}

/**
 * ActivateProject
 * Request
 */
export interface ActivateProjectRequest {
  projectId: string;
}

/** Response */
export interface ActivateProjectResponseData {}

export interface ActivateProjectResponse {
  status: number;
  error: string[];
  data: ActivateProjectResponse | undefined;
}

/**
 * DeactivateProject
 * Request
 */
export interface DeactivateProjectRequest {
  projectId: string;
}

/** Response */
export interface DeactivateProjectResponseData {}

export interface DeactivateProjectResponse {
  status: number;
  error: string[];
  data: DeactivateProjectResponse | undefined;
}

/**
 * AddTasksToProject
 * Request
 */
export interface AddTasksToProjectRequest {
  projectId: string;
  tasksIds: string[];
}

/** Response */
export interface AddTasksToProjectResponseData {}

export interface AddTasksToProjectResponse {
  status: number;
  error: string[];
  data: AddTasksToProjectResponse | undefined;
}

/**
 * TaskCreate
 * Request
 */
export interface TaskCreateRequest {
  category: string;
  activity: string;
  noiseLevel: LevelType;
  dirtLevel: LevelType;
  description: string;
  unity: UnityType;
  possibleSkills: PossibleSkills[];
}

/** Response */
export interface TaskCreateResponse {
  status: number;
  error: string[];
  data: TaskResponseData | undefined;
}

/**
 * TaskFindAllRequest
 * Request
 */
export interface TaskFindAllRequest {}

/** Response */
export interface TaskFindAllResponse {
  status: number;
  error: string[];
  data: TaskResponseData[];
}

/**
 * TaskFindOne
 * Request
 */
export interface TaskFindOneRequest {
  id: string;
}

/** Response */
export interface TaskFindOneResponse {
  status: number;
  error: string[];
  data: TaskResponseData | undefined;
}

/**
 * TaskUpdate
 * Request
 */
export interface TaskUpdateRequest {
  id: string;
  data: TaskUpdateData | undefined;
}

/** Response */
export interface TaskUpdateResponse {
  status: number;
  error: string[];
  data: TaskResponseData | undefined;
}

export interface TaskUpdateData {
  category?: string | undefined;
  activity?: string | undefined;
  noiseLevel?: string | undefined;
  dirtLevel?: string | undefined;
}

/**
 * TaskRemove
 * Request
 */
export interface TaskRemoveRequest {
  id: string;
}

/** Response */
export interface TaskRemoveResponse {
  status: number;
  error: string[];
  data: TaskRemoveDataResponse | undefined;
}

export interface TaskRemoveDataResponse {}

export interface TaskResponse {
  category: string;
  activity: string;
  noiseLevel: LevelType;
  dirtLevel: LevelType;
  description: string;
  unity: UnityType;
  possibleSkills: PossibleSkills[];
  status: Status;
}

export interface TaskResponseData {
  task: TaskResponse | undefined;
}

/**
 * ActivateTask
 * Request
 */
export interface ActivateTaskRequest {
  taskId: string;
}

/** Response */
export interface ActivateTaskResponseData {}

export interface ActivateTaskResponse {
  status: number;
  error: string[];
  data: ActivateTaskResponseData | undefined;
}

/**
 * DeactivateTask
 * Request
 */
export interface DeactivateTaskRequest {
  taskId: string;
}

/** Response */
export interface DeactivateTaskResponseData {}

export interface DeactivateTaskResponse {
  status: number;
  error: string[];
  data: DeactivateTaskResponseData | undefined;
}

export interface SkillRequest {
  id: string;
  requiredSkillLevel: number;
}

/** Request */
export interface AddSkillToTaskRequest {
  taskId: string;
  skills: SkillRequest[];
}

/** Response */
export interface AddSkillToTaskResponseData {}

export interface AddSkillToTaskResponse {
  status: number;
  error: string[];
  data: AddSkillToTaskResponseData | undefined;
}

export const PROJECT_PACKAGE_NAME = 'project';

export interface ProjectServiceClient {
  create(request: ProjectCreateRequest): Observable<ProjectCreateResponse>;

  findAll(request: ProjectFindAllRequest): Observable<ProjectFindAllResponse>;

  findOne(request: ProjectFindOneRequest): Observable<ProjectFindOneResponse>;

  update(request: ProjectUpdateRequest): Observable<ProjectUpdateResponse>;

  remove(request: ProjectRemoveRequest): Observable<ProjectRemoveResponse>;

  findAllTaskOfProject(request: FindAllTaskOfProjectRequest): Observable<FindAllTaskOfProjectResponse>;

  fieldsOverrides(request: FieldsOverridesRequest): Observable<FieldsOverridesResponse>;

  activateProject(request: ActivateProjectRequest): Observable<ActivateProjectResponse>;

  deactivateProject(request: DeactivateProjectRequest): Observable<DeactivateProjectResponse>;

  addTasksToProject(request: AddTasksToProjectRequest): Observable<AddTasksToProjectResponse>;
}

export interface ProjectServiceController {
  create(
    request: ProjectCreateRequest,
  ): Promise<ProjectCreateResponse> | Observable<ProjectCreateResponse> | ProjectCreateResponse;

  findAll(
    request: ProjectFindAllRequest,
  ): Promise<ProjectFindAllResponse> | Observable<ProjectFindAllResponse> | ProjectFindAllResponse;

  findOne(
    request: ProjectFindOneRequest,
  ): Promise<ProjectFindOneResponse> | Observable<ProjectFindOneResponse> | ProjectFindOneResponse;

  update(
    request: ProjectUpdateRequest,
  ): Promise<ProjectUpdateResponse> | Observable<ProjectUpdateResponse> | ProjectUpdateResponse;

  remove(
    request: ProjectRemoveRequest,
  ): Promise<ProjectRemoveResponse> | Observable<ProjectRemoveResponse> | ProjectRemoveResponse;

  findAllTaskOfProject(
    request: FindAllTaskOfProjectRequest,
  ): Promise<FindAllTaskOfProjectResponse> | Observable<FindAllTaskOfProjectResponse> | FindAllTaskOfProjectResponse;

  fieldsOverrides(
    request: FieldsOverridesRequest,
  ): Promise<FieldsOverridesResponse> | Observable<FieldsOverridesResponse> | FieldsOverridesResponse;

  activateProject(
    request: ActivateProjectRequest,
  ): Promise<ActivateProjectResponse> | Observable<ActivateProjectResponse> | ActivateProjectResponse;

  deactivateProject(
    request: DeactivateProjectRequest,
  ): Promise<DeactivateProjectResponse> | Observable<DeactivateProjectResponse> | DeactivateProjectResponse;

  addTasksToProject(
    request: AddTasksToProjectRequest,
  ): Promise<AddTasksToProjectResponse> | Observable<AddTasksToProjectResponse> | AddTasksToProjectResponse;
}

export function ProjectServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'findAll',
      'findOne',
      'update',
      'remove',
      'findAllTaskOfProject',
      'fieldsOverrides',
      'activateProject',
      'deactivateProject',
      'addTasksToProject',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ProjectService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ProjectService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PROJECT_SERVICE_NAME = 'ProjectService';

export interface TaskServiceClient {
  create(request: TaskCreateRequest): Observable<TaskCreateResponse>;

  findAll(request: TaskFindAllRequest): Observable<TaskFindAllResponse>;

  findOne(request: TaskFindOneRequest): Observable<TaskFindOneResponse>;

  update(request: TaskUpdateRequest): Observable<TaskUpdateResponse>;

  remove(request: TaskRemoveRequest): Observable<TaskRemoveResponse>;

  activateTask(request: ActivateTaskRequest): Observable<ActivateTaskResponse>;

  deactivateTask(request: DeactivateTaskRequest): Observable<DeactivateTaskResponse>;

  addSkillToTask(request: AddSkillToTaskRequest): Observable<AddSkillToTaskResponse>;
}

export interface TaskServiceController {
  create(request: TaskCreateRequest): Promise<TaskCreateResponse> | Observable<TaskCreateResponse> | TaskCreateResponse;

  findAll(
    request: TaskFindAllRequest,
  ): Promise<TaskFindAllResponse> | Observable<TaskFindAllResponse> | TaskFindAllResponse;

  findOne(
    request: TaskFindOneRequest,
  ): Promise<TaskFindOneResponse> | Observable<TaskFindOneResponse> | TaskFindOneResponse;

  update(request: TaskUpdateRequest): Promise<TaskUpdateResponse> | Observable<TaskUpdateResponse> | TaskUpdateResponse;

  remove(request: TaskRemoveRequest): Promise<TaskRemoveResponse> | Observable<TaskRemoveResponse> | TaskRemoveResponse;

  activateTask(
    request: ActivateTaskRequest,
  ): Promise<ActivateTaskResponse> | Observable<ActivateTaskResponse> | ActivateTaskResponse;

  deactivateTask(
    request: DeactivateTaskRequest,
  ): Promise<DeactivateTaskResponse> | Observable<DeactivateTaskResponse> | DeactivateTaskResponse;

  addSkillToTask(
    request: AddSkillToTaskRequest,
  ): Promise<AddSkillToTaskResponse> | Observable<AddSkillToTaskResponse> | AddSkillToTaskResponse;
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'create',
      'findAll',
      'findOne',
      'update',
      'remove',
      'activateTask',
      'deactivateTask',
      'addSkillToTask',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('TaskService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('TaskService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASK_SERVICE_NAME = 'TaskService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

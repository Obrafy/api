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
  startDate: number;
  expectedFinishedDate: number;
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
  data: Project[];
}

export interface ProjectFindOneRequest {
  projectId: string;
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
  projectId: string;
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
  startDate?: number | undefined;
  expectedFinishedDate?: number | undefined;
  responsible?: string | undefined;
}

/**
 * Remove Project
 * Request
 */
export interface ProjectRemoveRequest {
  projectId: string;
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
  projectId: string;
}

/** Response */
export interface FindAllTaskOfProjectResponse {
  status: number;
  error: string[];
  data: FindAllTaskOfProjectData[];
}

export interface FindAllTaskOfProjectData {
  task: string;
  laborers: string[];
  effort: number;
  durationInWorkDays: number;
  fieldsOverrides?: FieldsOverrides | undefined;
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
  data: FieldsOverridesTaskOfProjectData | undefined;
}

export interface FieldsOverridesTaskOfProjectData {
  task: string;
  laborers: string[];
  effort: number;
  durationInWorkDays: number;
  fieldsOverrides?: FieldsOverrides | undefined;
}

export interface FieldsOverrides {
  category?: string | undefined;
  activity?: string | undefined;
  noiseLevel?: LevelType | undefined;
  dirtLevel?: LevelType | undefined;
  description?: string | undefined;
  unity?: UnityType | undefined;
  priority?: number | undefined;
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
  effort: number;
  durationInWorkDays: number;
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
  id: string;
  status: string;
  priority: number;
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
export interface ProjectTaskRequestData {
  tasksIds: string;
  effort: number;
  durationInWorkDays: number;
}

export interface AddTasksToProjectRequest {
  projectId: string;
  tasks: ProjectTaskRequestData[];
}

/** Response */
export interface AddTasksToProjectResponseData {}

export interface AddTasksToProjectResponse {
  status: number;
  error: string[];
  data: AddTasksToProjectResponseData | undefined;
}

/**
 * RemoveTasksToProject
 * RemoveTasksToProjectRequest
 */
export interface RemoveTasksToProjectRequest {
  projectId: string;
  tasksIds: string[];
}

/** RemoveTasksToProjectResponse */
export interface RemoveTasksToProjectResponseData {}

export interface RemoveTasksToProjectResponse {
  status: number;
  error: string[];
  data: RemoveTasksToProjectResponseData | undefined;
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
  priority: number;
}

/** Response */
export interface TaskCreateResponse {
  status: number;
  error: string[];
  data: Task | undefined;
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
  data: Task[];
}

/**
 * TaskFindOne
 * Request
 */
export interface TaskFindOneRequest {
  taskId: string;
}

/** Response */
export interface TaskFindOneResponse {
  status: number;
  error: string[];
  data: Task | undefined;
}

/**
 * TaskUpdate
 * Request
 */
export interface TaskUpdateRequest {
  taskId: string;
  data: TaskUpdateData | undefined;
}

/** Response */
export interface TaskUpdateResponse {
  status: number;
  error: string[];
  data: Task | undefined;
}

export interface TaskUpdateData {
  category?: string | undefined;
  activity?: string | undefined;
  noiseLevel?: string | undefined;
  dirtLevel?: string | undefined;
  priority?: number | undefined;
}

/**
 * TaskRemove
 * Request
 */
export interface TaskRemoveRequest {
  taskId: string;
}

export interface TaskRemoveDataResponse {}

/** Response */
export interface TaskRemoveResponse {
  status: number;
  error: string[];
  data: TaskRemoveDataResponse | undefined;
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

/**
 * AddSkillToTask
 * AddSkillToTaskRequest
 */
export interface AddSkillToTaskRequest {
  taskId: string;
  skills: SkillRequest[];
}

/** AddSkillToTaskResponse */
export interface AddSkillToTaskResponseData {}

export interface AddSkillToTaskResponse {
  status: number;
  error: string[];
  data: AddSkillToTaskResponseData | undefined;
}

/**
 * RemoveSkillToTask
 * RemoveSkillToTaskRequest
 */
export interface RemoveSkillToTaskRequest {
  taskId: string;
  skillIds: string[];
}

/** RemoveSkillToTaskResponse */
export interface RemoveSkillToTaskResponseData {}

export interface RemoveSkillToTaskResponse {
  status: number;
  error: string[];
  data: RemoveSkillToTaskResponseData | undefined;
}

/**
 * AddLaborersToProject
 * AddLaborersToProjectRequest
 */
export interface AddLaborersToProjectRequest {
  projectId: string;
  taskId: string;
  laborers: string[];
}

export interface AddLaborersToProjectResponseData {}

/** AddLaborersToProjectResponse */
export interface AddLaborersToProjectResponse {
  status: number;
  error: string[];
  data: AddLaborersToProjectResponseData | undefined;
}

/**
 * RemoveLaborersToProject
 * RemoveLaborersToProjectRequest
 */
export interface RemoveLaborersToProjectRequest {
  projectId: string;
  taskId: string;
  laborers: string[];
}

/** RemoveLaborersToProjectResponse */
export interface RemoveLaborersToProjectResponseData {}

export interface RemoveLaborersToProjectResponse {
  status: number;
  error: string[];
  data: RemoveLaborersToProjectResponseData | undefined;
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

  removeTasksToProject(request: RemoveTasksToProjectRequest): Observable<RemoveTasksToProjectResponse>;

  addLaborersToProject(request: AddLaborersToProjectRequest): Observable<AddLaborersToProjectResponse>;

  removeLaborersToProject(request: RemoveLaborersToProjectRequest): Observable<RemoveLaborersToProjectResponse>;
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

  removeTasksToProject(
    request: RemoveTasksToProjectRequest,
  ): Promise<RemoveTasksToProjectResponse> | Observable<RemoveTasksToProjectResponse> | RemoveTasksToProjectResponse;

  addLaborersToProject(
    request: AddLaborersToProjectRequest,
  ): Promise<AddLaborersToProjectResponse> | Observable<AddLaborersToProjectResponse> | AddLaborersToProjectResponse;

  removeLaborersToProject(
    request: RemoveLaborersToProjectRequest,
  ):
    | Promise<RemoveLaborersToProjectResponse>
    | Observable<RemoveLaborersToProjectResponse>
    | RemoveLaborersToProjectResponse;
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
      'removeTasksToProject',
      'addLaborersToProject',
      'removeLaborersToProject',
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

  removeSkillToTask(request: RemoveSkillToTaskRequest): Observable<RemoveSkillToTaskResponse>;
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

  removeSkillToTask(
    request: RemoveSkillToTaskRequest,
  ): Promise<RemoveSkillToTaskResponse> | Observable<RemoveSkillToTaskResponse> | RemoveSkillToTaskResponse;
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
      'removeSkillToTask',
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

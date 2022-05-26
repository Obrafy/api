/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'project';

/** All Enums */
export enum Status {
  ACTIVE = 0,
  INACTIVE = 1,
  IN_PROGRESS = 2,
  FINISHED = 3,
  DELETED = 4,
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
  tasks: Task[];
  status: Status;
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
  error: string;
  data: TaskData | undefined;
}

/**
 * TaskFindAllRequest
 * Request
 */
export interface TaskFindAllRequest {}

/** Response */
export interface TaskFindAllResponse {
  status: number;
  error: string;
  data: TaskData[];
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
  error: string;
  data: TaskData | undefined;
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
  error: string;
  data: TaskData | undefined;
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
  error: string;
  data: TaskRemoveDataResponse | undefined;
}

export interface TaskRemoveDataResponse {}

export interface TaskData {
  category: string;
  activity: string;
  noiseLevel: string;
  dirtLevel: string;
  possibleSkills: PossibleSkills[];
  id: string;
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
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['create', 'findAll', 'findOne', 'update', 'remove'];
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

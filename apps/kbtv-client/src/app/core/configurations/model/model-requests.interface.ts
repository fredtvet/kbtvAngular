import { ApiUrl } from "@core/api-url.enum";
import { User } from "@core/models";
import { TimesheetStatus } from "@shared-app/enums/timesheet-status.enum";
import { FormDataEntry, OptimisticHttpRequest } from "optimistic-http";

export interface AppOptimisticHttpRequest extends OptimisticHttpRequest {
    headers: {commandId: string};
}
export interface CreateModelRequest<TModel> extends AppOptimisticHttpRequest {
    apiUrl: string;
    method: "POST";
    body: Partial<TModel>;
}

export interface UpdateModelRequest<TModel> extends AppOptimisticHttpRequest {
    apiUrl: string;
    method: "PUT";
    body: Partial<TModel>;
}

export interface DeleteModelRequest extends AppOptimisticHttpRequest {
    apiUrl: string;
    method: "DELETE";
    body?: undefined;
}

export interface DeleteModelRangeRequest extends AppOptimisticHttpRequest {
    apiUrl: string;
    method: "POST";
    body: {ids: string[]};
}

export interface CreateModelFileRequest extends Pick<AppOptimisticHttpRequest, "body">, Omit<CreateModelRequest<unknown>, "body"> {
    body: FormDataEntry[];
}

export interface UpdateModelFileRequest extends Pick<AppOptimisticHttpRequest, "body">, Omit<UpdateModelRequest<unknown>, "body"> {
    body: FormDataEntry[];
}

export interface UpdateCurrentUserRequest extends AppOptimisticHttpRequest {
    apiUrl: ApiUrl.Auth,
    method: "PUT",
    body: Partial<User>,
}

export interface UpdateTimesheetStatusesRequest extends AppOptimisticHttpRequest {
    apiUrl: `${ApiUrl.Timesheet}/Status`,
    method: "PUT", 
    body: {ids: string[], status: TimesheetStatus},
}

export interface CreateUserRequest extends Pick<AppOptimisticHttpRequest, "body">, Omit<CreateModelRequest<unknown>, "body"> {
    body: Partial<User> & {password: string}
}

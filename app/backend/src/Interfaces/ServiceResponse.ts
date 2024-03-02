export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
'INVALID_DATA'
| 'UNAUTHORIZED'
| 'NOT_FOUND'
| 'BAD_REQUEST'
| 'CONFLICT'
| 'UNPROCESSABLE_ENTITY'
| 'ERROR'
| 'INVALID';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T | string | ServiceMessage
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;

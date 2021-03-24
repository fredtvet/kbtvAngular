import { HttpErrorResponse } from "@angular/common/http";

function _convertErrorObject(errors: { [key: string]: string[] }): string[]{
    let result: string[] = [];
    for(var key in errors){
      result = result.concat(errors[key]);
    }
    return result;
}

export interface FormattedHttpError { title: string, details?: string[] }

export interface AppErrorResponse {
    status: number;
    title: string;
    type: string;
  
    detail?: string;
    errors?: { [key: string]: string[] };
  }

export function _httpErrorResponseFormatter(err: HttpErrorResponse): FormattedHttpError {
    if(err.status === 504) 
        return {title: 'Får ikke konkakt med serveren. Vennligst prøv igjen.'};

    var error = err.error as AppErrorResponse;

    if(error)
        return {
            title: error.detail || error.title || "En ukjent feil oppsto! Vennligst prøv igjen.",
            details: error.errors ? _convertErrorObject(error.errors) : undefined,
        }
    
    return {title: "En ukjent feil oppsto! Vennligst prøv igjen."};
}

import { InjectionToken } from '@angular/core'

export interface ValidationErrorMap {
    [key: string]: (err: any) => string 
}

export const VALIDATION_ERROR_MESSAGES = new InjectionToken<string>('ValidationErrorMessages');
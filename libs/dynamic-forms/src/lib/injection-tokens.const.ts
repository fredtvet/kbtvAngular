import { InjectionToken } from '@angular/core'
import { ValidationErrorMap } from './interfaces';

export const VALIDATION_ERROR_MESSAGES = new InjectionToken<ValidationErrorMap>('ValidationErrorMessages');
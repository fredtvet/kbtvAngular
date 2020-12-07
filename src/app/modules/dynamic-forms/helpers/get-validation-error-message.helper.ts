import { ValidationErrorMap } from '../validation-error-map.interface';

export function _getValidationErrorMessage(errors: {[key: string]: any}, messages: ValidationErrorMap): string{
    if(!errors) return;
    for(const error of Object.keys(errors)){
      const errFn = messages[error];
      let msg = errFn ? errFn(errors[error]) : null;
      if(msg) return msg;
    }
}
import { ValidationErrorMap } from '@dynamic-forms/validation-error-map.interface';

export const ValidationErrorMessages: ValidationErrorMap = {
    required: () => "Dette feltet er obligatorisk.",
    maxlength: (err: {requiredLength: number}) => `Dette feltet kan ikke overstige ${err.requiredLength} tegn.`,
    minlength: (err: {requiredLength: number}) => `Dette feltet må være på minst ${err.requiredLength} tegn.`,
    fileextension: () => "Filtypen er ikke tillatt.",
    isunique: () => "Dette feltet må være unikt og verdien finnes allerede.",
    isobject: () => "Ugyldig verdi.",
    daterange: () => "Det mangler en eller flere datoer.",
    email: () => "Eposten er ikke skrevet riktig.",
    issamepasswords: () => "Passordene er ikke like."
}
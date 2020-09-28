export function _validateFileExtension(file: File, allowedExtensions: string[]): boolean{
    return allowedExtensions.includes(file.name?.split('.').pop());
}

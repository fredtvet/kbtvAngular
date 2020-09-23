export function validateFileExtension(file: File, allowedExtensions: string[]): boolean{
    return allowedExtensions.includes(file.name?.split('.').pop());
}

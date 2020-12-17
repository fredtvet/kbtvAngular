export function _validateFileExtension(file: File, allowedExtensions: string[]): boolean  {
    return file.name != null && allowedExtensions.includes(<string> file.name.split('.').pop());
}

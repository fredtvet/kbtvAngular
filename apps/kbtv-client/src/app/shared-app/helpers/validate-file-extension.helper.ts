export function _validateFileExtension(file: File, allowedExtensions: string[]): boolean  {
    return file.name != null && allowedExtensions.indexOf(<string> file.name.split('.').pop()?.toLowerCase()) !== -1;
}

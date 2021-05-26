export function _isBlobUrl(fileName: string): boolean { 
    return fileName.substr(0,4) === "blob";
};
import { ModelFile } from "@core/models";
import { FileFolders } from "@shared/constants/file-folders.const";

export interface ImageViewerDialogWrapperConfig {
    images?: ModelFile[], 
    currentImage: ModelFile,
    fileFolder: typeof FileFolders[number],
    deleteAction?: {callback :(id: string) => void, allowedRoles?: string[]};
}
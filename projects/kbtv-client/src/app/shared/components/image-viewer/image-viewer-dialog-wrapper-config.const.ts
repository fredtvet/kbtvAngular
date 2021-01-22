import { ModelFile } from "@core/models";

export interface ImageViewerDialogWrapperConfig {
    images?: ModelFile[], 
    currentImage: ModelFile,
    deleteAction?: {callback :(id: string) => void, allowedRoles?: string[]};
}
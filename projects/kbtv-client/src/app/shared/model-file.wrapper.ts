import { Immutable } from 'global-types';

export class ModelFileWrapper{

    modifiedFile: File;
    id: unknown;

    constructor(inputFile: Immutable<File>, id: unknown){
        if(!inputFile || !id) console.error( "File and Id are required");
        this.id = id;
        var type = inputFile.type;
        var extension = this.getExtension(inputFile.name);
        this.modifiedFile = new File([inputFile], `${id}.${extension.toLowerCase()}`, {type});
    }

    private getExtension(fileName: string): string{
        return fileName.split('.').pop() || fileName;
    }

}
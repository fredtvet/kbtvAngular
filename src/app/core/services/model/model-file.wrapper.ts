export class ModelFileWrapper{

    modifiedFile: File;
    id: string;

    constructor(inputFile: File, id: string){
        if(!inputFile || !id) console.error( "File and Id are required");
        this.id = id;
        var type = inputFile.type;
        var extension = this.getExtension(inputFile.name);
        this.modifiedFile = new File([inputFile], `${id}.${extension}`, {type});
    }

    private getExtension(fileName: string): string{
        return fileName.split('.').pop() || fileName;
    }

}
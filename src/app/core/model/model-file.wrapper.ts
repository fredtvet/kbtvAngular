export class ModelFileWrapper{

    modifiedFile: File;
    id: string;

    constructor(inputFile: File, id: string){
        if(!inputFile || !id) throw "File and Id are required";
        this.id = id;
        var type = inputFile.type;
        var extension = this.getExtension(inputFile.name);
        this.modifiedFile = new File([inputFile], `${id}.${extension}`, {type});
    }

    private getExtension(fileName: string){
        fileName.substring(fileName.lastIndexOf('.')+1, fileName.length) || fileName;
    }


}
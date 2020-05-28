import { Pipe, PipeTransform } from '@angular/core';
import { Icons } from '../enums';

@Pipe({
  name: 'fileiconFromFiletype'
})
export class FileiconFromFiletypePipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'csv':
        return Icons.Csv;
      case 'pdf': 
        return Icons.Pdf;
      case 'jpg': case 'png': 
        return Icons.ImageFile;
      case 'doc': case 'docm': case 'docx': case 'dot': case 'dotm': case 'dotx':
        return Icons.Word;
      case 'xla': case 'xlam': case 'xls': case 'xlsb': case 'xlsm': case 'xlsx': case 'xlt': case 'xlw':
          return Icons.Excel;
      default: return Icons.DefaultFile;
    }
  }

}

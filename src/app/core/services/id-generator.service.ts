import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class IdGeneratorService {

  constructor() {}

  generate():  string{
    var id = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
 }
 

}

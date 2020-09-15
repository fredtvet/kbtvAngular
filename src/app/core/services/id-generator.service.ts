import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class IdGeneratorService {

  private characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  private charLength = this.characters.length;

  constructor() {}

  generate(length: number = 7):  string{
    var id = '';
    for ( var i = 0; i < length; i++ ) {
        id += this.characters.charAt(Math.floor(Math.random() * this.charLength));
    }
    return id;
 }
 

}

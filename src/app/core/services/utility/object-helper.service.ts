import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ObjectHelperService {

    constructor(){}

    hasSameObjectProps(obj1: Object, obj2: Object): boolean{
        let objProps1 = Object.keys(obj1 || {});
    
        if(objProps1.length !== Object.keys(obj2 || {}).length) return false;
    
        for(const prop of objProps1){
          if(!obj2.hasOwnProperty(prop)) return false   
        }
    
        return true;
    }

}
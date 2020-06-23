import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  add(key:string, data: any){
    if(!data || data === null) return undefined;
    window.localStorage.setItem(key, JSON.stringify(data))
  }

  get(key:string): any{
    let item = window.localStorage.getItem(key);
    if(!item || item === null) return item;
    return JSON.parse(item);
  }

  getNoParse(key: string): string{
    return window.localStorage.getItem(key);
  }

}

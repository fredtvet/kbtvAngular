import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, tap, timeInterval } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  private downloadableUrlSubject = new Subject<string>();
  downloadableUrl$ = this.downloadableUrlSubject.asObservable().pipe(tap(console.log))

  constructor() { }

  downloadUrl = (url: string): void => this.downloadableUrlSubject.next(url);

  downloadUrls = (urls: string[]): void => {
    let delay = 0;
    urls.forEach(url => {
      setTimeout(() => this.downloadUrl(url), delay);
      delay = delay + 50;
    })
  }
  
}

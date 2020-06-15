import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  private link: HTMLAnchorElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const body = this.document.getElementsByTagName('body')[0];
    this.link = this.document.createElement('a'); 
    this.link.style.display = 'none';
    body.appendChild(this.link);
  }

  downloadUrl = (url: string): void => {
    this.link.href = url;
    this.link.click();
  };
 
  downloadUrls = (urls: string[]): void => {
    let delay = 0;
    urls.forEach(url => {
      setTimeout(() => this.downloadUrl(url), delay);
      delay = delay + 200;
    })
  }
}
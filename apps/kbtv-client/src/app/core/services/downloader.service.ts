import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Maybe } from 'global-types';

@Injectable({ providedIn: 'root' })
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
    this.link.download = url.substring(url.lastIndexOf('/') + 1) || 'download';
    this.link.click();
  };
 
  downloadUrls = (urls: Maybe<string>[]): void => {
    let delay = 0;
    urls.forEach(url => {
      setTimeout(() => url ? this.downloadUrl(url) : null, delay);
      delay = delay + 1000;
    })
  }
}
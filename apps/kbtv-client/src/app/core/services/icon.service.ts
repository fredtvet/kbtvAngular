import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Icons } from '@shared-app/enums/icons.enum';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  private hasLoaded: boolean = false;

  public registerIcons(): void {
    if(this.hasLoaded) return;
    this.hasLoaded = true;
    var url = '..' + environment.baseUrl + '/assets/svg/icons';
    this.loadIcons(Object.values(Icons), url);
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach((key) => {
      this.matIconRegistry.addSvgIcon(
        key,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${iconUrl}/${key}.svg`
        )
      );
    });
  }
}

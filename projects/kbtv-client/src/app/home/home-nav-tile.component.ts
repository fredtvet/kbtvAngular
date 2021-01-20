import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-nav-tile',
  template: `
    <style>.home-tile{ text-align:center; width:100% }</style>
    <span class="home-tile mat-elevation-z1 foreground-card p-5"  
        fxLayout="column" fxLayoutAlign="center center" matRipple>
        <mat-icon class="scale-150 mb-2">{{ icon }}</mat-icon>
        <span>{{ text }}</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNavTileComponent{
    @Input() text: string;
    @Input() icon: string;
}

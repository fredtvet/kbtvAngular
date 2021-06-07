import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { ContinousSyncService } from 'state-sync';
import { AppDialogService } from './app-dialog.service';

const WindowCloseEvent = 'WINDOW_CLOSE';

@Component({
  template: `
    <span class="mat-body-2">Dette vinduet er blitt deaktivert.</span>
    <p>Kun ett vindu kan være aktivt om gangen.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class WindowClosedDialogComponent {}

@Injectable({ providedIn: 'root' })
export class SingleWindowGuardService {

  constructor(
      private continousSyncService: ContinousSyncService,
      private dialogService: AppDialogService
    ) {
    const bc = new BroadcastChannel('single-window-guard');
    bc.postMessage(WindowCloseEvent);
    bc.onmessage = (ev) =>
      ev.data === WindowCloseEvent ? this.closeWindow() : null;
  }

  private closeWindow(): void {
    this.continousSyncService.stop();
    this.dialogService.dialog$.subscribe(dialog => dialog.open(WindowClosedDialogComponent, { disableClose: true }))
  }

}

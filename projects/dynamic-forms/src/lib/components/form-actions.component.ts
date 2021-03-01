import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { merge } from 'rxjs';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'lib-form-actions',
  template: `
    <div fxLayout="row" fxLayoutAlign="end start" style="margin: 12px 0 16px 0" *ngIf="vm$ | async; let vm">
      <button
        mat-button
        *ngIf="showReset; else cancelButton"
        [disabled]="resetDisabled"
        color="warn"
        (tap)="reset.emit()"
      >
        Nullstill
      </button>
      <ng-template #cancelButton>
        <button mat-button fxFlex="35" color="warn" (tap)="canceled.emit()">
          Avbryt
        </button>
      </ng-template>
      <button 
        mat-raised-button
        fxFlex="40"
        color="accent"
        [disabled]="!vm.isOnline || submitDisabled"
        (tap)="onSubmit()"
      >
        {{ !vm.isOnline ? 'Ikke på nett' : submitText }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormActionsComponent {
  @Input('onlineRequired')
  set onlineRequired(value: boolean) {
    this.onlineRequiredSubject.next(value);
  }

  @Input() submitDisabled: boolean;
  @Input() submitText: boolean;

  @Input() showReset?: boolean;
  @Input() resetDisabled?: boolean;

  @Output() reset = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() submitted = new EventEmitter();

  private onlineRequiredSubject = new BehaviorSubject<boolean>(false);

  private _isOnline$: Observable<boolean> = merge(
    fromEvent(window, 'offline'),
    fromEvent(window, 'online'),
    of(null)
  ).pipe(map((x) => navigator.onLine));

  vm$: Observable<{isOnline: boolean}> = this.onlineRequiredSubject
    .asObservable()
    .pipe(
      switchMap((x) => (x ? this._isOnline$ : of(true))),
      map(isOnline => { return { isOnline }})
    );

  constructor() {}

  onSubmit = () => (!this.submitDisabled ? this.submitted.emit() : null);
}

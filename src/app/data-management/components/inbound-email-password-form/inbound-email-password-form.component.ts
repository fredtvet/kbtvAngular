import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { InboundEmailPasswordService } from 'src/app/core/services';
import { InboundEmailPassword } from 'src/app/core/models';

@Component({
  selector: 'app-inbound-email-password-form',  
  template: `
  <app-inbound-email-password-form-view
    (formSubmitted)="onSubmit($event)">
  </app-inbound-email-password-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboundEmailPasswordFormComponent {

  @Output() finished = new EventEmitter();

  constructor(private inboundEmailPasswordService: InboundEmailPasswordService) { }

  onSubmit = (password: InboundEmailPassword) => {
    if(!password) this.finished.emit();
    else this.inboundEmailPasswordService.add$(password).subscribe(x => this.finished.emit(x));
  }

}

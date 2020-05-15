import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SimpleNavConfig } from '../../interfaces/simple-nav-config.interface';

@Component({
  selector: 'app-simple-top-nav',
  templateUrl: './simple-top-nav.component.html',
  styleUrls: ['./simple-top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTopNavComponent implements OnInit {

  @Input() config: SimpleNavConfig;

  constructor() { }

  ngOnInit() {
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertMenuComponent } from './vert-menu.component';

describe('VertMenuComponent', () => {
  let component: VertMenuComponent;
  let fixture: ComponentFixture<VertMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

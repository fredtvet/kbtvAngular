import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedNavComponent } from './nested-nav.component';

describe('NestedNavComponent', () => {
  let component: NestedNavComponent;
  let fixture: ComponentFixture<NestedNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

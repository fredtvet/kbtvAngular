import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionNoteDetailsComponent } from './mission-note-details.component';

describe('MissionNoteDetailsComponent', () => {
  let component: MissionNoteDetailsComponent;
  let fixture: ComponentFixture<MissionNoteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionNoteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionNoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

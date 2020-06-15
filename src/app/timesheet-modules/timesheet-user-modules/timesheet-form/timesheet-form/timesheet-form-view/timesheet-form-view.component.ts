import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { Mission, Timesheet } from "src/app/core/models";
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-form-view',
  templateUrl: './timesheet-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetFormViewComponent implements OnInit {

  @Input() missions: Mission[]
  @Input() timesheet: Timesheet;

  @Input() datePreset: Date;
  @Input() missionPreset: Mission;

  @Output() formSubmitted = new EventEmitter();
  @Output() missionsSearch = new EventEmitter();

  timesheetForm: FormGroup;
  isCreateForm = false;

  initTime: Date = new Date();

  constructor(private _formBuilder: FormBuilder) {this.initTime.setHours(6,0,0,0);}

  ngOnInit(){
    if(!this.timesheet || this.timesheet == null)this.isCreateForm = true;
    else this.timesheet.mission = this.missions.find(x => x.id == this.timesheet.missionId);

    this.initalizeForm(this.timesheet);
    this.initMissionListener();
  }

  onSubmit = () => {
    if(this.timesheetForm.valid && this.timesheetForm.dirty) 
      this.formSubmitted.emit(this.convertFormToTimesheet(this.timesheetForm.getRawValue()));
  }
  
  displayMissionAddress(mission: Mission): string {
    if(mission == undefined) return null;
    return mission.address;
  }

  private initalizeForm(x: Timesheet){
    this.timesheetForm = this._formBuilder.group({
      id: x ? x.id : null,
      mission: [{value: this.missionPreset || (x ? x.mission : null), disabled: this.missionPreset}, [
        Validators.required,
        this.isMissionValidator()
      ]],
      date: [{value: this.datePreset || (this.isCreateForm ? null : new Date(x.startTime)), disabled: this.datePreset}, [
        Validators.required
      ]],
      timeRange: [this.isCreateForm ? [] : [new Date(x.startTime), new Date(x.endTime)], [
        Validators.required,
        this.timeRangeValidator()
      ]],
      comment: [x ? x.comment : null, [
        Validators.required,
        Validators.maxLength(400)
      ]],
    });
  }

  private initMissionListener(){
    this.mission.valueChanges.pipe(
      filter(x => typeof x == 'string'),
      debounceTime(400)
    ).subscribe(x => this.missionsSearch.emit(x))
  }

  private timeRangeValidator(): ValidatorFn{ //Check that all elements in array exist
    return (control: AbstractControl): {[key: string]: any} | null => {
      const invalid = !control.value[0] || !control.value[1];
      return invalid ? {'timeRangeInvalid': {value: control.value}} : null;
    };
  }
  private isMissionValidator(): ValidatorFn{ //Check that all elements in array exist
    return (control: AbstractControl): {[key: string]: any} | null => {
      const invalid = !(control.value instanceof Object); 
      return invalid ? {'missionInvalid': {value: control.value}} : null;
    };
  }

  private convertFormToTimesheet(formData:any){
    let date = formData.date.toDateString();
    return {
      id: formData.id,
      missionId: formData.mission.id,
      comment: formData.comment,
      startTime: new Date(date + " " + formData.timeRange[0].toTimeString()),
      endTime: new Date(date + " " + formData.timeRange[1].toTimeString()),
    } as Timesheet;   
  }

  get mission(){
    return this.timesheetForm.get('mission')
  }

  get date(){
    return this.timesheetForm.get('date')
  }

  get timeRange(){
    return this.timesheetForm.get('timeRange')
  }

  get comment(){
    return this.timesheetForm.get('comment')
  }


}

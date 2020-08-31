import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Employer, MissionType, Mission } from 'src/app/core/models';
import { MissionFilterCriteria } from '../../../../shared/interfaces/mission-filter-criteria.interface';
import { MissionFilterConfig } from '../../interfaces/mission-filter-config.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-mission-filter-view',
  templateUrl: './mission-filter-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterViewComponent {

  @Input() config: MissionFilterConfig;
  @Input() criteria: MissionFilterCriteria;

  @Output() formSubmitted = new EventEmitter<MissionFilterCriteria>();
  @Output() searchUpdated = new EventEmitter();

  filterForm: FormGroup;
  
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.config)
    this.initalizeForm(this.criteria);
    this.initMissionListener();
  }
  
  onSubmit = () => {
    const {valid, value} = this.filterForm;
    if(valid) this.formSubmitted.emit(value);
  }

  reset = () => {
    this.filterForm.reset({finished: false});
    this.filterForm.markAsDirty()
  }

  private initalizeForm(x: MissionFilterCriteria){
    console.log(x);
    this.filterForm = this._formBuilder.group({
      searchString: [x?.searchString],     
      employerId: [x?.employerId],
      missionTypeId: [x?.missionTypeId],    
      finished: [x?.finished || false],
    });
  }

  private initMissionListener(){
    this.searchString.valueChanges.pipe(
      filter(x => typeof x == 'string' || !isNaN(x)),
      debounceTime(400)
    ).subscribe(x => this.searchUpdated.emit(x))
  }

  get searchString(){
    return this.filterForm.get('searchString')
  }
  get employerId(){
    return this.filterForm.get('employerId')
  }  
  get missionTypeId(){
    return this.filterForm.get('missionTypeId')
  }  
  get finished(){
    return this.filterForm.get('finished')
  }
}

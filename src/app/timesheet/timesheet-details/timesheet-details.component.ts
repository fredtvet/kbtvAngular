import { Component, OnInit } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheet-details',
  templateUrl: './timesheet-details.component.html',
  styleUrls: ['./timesheet-details.component.scss']
})
export class TimesheetDetailsComponent implements OnInit {

  mainCfg = new MainNavConfig();
  date: moment.Moment;

  endTime: string;
  startTime: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.mainCfg.menuBtnEnabled = false;

  }

  ngOnInit() {
    this.setDateWithRoute();
    this.mainCfg.title = this.date.format('Do MMMM YYYY')
  }

  setDateWithRoute(){
    this.date = moment()
      .day(+this.route.snapshot.params['weekDay'])
      .year(+this.route.snapshot.params['year'])
      .week(+this.route.snapshot.params['weekNr'])
  }

  onBack(){
    this.router.navigate(['timeliste']);
  }


}

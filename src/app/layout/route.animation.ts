import {
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { slideAnimation } from './slide.animation';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';

const slideBackwardParams = {enterX: 'translateX(-100%)',leaveX: 'translateX(100%)'};
const slideForwardParams = {enterX: 'translateX(100%)',leaveX: 'translateX(-100%)'}

export const routeAnimation = trigger(`routeAnimation`, [
  transition(`void <=> ${AppPages.Home}`, useAnimation(slideAnimation, 
    {params: slideForwardParams})),
  //  transition(`Home => *`, useAnimation(slideAnimation,
  //    {params: slideForwardParams})),
  transition(`* => ${AppPages.Home}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition(`${AppPages.Home} => ${AppPages.MissionList}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),   
  transition(`${AppPages.Home} => ${AppPages.MissionDetails}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.Home} => ${AppPages.TimesheetWeekView}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.Home} => ${AppPages.TimesheetAdminUserList}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition(`${AppPages.Home} => ${AppPages.Profile}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),   
  transition(`${AppPages.Profile} => ${AppPages.Home}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition(`* => ${AppPages.Profile}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),
  transition(`${AppPages.Profile} => *`, useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition(`* => ${AppPages.Settings}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),
  transition(`${AppPages.Settings} => *`, useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition(`* => ${AppPages.Users}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.Users} => *`, useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition(`${AppPages.MissionList} => ${AppPages.MissionDetails}`, useAnimation(slideAnimation, 
    {params: slideForwardParams})),
  transition(`${AppPages.MissionDetails} => ${AppPages.MissionList}`, useAnimation(slideAnimation, 
    {params: slideBackwardParams})),

  transition(`${AppPages.MissionDetails} => ${AppPages.MissionImages}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.MissionImages} => ${AppPages.MissionDetails}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition(`${AppPages.MissionDetails} => ${AppPages.MissionDocuments}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.MissionDocuments} => ${AppPages.MissionDetails}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition(`${AppPages.MissionDetails} => ${AppPages.MissionNotes}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.MissionNotes} => ${AppPages.MissionDetails}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition(`${AppPages.MissionDetails} => ${AppPages.TimesheetList}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.TimesheetList} => ${AppPages.MissionDetails}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition(`${AppPages.TimesheetWeekView} => ${AppPages.MissionList}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),
  transition(`${AppPages.MissionList} => ${AppPages.TimesheetWeekView}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  
  transition(`${AppPages.TimesheetWeekView} => ${AppPages.TimesheetWeekList}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),
  transition(`${AppPages.TimesheetWeekList} => ${AppPages.TimesheetWeekView}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition(`${AppPages.TimesheetWeekView} => ${AppPages.TimesheetList}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.TimesheetList} => ${AppPages.TimesheetWeekView}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition(`${AppPages.TimesheetAdminUserList} => ${AppPages.TimesheetAdminWeekList}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.TimesheetAdminWeekList} => ${AppPages.TimesheetAdminUserList}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),
    
  transition(`${AppPages.TimesheetAdminWeekList} => ${AppPages.TimesheetAdminList}`, useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition(`${AppPages.TimesheetAdminList} => ${AppPages.TimesheetAdminWeekList}`, useAnimation(slideAnimation,
    {params: slideBackwardParams})),
  // transition(`TimesheetAdminUserList => TimesheetAdminList`, useAnimation(slideAnimation,
  //   {params: slideForwardParams})),
]);

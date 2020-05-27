import {
  transition,
  trigger,
  useAnimation,
} from "@angular/animations";
import { slideAnimation } from './slide.animation';

const slideBackwardParams = {enterX: 'translateX(-100%)',leaveX: 'translateX(100%)'};
const slideForwardParams = {enterX: 'translateX(100%)',leaveX: 'translateX(-100%)'}

export const routeAnimation = trigger("routeAnimation", [
  transition("void <=> Home", useAnimation(slideAnimation, 
    {params: slideForwardParams})),
  //  transition("Home => *", useAnimation(slideAnimation,
  //    {params: slideForwardParams})),
  transition("* => Home", useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition("* => Users", useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition("Home => TimesheetAdminUserList", useAnimation(slideAnimation,
    {params: slideForwardParams})),  

  transition("MissionDetails => MissionImages", useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition("MissionList => TimesheetWeekView", useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition("TimesheetWeekView => MissionList", useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  transition("TimesheetWeekView => TimesheetWeekList", useAnimation(slideAnimation,
    {params: slideBackwardParams})),
  transition("TimesheetWeekList => TimesheetWeekView", useAnimation(slideAnimation,
    {params: slideForwardParams})),

  transition("TimesheetWeekView => TimesheetList", useAnimation(slideAnimation,
    {params: slideForwardParams})),
  transition("TimesheetList => TimesheetWeekView", useAnimation(slideAnimation,
    {params: slideBackwardParams})),


  transition("TimesheetAdminList => TimesheetAdminUserList", useAnimation(slideAnimation,
    {params: slideBackwardParams})),

  // transition("TimesheetAdminUserList => TimesheetAdminList", useAnimation(slideAnimation,
  //   {params: slideForwardParams})),
]);

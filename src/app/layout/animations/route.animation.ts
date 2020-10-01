import {
    transition,
    trigger,
    useAnimation
} from '@angular/animations';
import { slideAnimation } from './slide.animation';

const slideBackwardParams = {enterX: 'translateX(-100%)',leaveX: 'translateX(100%)'};
const slideForwardParams = {enterX: 'translateX(100%)',leaveX: 'translateX(-100%)'}

export const routeAnimation = trigger(`routeAnimation`, [
  transition(`void => *`, useAnimation(slideAnimation, 
    {params: slideForwardParams})),

  transition(`0 => 1`, useAnimation(slideAnimation, 
    {params: slideForwardParams})),
  transition(`1 => 0`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})),

  transition(`0 => 2`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`2 => 0`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})),

  transition(`0 => 3`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`3 => 0`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})),

  transition(`0 => 4`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`4 => 0`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})),  
     
      
  transition(`1 => 2`, useAnimation(slideAnimation, 
    {params: slideForwardParams})),
  transition(`2 => 1`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})),

  transition(`1 => 3`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`3 => 1`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})),

  transition(`1 => 4`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`4 => 1`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})), 


  transition(`2 => 3`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`3 => 2`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})),
  
  transition(`2 => 4`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`4 => 2`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})), 


  transition(`3 => 4`, useAnimation(slideAnimation, 
      {params: slideForwardParams})),
  transition(`4 => 3`, useAnimation(slideAnimation, 
      {params: slideBackwardParams})), 
]);

import { transition, trigger, useAnimation } from "@angular/animations";
import { slideAnimation } from "./slide.animation";
import { TransitionParams } from './transition-params.interface';

const slideBackwardParams = {
  enterX: "translateX(-100%)",
  leaveX: "translateX(100%)",
};
const slideForwardParams = {
  enterX: "translateX(100%)",
  leaveX: "translateX(-100%)",
};

export const routeAnimation = trigger(`routeAnimation`, [

  transition(
    `void => *`,
    useAnimation(slideAnimation, { params: slideForwardParams })
  ),

  transition(shouldSlideForward as any, //Why only strings accepted? Override for now
    useAnimation(slideAnimation, { params: slideForwardParams })
  ),

  transition(shouldSlideBackward as any, //Why only strings accepted? Override for now
    useAnimation(slideAnimation, { params: slideBackwardParams })
  ),

]);

export function shouldSlideForward(from: TransitionParams, to: TransitionParams): boolean{
    if(!from || !to) return false;
    if((to.depth > from.depth) && from.section === to.section) return true;
    return false;
}

export function shouldSlideBackward(from: TransitionParams, to: TransitionParams): boolean{
    if(!from || !to) return false;
    if((from.depth > to.depth) && from.section === to.section) return true;
    return false;
}
export abstract class BaseLoadingOverlayDirective{

    constructor() {}
  
    protected addOverlay(el: HTMLElement){
      el.classList.add("loading-overlay", "spinner");
    }
  
    protected removeOverlay(el: HTMLElement){
      el.classList.remove("loading-overlay", "spinner");
    }
  
  }
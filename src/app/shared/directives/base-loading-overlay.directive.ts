export abstract class BaseLoadingOverlayDirective{

    constructor() {}
  
    protected addOverlay(el: any){
      el.classList.add("loading-overlay", "spinner");
    }
  
    protected removeOverlay(el: any){
      el.classList.remove("loading-overlay", "spinner");
    }
  
  }
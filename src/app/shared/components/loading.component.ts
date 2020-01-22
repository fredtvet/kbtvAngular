import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
      <div *ngIf="loading" class="overlay" fxLayoutAlign="center center" >
        <mat-spinner style="opacity:1"></mat-spinner>
      </div>`
})

export class LoadingComponent {

  private _loading: boolean;

  private timer;

  @Input() set loading(value: boolean) {
    this.toggleLoading(value)
  }

  ngOnInit(){
    console.log(this._loading);
  }

  get loading(): boolean {
      return this._loading;
  }

  toggleLoading(loading: boolean){
    if(loading){
      //Enable loading after 200ms delay if loading is not set
      this.timer = setTimeout(() => {console.log('true');this._loading = true}, 200);
    }else{
        clearTimeout(this.timer);
        this._loading = false;
    }
  }

}

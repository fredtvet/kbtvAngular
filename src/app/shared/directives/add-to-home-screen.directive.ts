import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAddToHomeScreen]'
})
export class AddToHomeScreenDirective {
  
  deferredPrompt: any;
  showButton = false;

  constructor(private elementRef: ElementRef) { 
    this.elementRef.nativeElement.style.display = 'none';
  }


  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.elementRef.nativeElement.style.display = 'inline-block';
  }

  @HostListener('click')
  onClick() {
    // hide our user interface that shows our A2HS button
    this.elementRef.nativeElement.style.display = 'none';

    if(!this.deferredPrompt) return undefined;
    
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
}

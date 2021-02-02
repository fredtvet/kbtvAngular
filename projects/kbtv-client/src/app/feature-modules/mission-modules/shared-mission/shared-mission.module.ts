import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ImageViewerDialogWrapperComponent } from './components/image-viewer/image-viewer-dialog-wrapper.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SelectableCardComponent } from './components/selectable-card/selectable-card.component';
import { ImageErrorReloaderDirective } from './directives/image-error-reloader.directive';
import { InputListenerDirective } from './directives/input-listener.directive';

@NgModule({
  declarations: [  
    ImageViewerDialogWrapperComponent,
    ImageViewerComponent,
    SearchBarComponent,
    SelectableCardComponent,

    ImageErrorReloaderDirective,  
    InputListenerDirective,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
    
    ImageViewerDialogWrapperComponent,
    ImageViewerComponent,
    SearchBarComponent,
    SelectableCardComponent,

    ImageErrorReloaderDirective,  
    InputListenerDirective,
  ],
})
export class SharedMissionModule {}

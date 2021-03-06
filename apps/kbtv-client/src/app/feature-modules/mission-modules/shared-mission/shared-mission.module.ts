import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ImageViewerDialogWrapperComponent } from './components/image-viewer/image-viewer-dialog-wrapper.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SelectableCardComponent } from './components/selectable-card/selectable-card.component';
import { ImageErrorPlaceholderDirective } from './directives/image-error-placeholder.directive';
import { InputListenerDirective } from './directives/input-listener.directive';
import { MissionDirectionsUrlPipe } from './mission-directions-url.pipe';

@NgModule({
  declarations: [  
    ImageViewerDialogWrapperComponent,
    ImageViewerComponent,
    SearchBarComponent,
    SelectableCardComponent,
    MissionDirectionsUrlPipe,
    
    ImageErrorPlaceholderDirective,
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
    MissionDirectionsUrlPipe,
    
    ImageErrorPlaceholderDirective,
    InputListenerDirective,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedMissionModule {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseModelFormViewComponent, ModelFormViewConfig } from 'src/app/core/model/form';
import { SaveModelStateCommand } from 'src/app/core/model/interfaces';
import { MissionNote } from 'src/app/core/models';

type ViewConfig = ModelFormViewConfig<MissionNote, MissionNote>;
type Response = SaveModelStateCommand<MissionNote>;

@Component({
  selector: 'app-mission-note-form-view',
  templateUrl: './mission-note-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionNoteFormViewComponent extends BaseModelFormViewComponent<MissionNote, MissionNote, ViewConfig, Response> {

  constructor(private _formBuilder: FormBuilder)  { super(); }

  protected _initalizeForm(cfg: ViewConfig): FormGroup{
    return this._formBuilder.group({
      id: cfg.entity?.id,
      title: [cfg.entity?.title, [
        Validators.maxLength(40)
      ]],
      content: [cfg.entity?.content, [
        Validators.required,
        Validators.maxLength(400)
      ]],
      pinned: cfg.entity?.pinned,
      missionId: cfg.lockedValues?.missionId
    });
  }

  get title(){
    return this.form.get('title')
  }

  get content(){
    return this.form.get('content');
  }

  get pinned(){
    return this.form.get('pinned')
  }

}

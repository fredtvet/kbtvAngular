import { BottomSheetChild } from 'src/app/shared-app/interfaces/bottom-sheet-child.inteface';
import { SaveAction } from '../../state/interfaces/save-action.interface';

export interface FormComponent extends BottomSheetChild<any, SaveAction>{}
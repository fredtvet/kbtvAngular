import { AppSections } from 'src/app/shared-app/const/app-sections.const';


export interface TransitionParams {
    depth: number;
    section: keyof typeof AppSections;
}
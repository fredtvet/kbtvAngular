import { AbstractControl } from "@angular/forms";
import { Maybe } from "global-types";

export type LazySelectOption = Maybe<"onPreset" | "all">;

export const _shouldEagerOptions = (lazyOption: LazySelectOption, control: Maybe<AbstractControl>) => 
    control && (!lazyOption || (lazyOption === "onPreset" && !control.value)) && !control.disabled
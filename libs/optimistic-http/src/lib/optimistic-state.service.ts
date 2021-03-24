import { Inject, Injectable, Optional } from "@angular/core";
import { ImmutableArray, Prop } from "global-types";
import { ROOT_OPTIMISTIC_STATE_PROPS } from "./injection-tokens.const";

@Injectable({providedIn: "root"})
export class OptimisticStateService {

    private _optimisticStateProps: ImmutableArray<string>;

    get optimisticStateProps(): ImmutableArray<string> {
        return this._optimisticStateProps;
    }

    constructor(@Inject(ROOT_OPTIMISTIC_STATE_PROPS) @Optional() stateProps: ImmutableArray<string>){
        this._optimisticStateProps = stateProps || [];
    }

    registerStateProps<TState>(props: ImmutableArray<Prop<TState>>): void{
        this._optimisticStateProps = [...this._optimisticStateProps, ...props]
    }

}
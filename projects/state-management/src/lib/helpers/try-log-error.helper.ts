import { Maybe } from "global-types";

//Hack for callback functions where errors are not automatically logged. 
export function tryWithLogging<TResult>(func: () => TResult): Maybe<TResult> {
    var result: Maybe<TResult> = undefined;
    try{
        result = func()
    }catch(err){
        console.error(err)
    };
    return result;
}
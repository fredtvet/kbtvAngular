//Hack for callback functions where errors are not automatically logged. 
export function tryWithLogging<TResult>(func: () => TResult): TResult {
    var result: TResult;
    try{
        result = func()
    }catch(err){
        console.error(err)
    };
    return result;
}
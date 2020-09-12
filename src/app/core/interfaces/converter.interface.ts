export interface Converter<TInput, TResult>{
    convert(input: TInput): TResult;
}
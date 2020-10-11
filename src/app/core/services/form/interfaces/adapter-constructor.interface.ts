export interface AdapterConstructor<TInput, TOutput>{
    new(input: TInput): TOutput;     
}
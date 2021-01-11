<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [state-management](./state-management.md) &gt; [MetaReducer](./state-management.metareducer.md)

## MetaReducer type

Represents a function for intercepting reducers before they are processed. Provided with token [STORE\_META\_REDUCERS](./state-management.store_meta_reducers.md)

<b>Signature:</b>

```typescript
export declare type MetaReducer<TState, TAction extends StateAction> = (reducer: Immutable<Reducer<TState, TAction>>) => Reducer<TState, TAction>;
```
<b>References:</b> [StateAction](./state-management.stateaction.md)<!-- -->, [Reducer](./state-management.reducer.md)

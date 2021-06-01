/**
 * A library for managing relational state in the application and in communications with an external api.
 * @remarks 
 * The library treats commands sent to the external api optimistically, and therefore expects no state returned.
 * The library does not support many-to-many relationships. 
 * @packageDocumentation
 */

export * from './src/model-state-commands.module';
export * from './src/interfaces';
export * from './src/actions';
export * from './src/model-command.enum';
export * from './src/state/delete-model.reducer';
export * from './src/state/save-model.reducer';
export * from './src/state/save-model.effect';
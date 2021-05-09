/**
 * A library for managing relational state in the application and in communications with an external api.
 * @remarks 
 * The library treats commands sent to the external api optimistically, and therefore expects no state returned.
 * The library does not support many-to-many relationships. 
 * @packageDocumentation
 */

export * from './lib/model-state-commands.module';
export * from './lib/interfaces';
export * from './lib/actions';
export * from './lib/model-command.enum';
export * from './lib/state/delete-model.reducer';
export * from './lib/state/save-model.reducer';
export * from './lib/state/save-model.effect';
/**
 * A library for managing relational state in the application and in communications with an external api.
 * @remarks 
 * The library treats commands sent to the external api optimistically, and therefore expects no state returned.
 * The library does not support many-to-many relationships. 
 * @packageDocumentation
 */

export * from './lib/state-model.module';
export * from './lib/model-state.config';
export * from './lib/model-command.enum';
export * from './lib/interfaces';
export * from './lib/injection-tokens.const';

export * from './lib/helpers/delete-model-with-children.helper'
export * from './lib/helpers/get-model-property.helper'
export * from './lib/helpers/get-range-with-relations.helper'
export * from './lib/helpers/get-relation-props.helper'
export * from './lib/helpers/get-with-relations.helper'
export * from './lib/helpers/modify-model-with-foreigns.helper'

export * from './lib/state/model-state.action';

export * from './lib/state/delete-model/delete-model.action';
export * from './lib/state/delete-model/delete-model.reducer';
export * from './lib/state/delete-model/delete-model.http.effect';

export * from './lib/state/fetch-models/fetch-models.action';
export * from './lib/state/fetch-models/fetch-models.http.effect';
export * from './lib/state/fetch-models/set-fetched-model.reducer';

export * from './lib/state/mail-models/mail-models.action';
export * from './lib/state/mail-models/mail-models.http.effect';

export * from './lib/state/save-model/save-model.reducer';
export * from './lib/state/save-model/save-model.http.effect';
export * from './lib/state/save-model/save-model.action';

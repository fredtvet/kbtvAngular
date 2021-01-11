/**
 * A library for sending optimistic http requests.  
 * @remarks 
 * The library ensures that http requests are executed sequentially and http errors handled correctly.
 * @packageDocumentation
 */

export * from './lib/http.queuer';
export * from './lib/injection-tokens.const';
export * from './lib/interfaces';
export * from './lib/optimistic-http.module';

export * from './lib/state/optimistic-http.action'
export * from './lib/state/optimistic-http-error.action'
export * from './lib/state/http-queue-shift.action'
export * from './lib/state/http-error/http-error.action'

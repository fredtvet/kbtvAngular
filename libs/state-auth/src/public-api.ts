/**
 * A library with services that assists in authorizing users. 
 * @remarks 
 * The implementation uses access tokens for authorization. 
 * If specified, refresh tokens are  used to fetch new access tokens.
 * The library only stores the tokens in global state.  
 * The consumer is responsible for persisting the tokens accross sessions
 * @packageDocumentation
 */

export * from './lib/state-auth.module'
export * from './lib/auth-route-params.const';
export * from './lib/http-auth-tokens.interceptor';
export * from './lib/injection-tokens.const';
export * from './lib/interfaces';
export * from './lib/if-role.directive';
export * from './lib/state/actions.const'
export * from './lib/services/auth.service';
export * from './lib/services/auth-guard.service';
export * from './lib/services/no-auth-guard.service';



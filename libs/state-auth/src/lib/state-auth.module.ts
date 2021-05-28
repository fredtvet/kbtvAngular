import { ApplicationModule, ModuleWithProviders, NgModule } from '@angular/core';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { IfRoleDirective } from './if-role.directive';
import { AUTH_COMMAND_API_MAP, AUTH_DEFAULT_REDIRECTS } from './injection-tokens.const';
import { AuthCommandApiMap, DefaultRedirects } from './interfaces';
import { RedirectToUrlEffect } from './state/login-success/redirect-to-url.effect';
import { SetCredentialsReducer } from './state/login-success/set-credentials.reducer';
import { LoginHttpEffect } from './state/login.http.effect';
import { LogoutHttpEffect } from './state/logout/logout.http.effect';
import { WipeTokensReducer } from './state/logout/wipe-tokens.reducer';
import { RefreshTokenSuccessReducer } from './state/refresh-token-success.reducer';
import { RefreshTokenHttpEffect } from './state/refresh-token.http.effect';
import { RemoveRefreshTokenReducer } from './state/remove-refresh-token.reducer';

/** Responsible for exporting diretives. 
 *  Use forRoot function to inject core providers*/
@NgModule({
    declarations: [IfRoleDirective],
    imports: [ApplicationModule],
    exports: [IfRoleDirective],
})
export class StateAuthModule {
    static forRoot(
        commandApiMap: AuthCommandApiMap, 
        defaultRedirects: DefaultRedirects
    ): ModuleWithProviders<StateAuthModule> {
        return {
            ngModule: StateAuthModule,
            providers: [
                { provide: STORE_EFFECTS, useClass: RefreshTokenHttpEffect, multi: true },  
                { provide: STORE_EFFECTS, useClass: LogoutHttpEffect, multi: true },
                { provide: STORE_EFFECTS, useClass: LoginHttpEffect, multi: true},
                { provide: STORE_EFFECTS, useClass: RedirectToUrlEffect, multi: true},
                
                { provide: STORE_REDUCERS, useValue: RefreshTokenSuccessReducer, multi: true },
                { provide: STORE_REDUCERS, useValue: WipeTokensReducer, multi: true },
                { provide: STORE_REDUCERS, useValue: SetCredentialsReducer, multi: true},
                { provide: STORE_REDUCERS, useValue: RemoveRefreshTokenReducer, multi: true},
                
                { provide: AUTH_COMMAND_API_MAP, useValue: commandApiMap },
                { provide: AUTH_DEFAULT_REDIRECTS, useValue: defaultRedirects },
            ]
        }
    }
}
  
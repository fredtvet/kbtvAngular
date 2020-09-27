import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, pluck, switchMap, take, tap } from 'rxjs/operators';
import { AuthStore } from '../services/auth/auth.store';
import { ApiUrl } from '../api-url.enum';


@Injectable()
export class HttpRefreshTokenInterceptor implements HttpInterceptor {

    constructor(private authStore:AuthStore) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {  
        if(req.responseType !== "json" || this.isLoginRequest(req)) return next.handle(req); //Dont mess with login requests

        if(!this.authStore.hasTokens){ //If one or more tokens are missing, logout
            if(!this.isLogoutRequest(req)) return this.logoutUser(); 
            return throwError('Cant log out without tokens')
        }

        //Dont handle expired tokens on refresh requests, nor if any token is missing.
        if(!this.isRefreshRequest(req) && this.authStore.hasAccessTokenExpired){        
            return this.handleTokenExpired$().pipe(switchMap(x =>{ return next.handle(this.addToken(req, x)) }));
        }  

        return next.handle(this.addToken(req, this.authStore.accessToken));
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: {Authorization: `Bearer ${token}`} })
    }

    private handleTokenExpired$(): Observable<string>{
        if(this.authStore.isRefreshingToken)
            return this.authStore.newAccessToken$.pipe(pluck('token'),take(1)); 

        return this.authStore.refreshToken$()
            .pipe(map(tokens => tokens?.accessToken?.token));  
    }

    private logoutUser(): Observable<any> {
        this.authStore.logout();
        return throwError("Noe gikk galt. Du har blitt logget ut.");
    }

    private isLoginRequest = (req: HttpRequest<any>) => req.url.includes(`${ApiUrl.Auth}/login`);

    private isRefreshRequest = (req: HttpRequest<any>): boolean => req.url.includes(`${ApiUrl.Auth}/refresh`);

    private isLogoutRequest = (req: HttpRequest<any>): boolean => req.url.includes(`${ApiUrl.Auth}/logout`);
}

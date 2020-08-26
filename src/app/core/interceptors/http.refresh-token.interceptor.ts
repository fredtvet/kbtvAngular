import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, pluck, switchMap, take } from 'rxjs/operators';
import { AuthStore } from '../services/auth/auth.store';
import { ApiUrl } from '../api-url';


@Injectable()

export class HttpRefreshTokenInterceptor implements HttpInterceptor {

    constructor(private authStore:AuthStore) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {  
        if(req.responseType !== "json" || this.isLoginRequest(req)) return next.handle(req); //Dont mess with login requests

        if(!this.authStore.hasTokens){ //If one or more tokens are missing, logout
            if(!this.isLogoutRequest(req)){ //Dont logout if request is logout (handled in auth service elsewhere)
                //console.log(1, !!this.authService.hasTokens() && !this.isLoginRequest(req));
                return this.logoutUser(); 
            }else 
                return throwError('Cant log out without tokens')
        }
        
        //Dont handle expired tokens on refresh requests, nor if any token is missing.
        if(this.authStore.hasAccessTokenExpired && !this.isRefreshRequest(req)){
            //console.log(2, this.authService.hasAccessTokenExpired() && !this.isRefreshRequest(req));               
            return this.handleTokenExpired$().pipe(switchMap(x =>{ return next.handle(this.addToken(req, x)) }));
        }  
        
        //console.log(3, 'default');
        return next.handle(this.addToken(req, this.authStore.accessToken));
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { 
            Authorization: `Bearer ${token}`,
        }})
    }

    private handleTokenExpired$(): Observable<string>{
        if (!this.authStore.isRefreshingToken) {
            return this.authStore.refreshToken$().pipe(
                map(tokens => {
                    if (tokens && tokens.accessToken && tokens.accessToken.token) 
                        return tokens.accessToken.token;                 
                }));
        } 
        else return this.authStore.newAccessToken$.pipe(pluck('token'),take(1));      
    }

    private logoutUser(): Observable<any> {
        this.authStore.logout();
        return throwError("Noe gikk galt");
    }

    private isLoginRequest = (req: HttpRequest<any>) => req.url.includes(`${ApiUrl.Auth}/login`);

    private isRefreshRequest = (req: HttpRequest<any>): boolean => req.url.includes(`${ApiUrl.Auth}/refresh`);

    private isLogoutRequest = (req: HttpRequest<any>): boolean => req.url.includes(`${ApiUrl.Auth}/logout`);
}

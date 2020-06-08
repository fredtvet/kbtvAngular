import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { take, switchMap, map } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from '../services/auth/auth.service';


@Injectable()

export class HttpRefreshTokenInterceptor implements HttpInterceptor {

    constructor(private authService:AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {  
        if(this.isLoginRequest(req)) return next.handle(req); //Dont mess with login requests

        if(!this.authService.hasTokens()){ //If one or more tokens are missing, logout
            if(!this.isLogoutRequest(req)){ //Dont logout if request is logout (handled in auth service elsewhere)
                //console.log(1, !!this.authService.hasTokens() && !this.isLoginRequest(req));
                return this.logoutUser(); 
            }else 
                return throwError('Cant log out without tokens')
        }
 
        //Dont handle expired tokens on refresh requests, nor if any token is missing.
        if(this.authService.hasAccessTokenExpired() && !this.isRefreshRequest(req)){
            //console.log(2, this.authService.hasAccessTokenExpired() && !this.isRefreshRequest(req));               
            return this.handleTokenExpired$().pipe(switchMap(x =>{ return next.handle(this.addToken(req, x)) }));
        }  
        
        //console.log(3, 'default');
        return next.handle(this.addToken(req, this.authService.getAccessToken()));
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { 
            Authorization: `Bearer ${token}`,
         }})
    }

    private handleTokenExpired$(): Observable<string>{
        if (!this.authService.isRefreshingToken) {
            //console.log('refreshin');
            return this.authService.refreshToken$().pipe(
                map(tokens => {
                    if (tokens && tokens.accessToken && tokens.accessToken.token) 
                        return tokens.accessToken.token;                 
                }));
        } 
        else return this.authService.refreshedAccessToken$.pipe(take(1));      
    }

    private logoutUser(): Observable<any> {
        this.authService.logout();
        return throwError("Noe gikk galt");
    }

    private isLoginRequest = (req: HttpRequest<any>) => req.url.includes("Auth/login");

    private isRefreshRequest = (req: HttpRequest<any>): boolean => req.url.includes("Auth/refresh");

    private isLogoutRequest = (req: HttpRequest<any>): boolean => req.url.includes("Auth/logout");
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { take, filter, catchError, switchMap, finalize, tap, map } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from '../services/auth/auth.service';
import { DialogService } from '../services/dialog.service';


@Injectable()

export class HttpRefreshTokenInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authService:AuthService) {}

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { 
            Authorization: `Bearer ${token}`,
         }})
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if(this.authService.hasAccessTokenExpired() && this.authService.hasTokens() && !this.isRefreshRequest(req)) 
            return this.handleTokenExpired$().pipe(switchMap(x =>{ return next.handle(this.addToken(req, x)) }));

        if(!this.authService.hasTokens() && this.isRefreshRequest(req)) return this.logoutUser(); 

        if(this.isRefreshRequest(req)){
            return next.handle(req).pipe(
                catchError((error: HttpErrorResponse) => { 
                    if(this.isInvalidRefreshTokenError(error)) return this.logoutUser();               
                    else return throwError(error);             
                }));
        } 
        return next.handle(this.addToken(req, this.authService.getAccessToken()));
    }

    private isInvalidRefreshTokenError = (error: HttpErrorResponse) => 
        error && error.status === 400 && error.error == "invalid_grant"

    private handleTokenExpired$(): Observable<string>{
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            return this.authService.refreshToken$().pipe(
                switchMap(tokens => {
                    if (tokens && tokens.accessToken && tokens.accessToken.token) {
                        this.tokenSubject.next(tokens.accessToken.token);
                        return tokens.accessToken.token;
                    }
                   // If we don't get a new token, we are in trouble so logout.
                    return this.logoutUser();
                }),
                catchError(error => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    return this.logoutUser();
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }),);
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1));
        }
    }

    private logoutUser(): Observable<any> {
        // Route to the login page (implementation up to you)
        this.authService.logout();
        return throwError("Noe gikk galt");
    }

    private isRefreshRequest = (req: HttpRequest<any>): boolean => req.url.includes("Auth/refresh");
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { take, filter, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from '../services/auth/auth.service';
import { IdentityTokensService } from '../services/auth/identity-tokens.service';
import { DialogService } from '../services/dialog.service';


@Injectable()

export class HttpRefreshTokenInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private dialogService: DialogService,
        private authService:AuthService, 
        private tokenService: IdentityTokensService) {}

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { 
            Authorization: `Bearer ${token}`,
            'Access-Control-Expose-Headers': "10, 10"
         }})
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if(this.authService.hasAccessTokenExpired() && this.tokenService.getRefreshToken()) 
            return this.handleTokenExpired(req, next);

        return next.handle(this.addToken(req, this.authService.getAccessToken())).pipe(
            catchError((error: HttpErrorResponse) => { 
                if(this.isInvalidRefreshTokenError(error))
                   return this.logoutUser();               
                // else if(this.isTokenExpired(error))  
                //     return this.handleTokenExpired(req, next);
                else 
                    return throwError(error);             
            }));
    }

    private isInvalidRefreshTokenError = (error: HttpErrorResponse) => 
        error && error.status === 400 && error.error == "invalid_grant"

    //private hasTokenExpired = (error: HttpErrorResponse) => error && error.status === 401

    private handleTokenExpired(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            console.log('refreshing');
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            
            return this.authService.refreshToken$().pipe(
                switchMap(tokens => {
                    if (tokens && tokens.accessToken && tokens.accessToken.token) {
                        this.tokenSubject.next(tokens.accessToken.token);
                        return next.handle(this.addToken(req, tokens.accessToken.token));
                    }
                    console.log('test');
                   // If we don't get a new token, we are in trouble so logout.
                    return this.logoutUser();
                }),
                catchError(error => {
                    console.log(error);
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    return this.logoutUser();
                }),
                finalize(() => {
                    console.log('finalized');
                    this.isRefreshingToken = false;
                }),);
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
                }));
        }
    }

    private logoutUser(): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        // Route to the login page (implementation up to you)
        console.log('refresh expired');
        this.authService.purgeAuth();
        this.dialogService.openLoginPrompt$().subscribe();
        return throwError("");
    }
}

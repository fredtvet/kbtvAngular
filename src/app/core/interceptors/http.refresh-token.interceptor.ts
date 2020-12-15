import { HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { merge, Observable, of, throwError } from 'rxjs';
import { filter, pluck, switchMap, take, tap } from 'rxjs/operators';
import { ApiUrl } from '../api-url.enum';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class HttpRefreshTokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<unknown> | HttpUserEvent<unknown>> {  
        if(req.responseType !== "json" || this.isLoginRequest(req)) return next.handle(req); //Dont mess with login requests

        if(!this.authService.isAuthorized){ //If one or more tokens are missing, logout
            if(!this.isLogoutRequest(req)) return this.logoutUser(); 
            return throwError('Cant log out without tokens')
        }

        //Dont handle expired tokens on refresh requests, nor if any token is missing.
        if(!this.isRefreshRequest(req) && this.authService.hasAccessTokenExpired){    
            return merge(
                of(null).pipe(tap(x => this.authService.refreshToken())),
                this.authService.newAccessToken$.pipe(take(1), pluck('token')),
            ).pipe(
                filter(x => x != null),
                switchMap(x =>{ return next.handle(this.addToken(req, x)) })
            )
        }  

        return next.handle(this.addToken(req, this.authService.getAccessToken()));
    }

    private addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
        return req.clone({ setHeaders: {Authorization: `Bearer ${token}`} })
    }

    private logoutUser(): Observable<HttpResponse<unknown>> {
        this.authService.logout();
        return throwError("Noe gikk galt. Du har blitt logget ut.");
    }

    private isLoginRequest = (req: HttpRequest<unknown>) => req.url.includes(`${ApiUrl.Auth}/login`);

    private isRefreshRequest = (req: HttpRequest<unknown>): boolean => req.url.includes(`${ApiUrl.Auth}/refresh`);

    private isLogoutRequest = (req: HttpRequest<unknown>): boolean => req.url.includes(`${ApiUrl.Auth}/logout`);
}

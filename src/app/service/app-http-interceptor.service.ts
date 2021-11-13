import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { AppConstant } from "../utility/AppConstant";
import { ExternalService } from "./external.service";
 
@Injectable({
  providedIn: "root",
})
export class AppHttpInterceptorService implements HttpInterceptor {
  constructor(
    private _externalService: ExternalService,
    private router: Router,) {}
 
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error instanceof HttpErrorResponse) {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          console.log(errorMessage);
          if (error.error.message !=undefined) {
            this._externalService.showErrorDialog(error.error.message);
            return throwError(errorMessage);
          }
          else if (error.status === 408) {
            this._externalService.showErrorDialog(AppConstant.TIMEOUT_ERROR);
            return throwError(errorMessage);
          }
          else if (error.status === 504) {
            this._externalService.showErrorDialog(AppConstant.TIMEOUT_ERROR);
            return throwError(errorMessage);
          }
          else if (error.status === 0) {
            this._externalService.showErrorDialog(AppConstant.TIMEOUT_ERROR);
            return throwError(errorMessage);
          }
          else if (error.status === 401) {
            this.router.navigate(["/login"]);
            return throwError(errorMessage);
          }
        }
        return throwError(errorMessage);
      })
    );
  }
}

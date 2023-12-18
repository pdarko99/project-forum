/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { NotificationService } from '@project-forum/notification';
import { LoadingService } from '@project-forum/loading';
import { catchError, finalize, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  notificationService = inject(NotificationService);
  loadingService = inject(LoadingService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.showLoading();
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      }),
      catchError((error: HttpErrorResponse) => {
        this.loadingService.hideLoading();
        console.log(error, 'from error');
        if (error.error.message) {
          this.notificationService.open(error.error.message);
        } else {
          this.notificationService.open('an unexpected error occurred');
        }
        return throwError(error);
      })
    );
  }
}

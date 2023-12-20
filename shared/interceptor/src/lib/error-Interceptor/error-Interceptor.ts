/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoadingService } from '@project-forum/loading';
import { NotificationService } from '@project-forum/notification';
import { catchError, finalize, throwError } from 'rxjs';

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

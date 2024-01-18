/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@project-forum/loading';
import { NotificationService } from '@project-forum/notification';
import { EMPTY, catchError, finalize } from 'rxjs';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   notificationService = inject(NotificationService);
//   loadingService = inject(LoadingService);

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     this.loadingService.showLoading();
//     return next.handle(req).pipe(
//       finalize(() => {
//         this.loadingService.hideLoading();
//       }),
//       catchError((error: HttpErrorResponse) => {
//         this.loadingService.hideLoading();
//         if (error.error.message) {
//           this.notificationService.open(error.error.message, 'error');
//         } else {
//           this.notificationService.open('an unexpected error occurred', 'error');
//         }
//         return EMPTY;
//       })
//     );
//   }
// }

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  const loadingService = inject(LoadingService);

  loadingService.showLoading();
  return next(req).pipe(
    finalize(() => {
      loadingService.hideLoading();
    }),
    catchError((error: HttpErrorResponse) => {
      loadingService.hideLoading();
      if (error.error.message) {
        notificationService.open(error.error.message, 'error');
      } else {
        notificationService.open('an unexpected error occurred', 'error');
      }
      return EMPTY;
    })
  );
};

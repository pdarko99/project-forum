/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpInterceptorFn } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectToken$ } from '@project-forum/data-access';

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {
//   let notificationService = inject(NotificationService);
//   let loadingService = inject(LoadingService);
//   loadingService.showLoading();

//   return next(req).pipe(
//     finalize(() => {
//       loadingService.hideLoading();
//     }),
//     catchError((error: HttpErrorResponse) => {
//       loadingService.hideLoading();
//       notificationService.open(error.message);
//       return EMPTY;
//     })
//   );
// };

// export class AuthInterceptor implements HttpInterceptor {
//   protected readonly userToken = toSignal(selectToken$);

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const authToken = this.userToken();
//     const authRequest = req.clone({
//       headers: req.headers.set('Authorization', 'Bearer ' + authToken),
//     });
//     return next.handle(authRequest);
//   }
// }

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = toSignal(selectToken$);
  const authToken = userToken();
  const authRequest = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authToken),
  });

  return next(authRequest);
};

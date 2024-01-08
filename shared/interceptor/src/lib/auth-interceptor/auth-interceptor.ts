/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectToken$ } from '@project-forum/data-access';

export class AuthInterceptor implements HttpInterceptor {
  protected readonly userToken = toSignal(selectToken$);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });
    return next.handle(authRequest);
  }
}

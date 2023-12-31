/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, Injector, inject } from '@angular/core';
import { authDataDialog } from '@project-forum/auth-dialog';
import { NotificationService } from '@project-forum/notification';
import { getToken, selectToken$, selectUser$, setUser } from './auth-store';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenTimer: number | undefined;
  protected readonly injector = inject(Injector);

  notificationService = inject(NotificationService);

  selectUserData$ = selectUser$;

  selectUserToken$ = selectToken$;

  saveAuthData(token: string, firstName: string) {
    setUser(firstName, token);
  }

  setAuthTimer(timer: number) {
    console.log("am being cleaed outtt ooo 2222")

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, timer);
  }

  logout() {
    this.clearAuthData();
    this.notificationService.open('Your session has expired');
    clearTimeout(this.tokenTimer);
    authDataDialog(this.injector).subscribe();
  }

  private clearAuthData() {
    setUser('', '');
  }

  checkTokenStatus() {
    if (this.isTokenExpired()) return this.logout();

    const remainingMilliseconds = this.getTimeRemaining() * 1000;
    console.log("am being cleaed outtt ooo")
    this.setAuthTimer(remainingMilliseconds);
  }

  private isTokenExpired(): boolean {
    const decodedToken = jwtDecode(getToken());

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken.exp!;

    return currentTime >= expirationTime;
  }

  private getTimeRemaining(): number {
    const decodedToken = jwtDecode(getToken());

    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decodedToken.exp!;

    return expirationTime - currentTime;
  }
}

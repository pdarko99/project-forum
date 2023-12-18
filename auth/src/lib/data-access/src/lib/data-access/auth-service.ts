/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, Injector, inject } from '@angular/core';
import { authDataDialog } from '@project-forum/auth-dialog';
import { NotificationService } from '@project-forum/notification';
import {
  getTokenExpiration,
  getTokenTimestamp,
  selectUser$,
  setUser,
} from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenTimer: number | undefined;
  protected readonly injector = inject(Injector);

  notificationService = inject(NotificationService);

  selectUserData$ = selectUser$;

  saveAuthData(token: string, firstName: string, expiresIn: number) {
    const tokenExpiration = expiresIn * 1000;
    const tokenTimestamp = new Date().getTime();
    setUser(firstName, token, tokenExpiration, tokenTimestamp);
  }

  setAuthTimer(timer: number) {
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

  private getTimeRemaining() {
    const tokenTimestamp = getTokenTimestamp();
    const tokenExpiration = getTokenExpiration();

    const currentTime = new Date().getTime();
    const elapsedMilliseconds = currentTime - tokenTimestamp!;
    const remainingMilliseconds = tokenExpiration! - elapsedMilliseconds;

    return remainingMilliseconds;
  }

  checkTokenStatus() {
    const remainingMilliseconds = this.getTimeRemaining();

    if (remainingMilliseconds <= 0) {
      this.logout();
    } else {
      this.setAuthTimer(remainingMilliseconds);
    }
  }
}

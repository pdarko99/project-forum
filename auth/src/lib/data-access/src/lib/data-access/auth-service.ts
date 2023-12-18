/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, Injector, inject } from '@angular/core';
import { authDataDialog } from '@project-forum/auth-dialog';
import { NotificationService } from '@project-forum/notification';
import { selectUser$, setUser } from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenTimer: number | undefined;
  protected readonly injector = inject(Injector);
  notificationService = inject(NotificationService);

  selectUserData$ = selectUser$;

  saveAuthData(token: string, firstName: string) {
    setUser(firstName, token);
  }

  setAuthTimer(timer: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
      console.log(Date.now());
      authDataDialog(this.injector).subscribe();
    }, timer * 1000);
  }

  logout() {
    this.notificationService.open('Your session has expired');
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private clearAuthData() {
    setUser('', '');
  }
}

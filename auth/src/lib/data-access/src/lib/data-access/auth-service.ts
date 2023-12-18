/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, Injector, inject } from '@angular/core';
import { authDataDialog } from '@project-forum/auth-dialog';
import {selectUser$,setUser} from './auth-store';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenTimer: number | undefined;
  protected readonly injector = inject(Injector);

  selectUserData$ = selectUser$;

  saveAuthData(token: string, expirationDate: Date, userId: string, firstName:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    setUser(userId,firstName);

  }

    setAuthTimer(timer: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
      console.log(Date.now())
      authDataDialog(this.injector).subscribe();
    }, timer * 1000);
  }

  logout() {
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  autoAuthUser(expirationDate: Date) {
    const now = new Date();

    const expiresIn = expirationDate.getTime() - now.getTime();
    console.log(expiresIn/1000, 'from expires')
    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (token && expirationDate) {
      return {
        userId: userId,
        token,
        expirationDate: new Date(expirationDate),
      };
    }
    return null;
  }
}

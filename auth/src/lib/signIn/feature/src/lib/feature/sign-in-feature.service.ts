import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignInFeatureService {
  url = 'http://localhost:3000/api/user/signin';
  http = inject(HttpClient);

  signIn(email: string, password: string) {
    const authData = {
      email: email,
      password: password,
    };
    return this.http.post<{
      message: string;
      firstName: string;
      token: string;
      expiresIn: number;
      userId: string;
    }>(this.url, authData);
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ForumBackend } from '@project-forum/home/model';
import { UserData } from '@project-forum/userData';

@Injectable({
  providedIn: 'root',
})
export class SignUpFeatureService {
  url = 'http://localhost:3000/api/user/signup';
  http = inject(HttpClient);

  signUp(userData: UserData) {
    return this.http.post<{
      message: string;
      firstName: string;
      token: string;
      expiresIn: number;
      userId: string;
      admin: boolean;
      forum: ForumBackend[];
    }>(this.url, userData);
  }
}

/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { HomeFeatureService } from '@project-forum/home/feature';
import { ForumBackend, forum } from '@project-forum/home/model';
import { setForum } from 'home/feature/src/lib/feature/home-feature.store';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  homeService = inject(HomeFeatureService);

  selectedFirstForumToBeDisplayed = signal('');

  url = 'http://localhost:3000/api/forum/';
  http = inject(HttpClient);

  public readonly getAllForums = (): Observable<forum[]> => {
    return this.http.get<{ forums: ForumBackend[] }>(this.url).pipe(
      map((x) => {
        const formattedForum = x.forums.map((forum) => ({
          ...forum,
          id: forum._id,
        })) as forum[];
        return formattedForum;
      }),
      tap((x) => {
        if (x.length) {
          this.selectedFirstForumToBeDisplayed.set(x[0].id);
        }
        setForum(x);
      })
    );
  };

  public readonly setUserForums = (forums: ForumBackend[]) => {
    const formattedForum = forums.map((forum) => ({
      ...forum,
      id: forum._id,
    })) as forum[];
    if (formattedForum.length) {
      this.selectedFirstForumToBeDisplayed.set(formattedForum[0].id);
    }
    setForum(formattedForum);
  };

  getUserForum() {
   return this.http.get<{ forums: ForumBackend[] }>(this.url+"userForum").pipe(
     map((x) => {
        const formattedForum = x.forums.map((forum) => ({
          ...forum,
          id: forum._id,
        })) as forum[];
        return formattedForum;
      }),
      tap((x) => {
        if (x.length) {
          this.selectedFirstForumToBeDisplayed.set(x[0].id);
        }
        setForum(x);
      })
   )
  }
}

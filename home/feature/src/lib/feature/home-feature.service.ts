import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forum } from '@project-forum/home/model';
import { Observable, filter, map, tap } from 'rxjs';
import { selectForumDataSource$, setForum } from './home-feature.store';

@Injectable({
  providedIn: 'root',
})
export class HomeFeatureService {
  url = 'http://localhost:3000/api/forum/';
  http = inject(HttpClient);

  public readonly getAllForums = (): Observable<forum[]> => {
    return this.http.get<forum[]>(this.url).pipe(
      tap((x) => {
        setForum(x);
      })
    );
  };

  public readonly selectForums$ = selectForumDataSource$.pipe(
    filter((data) => !data.loading),
    map((data) => data.forum)
  );
}

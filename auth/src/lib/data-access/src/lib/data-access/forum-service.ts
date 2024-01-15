/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HomeFeatureService } from '@project-forum/home/feature';
import { setForum } from 'home/feature/src/lib/feature/home-feature.store';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForumService {

  homeService = inject(HomeFeatureService);
  
  url = 'http://localhost:3000/api/forum/';
  http = inject(HttpClient);

  public readonly getAllForums = (): Observable<{ forums: [] }> => {
    return this.http.get<{ forums: [] }>(this.url).pipe(
      tap((x) => {
        
        console.log('getting forum');
        console.log(x, 'from x');
        setForum(x.forums);
      })
    );
  };
}

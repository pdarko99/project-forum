import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs';
import { selectForumDataSource$ } from './home-feature.store';

@Injectable({
  providedIn: 'root',
})
export class HomeFeatureService {
  public readonly selectForums$ = selectForumDataSource$.pipe(
    tap((x) => console.log(x, 'frm tap111')),

    filter((data) => !data.loading),
    map((data) => data.forum),
    tap((x) => console.log(x, 'frm tap'))
  );
}

import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { selectForumDataSource$ } from './home-feature.store';

@Injectable({
  providedIn: 'root',
})
export class HomeFeatureService {
  public readonly selectForums$ = selectForumDataSource$.pipe(
    filter((data) => !data.loading),
    map((data) => data.forum)
  );
}

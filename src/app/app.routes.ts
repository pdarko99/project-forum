import { Route } from '@angular/router';
import { HOME_PAGE } from '@project-forum/home/feature';

export const appRoutes: Route[] = [
  {
    ...HOME_PAGE,
  },
  {
    path: '',
    redirectTo: 'forum',
    pathMatch: 'full',
  },
];

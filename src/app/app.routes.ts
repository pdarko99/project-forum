import { Route } from '@angular/router';
import { CREATE_FORUM_PAGE } from '@project-forum/create-forum';
import { HOME_PAGE } from '@project-forum/home/feature';

export const appRoutes: Route[] = [
  {
    ...HOME_PAGE,
  },
  {
    ...CREATE_FORUM_PAGE,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

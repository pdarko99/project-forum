import { Route } from '@angular/router';
import { HOME_PAGE, SELECTED_FORUM_PAGE } from '@project-forum/home/feature';
import { CREATE_FORUM_PAGE } from 'create-forum/src';

export const appRoutes: Route[] = [
  {
    ...HOME_PAGE,
    children: [
      SELECTED_FORUM_PAGE,
    
    ],
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

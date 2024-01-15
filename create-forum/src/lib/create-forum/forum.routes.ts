import { Route } from '@angular/router';

export const CREATE_FORUM_PAGE: Route = {
  path: 'create-forum',
  loadComponent: () => import('./create-forum.component'),
};

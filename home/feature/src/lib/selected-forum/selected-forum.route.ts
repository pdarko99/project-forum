import { Route } from '@angular/router';

export const SELECTED_FORUM_PAGE: Route = {
  path: ':forum',
  loadComponent: () => import('./selected-forum.component'),
};

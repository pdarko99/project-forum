import { Route } from '@angular/router';

export const HOME_PAGE: Route = {
  path: 'forum',
  loadComponent: () => import('./home-feature.component'),
};

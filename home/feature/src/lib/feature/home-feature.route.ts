import { Route } from '@angular/router';

export const HOME_PAGE: Route = {
  path: 'home',
  loadComponent: () => import('./home-feature.component'),
 
};

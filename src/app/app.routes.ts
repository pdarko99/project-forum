import { Route } from '@angular/router';
import { FORUM_INVITATION_PAGE } from '@project-forum/forum-invitation';
import { HOME_PAGE, SELECTED_FORUM_PAGE } from '@project-forum/home/feature';
import { CREATE_FORUM_PAGE } from 'create-forum/src';

export const appRoutes: Route[] = [
  {
    ...HOME_PAGE,
    children: [SELECTED_FORUM_PAGE],
  },
  {
    ...CREATE_FORUM_PAGE,
  },
  {
    ...FORUM_INVITATION_PAGE,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

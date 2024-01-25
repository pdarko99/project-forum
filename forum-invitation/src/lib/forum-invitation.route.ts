import { Route } from '@angular/router';

export const FORUM_INVITATION_PAGE: Route = {
  path: 'invitation/:forumId/:forumName',
  loadComponent: () => import('./forum-invitation.component'),
};

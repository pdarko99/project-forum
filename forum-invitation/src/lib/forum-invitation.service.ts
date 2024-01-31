import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForumInvitationService {
  url = 'http://localhost:3000/api/forum/addForumId';
  http = inject(HttpClient);

  addForum = (forumIdToBeAdded: string) => {
    return this.http.post(this.url, {forumId:forumIdToBeAdded});
  };
}

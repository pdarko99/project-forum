import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { forum } from '@project-forum/home/model';

@Injectable({
  providedIn: 'root',
})
export class CreateForumService {
  url = 'http://localhost:3000/api/forum/';
  http = inject(HttpClient);
  forumDetailsStep = signal<boolean>(false);
  schoolDetailsStep = signal<boolean>(false);

  forum: forum = {
    id: '',
    name: '',
    description: '',
    schoolName: '',
    facultyName: '',
    departmentName: '',
  };

  newForum() {
    return this.http.post<{ link: string }>(this.url, this.forum);
  }

  resetForum() {
    return (this.forum = {
      id: '',
      name: '',
      description: '',
      schoolName: '',
      facultyName: '',
      departmentName: '',
    });
  }
}

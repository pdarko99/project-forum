import { Component, Injector, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ForumService } from '@project-forum/data-access';
import { ForumInvitationService } from './forum-invitation.service';

@Component({
  selector: 'project-forum-forum-invitation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './forum-invitation.component.html',
  styleUrl: './forum-invitation.component.scss',
})
export default class ForumInvitationComponent {
  @Input() forumName!: string;
  @Input() forumId!: string;

  protected readonly injector = inject(Injector);


  forumInvitationService = inject(ForumInvitationService);
  router = inject(Router);

  addForum() {
    this.forumInvitationService.addForum(this.forumId).subscribe(() => {
      console.log('hey we doing well');
      const forumService = this.injector.get(ForumService);
      forumService.selectedFirstForumToBeDisplayed.set(this.forumId);
      this.router.navigate(['/home']);
    });
  }

  rejectForum() {
    alert('thanks you your Input');
  }
}

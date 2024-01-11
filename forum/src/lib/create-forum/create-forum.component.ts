import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { NotificationService } from '@project-forum/notification';
import ForumDetailsComponent from '../forum-details/forum-details.component';
import SchoolDetailsComponent from '../school-details/school-details.component';
import { CreateForumService } from './create-forum.service';

@Component({
  selector: 'project-forum-create-forum',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SchoolDetailsComponent,
    ForumDetailsComponent,
    RouterLink,
  ],
  templateUrl: './create-forum.component.html',
  styleUrl: './create-forum.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateForumComponent {
  submitted = signal<boolean>(false);
  forumLink = signal<string>('');
  @ViewChild('content') contentElementRef!: ElementRef;

  notificationService = inject(NotificationService);

  createForum = inject(CreateForumService);

  submitForm() {
    this.createForum.newForum().subscribe((res) => {
      console.log(res);
      this.forumLink.set(res.link);
      this.contentElementRef.nativeElement.textContent =
        'Thank you! Please copy link below';
      this.submitted.set(true);
    });
  }

  copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = this.forumLink();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.notificationService.open('copied');
  }

  // themeManager = inject(ThemeManagerService);
}

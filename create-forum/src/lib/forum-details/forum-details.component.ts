import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateForumService } from '../create-forum/create-forum.service';

@Component({
  selector: 'project-forum-forum-details',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './forum-details.component.html',
  styleUrl: './forum-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ForumDetailsComponent implements AfterViewInit {
  @ViewChild('forumDetails') forumDetailsForm!: NgForm;

  createForumService = inject(CreateForumService);

  ngAfterViewInit(): void {
    this.forumDetailsForm.statusChanges!.subscribe((status) => {
      console.log('Form status changed:', status);

      if (status === 'VALID') {
        console.log('valid');
        this.createForumService.forumDetailsStep.set(true);
      } else {
        console.log('invalid');
        this.createForumService.forumDetailsStep.set(false);
      }
    });
  }
}

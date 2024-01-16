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
  selector: 'project-forum-school-details',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './school-details.component.html',
  styleUrl: './school-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SchoolDetailsComponent implements AfterViewInit {
  @ViewChild('schoolDetails') schoolDetailsForm!: NgForm;

  createForumService = inject(CreateForumService);

  ngAfterViewInit(): void {
    this.schoolDetailsForm.statusChanges!.subscribe((status) => {
      if (status === 'VALID') {
        this.createForumService.schoolDetailsStep.set(true);
      } else {
        this.createForumService.schoolDetailsStep.set(false);
      }
    });
  }
}

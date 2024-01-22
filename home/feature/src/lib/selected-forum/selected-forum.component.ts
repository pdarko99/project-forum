import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import MessagesComponent from '../messages/messages.component';

@Component({
  selector: 'project-forum-selected-forum',
  standalone: true,
  templateUrl: './selected-forum.component.html',
  styleUrl: './selected-forum.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, MessagesComponent],
})
export default class SelectedForumComponent {
  @Input() forum!: string;
}

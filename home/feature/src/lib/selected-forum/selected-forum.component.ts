import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'project-forum-selected-forum',
  standalone: true,
  templateUrl: './selected-forum.component.html',
  styleUrl: './selected-forum.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export default class SelectedForumComponent {
  @Input()forum!:string
}

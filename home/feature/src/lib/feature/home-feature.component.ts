import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { HomeFeatureService } from './home-feature.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@project-forum/data-access';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'project-forum-feature',
  standalone: true,
  templateUrl: './home-feature.component.html',
  styleUrl: './home-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule]
})
export default class FeatureComponent implements OnInit {
  protected readonly authService = inject(AuthService);

  protected readonly homeService = inject(HomeFeatureService);

  protected readonly userData = toSignal(this.authService.selectUserData$, {
    initialValue: { firstName: '', token: "" },
  });

  protected readonly forum = toSignal(this.homeService.selectForums$, {
    initialValue: [],
  });

  ngOnInit(): void {
    if (this.userData().token) {
      this.homeService.getAllForums().subscribe();
    }
  }
}

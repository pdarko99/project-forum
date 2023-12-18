import { Component, OnInit, inject } from '@angular/core';
import { HomeFeatureService } from './home-feature.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@project-forum/data-access';

@Component({
  selector: 'project-forum-feature',
  standalone: true,
  templateUrl: './home-feature.component.html',
  styleUrl: './home-feature.component.scss',
})
export default class FeatureComponent implements OnInit {
  protected readonly authService = inject(AuthService);

  protected readonly homeService = inject(HomeFeatureService);

  protected readonly userData = toSignal(this.authService.selectUserData$, {
    initialValue: { id: '', firstName: '' },
  });

  protected readonly forum = toSignal(this.homeService.selectForums$, {
    initialValue: [],
  });

  ngOnInit(): void {
    if (this.userData().id) {
      this.homeService.getAllForums(this.userData().id).subscribe();
    }
  }
}

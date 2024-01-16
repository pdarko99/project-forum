/* eslint-disable @nx/enforce-module-boundaries */
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, ForumService } from '@project-forum/data-access';
import { LoadingService } from '@project-forum/loading';
import { HomeFeatureService } from './home-feature.service';

@Component({
  selector: 'project-forum-feature',
  standalone: true,
  templateUrl: './home-feature.component.html',
  styleUrl: './home-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, RouterLink, RouterOutlet],
})
export default class FeatureComponent implements OnInit {
  router = inject(Router);
  protected readonly authService = inject(AuthService);
  protected readonly forumService = inject(ForumService);

  protected readonly homeService = inject(HomeFeatureService);

  protected readonly selectedFirstForumToBeDisplayed =
    this.forumService.selectedFirstForumToBeDisplayed;

  loadingService = inject(LoadingService);

  showLoading = toSignal(this.loadingService.loading$);

  protected readonly userToken = toSignal(this.authService.selectUserToken$, {
    initialValue: '',
  });

  protected readonly forum = toSignal(this.homeService.selectForums$, {
    initialValue: [],
  });

  protected readonly selectedFirstForumToBeDisplayedEffectFn = effect(() => {
    this.router.navigate([`/home/${this.selectedFirstForumToBeDisplayed()}`]);
  });

  // selectUserToken'

  // private getForumsEffect = effect(() => {
  //   if (this.userToken()) {
  //     this.homeService.getAllForums().subscribe();
  //   }
  // });

  ngOnInit(): void {
    if (this.userToken()) {
      this.forumService.getAllForums().subscribe();
    }
  }
}

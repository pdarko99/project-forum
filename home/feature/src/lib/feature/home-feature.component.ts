import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@project-forum/data-access';
import { HomeFeatureService } from './home-feature.service';

@Component({
  selector: 'project-forum-feature',
  standalone: true,
  templateUrl: './home-feature.component.html',
  styleUrl: './home-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export default class FeatureComponent implements OnInit {
  protected readonly authService = inject(AuthService);

  protected readonly homeService = inject(HomeFeatureService);

  protected readonly userToken = toSignal(this.authService.selectUserToken$, {
    initialValue: '',
  });

  protected readonly forum = toSignal(this.homeService.selectForums$, {
    initialValue: [],
  });

  // selectUserToken

  ngOnInit(): void {
    console.log("naaaaa")
    if (this.userToken()) {
      console.log("yes")
      this.homeService.getAllForums().subscribe();
    }
  }
}

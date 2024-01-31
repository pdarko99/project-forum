/* eslint-disable @nx/enforce-module-boundaries */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '@project-forum/notification';
import { SignInFeatureService } from './sign-in-feature.service';

import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService, ForumService } from '@project-forum/data-access';
import { LoadingService } from '@project-forum/loading';

@Component({
  selector: 'project-forum-sign-in-feature',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent {
  @Output() closeDialog = new EventEmitter();
  signInService = inject(SignInFeatureService);
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  forumService = inject(ForumService);

  forums = toSignal(this.forumService.homeService.selectForums$);

  loadingService = inject(LoadingService);

  showLoading = toSignal(this.loadingService.loading$);
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.signInService
      .signIn(form.value.email, form.value.password)
      .subscribe((res) => {
        this.authService.saveAuthData(res.token, res.firstName, res.admin);
        if (!this.forums()) {
          if (res.admin) {
            this.forumService.getAllForums().subscribe();
          } else {
            this.forumService.setUserForums(res.forum);
          }
        }
        form.reset();
        this.notificationService.open(res.message);
        this.authService.setAuthTimer(res.expiresIn * 1000);
        this.closeDialog.emit();
      });
  }

  demo() {
    this.signInService.signIn('k@gmail.com', '123456').subscribe((res) => {
      this.authService.saveAuthData(res.token, res.firstName, res.admin);
      this.forumService.getAllForums().subscribe();
      this.notificationService.open(res.message);
      this.authService.setAuthTimer(res.expiresIn * 1000);
      this.closeDialog.emit();
    });
  }
}
